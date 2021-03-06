from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateAPIView
# from app_settings import UserDetailsSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import *

from .models import *

def getUserProfile(request, pk):
    user = User.objects.get(id=pk)
    team_id = -1
    if user.info.designation != 'Client':
        team_id = user.team_members.first().id
    
    designation = user.info.designation
    name = user.first_name + ' ' + user.last_name
    context = {
        "user_id":pk,
        "team_id":team_id,
        "designation":designation,
        "name":name
    }
    return Response(context)

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
def getBugs(request, pk):
    if request.user.info.designation == 'Client':
        bugs = Bug.objects.filter(requested_by = User.objects.get(id = pk))
    elif request.user.info.designation == 'Org Leader':
        bugs = Bug.objects.all()
    elif request.user.info.designation == 'Team Leader' or request.user.info.designation == 'Team Member':
        team_id = request.user.team_members.first().id
        bugs = Bug.objects.filter(team_id = team_id)
    serializer = BugSerialzer(bugs, many=True)

    return Response(serializer.data)

# Create Bug
def createBug(request):
    serializer = BugSerialzer(data=request.data)
    dict = {}
    if serializer.is_valid():
        serializer.save(requested_by = request.user)

    return Response(serializer.data)  

# Read Bug
def readBug(request, pk):
    bug = Bug.objects.get(id=pk)
    serializer = BugSerialzer(bug, many=False)

    return Response(serializer.data)


# Update Bug
def updateBug(request, pk):
    bug = Bug.objects.get(id=pk)
    serializer = BugSerialzer(instance=bug, data=request.data, many=False)
    
    if serializer.is_valid():
        serializer.save()
        bug = Bug.objects.get(id=pk)
        serializer = BugSerialzer(bug, many=False)
        # print(serializer)
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

