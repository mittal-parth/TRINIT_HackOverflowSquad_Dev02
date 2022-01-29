from rest_framework.response import Response
from .serializers import *

from .models import *

## ----Team methods----
# Team list
def getTeams(request):
    teams = Team.objects.all()
    serializer = TeamSerialzer(teams, many=True)

    return Response(serializer.data)

# Create Team
def createTeam(request):
    serializer = TeamSerialzer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        # Create a tag based on the team name
        tag = Tag(name= request.data.get('name'))
        tag.save()

    return Response(serializer.data)

# Read Team
def readTeam(request, pk):
    team = Team.objects.get(id=pk)
    serializer = TeamSerialzer(team, many=False)

    return Response(serializer.data)


# Update Team
def updateTeam(request, pk):
    team = Team.objects.get(id=pk)
    serializer = TeamSerialzer(instance=team, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# Delete Team
def deleteTeam(request, pk):
    team = Team.objects.get(id=pk)
    team.delete()

    return Response('Team successfully deleted!')


## ----Tag methods----
# Create Tag
def createTag(request):
    serializer = TagSerialzer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)  


## ----Bug Methods----

# Get bug list
def getBugs(request):
    # TODO: Send bug list based on role and permissions
    bugs = Bug.objects.all()
    serializer = BugSerialzer(bugs, many=True)

    return Response(serializer.data)

# Create Bug
def createBug(request):
    serializer = BugSerialzer(data=request.data)
    dict = {}
    if serializer.is_valid():
        bug = Bug(name = request.data['name'], description = request.data['description'], status = request.data['status'], date_created = request.data['date_created'], deadline = request.data['deadline'], requested_by = request.user, assigned_to = request.data['assigned_to'], tags = request.data['tags'])
        bug.save()

        serializer.save()
        dict = {
            "name":bug.name,
            "description":bug.description,
            "status": bug.status,
            "date_created": bug.date_created,
            "deadline": bug.deadline,
            "requested_by": bug.requested_by,
            "assigned_to": bug.assigned_to,
            "tags": bug.tags,
        }
    
    return Response(dict)  

# Read Bug
def readBug(request, pk):
    bug = Bug.objects.get(id=pk)
    serializer = BugSerialzer(bug, many=False)

    return Response(serializer.data)


# Update Bug
def updateBug(request, pk):
    bug = Bug.objects.get(id=pk)
    serializer = BugSerialzer(instance=bug, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# Delete Bug
def deleteBug(request, pk):
    bug = Bug.objects.get(id=pk)
    bug.delete()

    return Response('Bug successfully deleted!')

## ----Comment methods----

# Create Comment
def createComment(request, pk):
    serializer = CommentSerialzer(data=request.data)

    if serializer.is_valid():

        bug = Bug.objects.get(id=pk)
        comment = Comment(description=request.data['description'], bug = bug)

        comment.save()

        dict = {
            "id": comment.id,
            "description": comment.description,
            "bug": comment.bug.id,
        }
    return Response(dict)

# Get all comments related to bug
def getComments(request, pk):
    comments = Comment.objects.filter(bug__id = 1) 
    serializer = CommentSerialzer(comments, many=True)

    return Response(serializer.data)

