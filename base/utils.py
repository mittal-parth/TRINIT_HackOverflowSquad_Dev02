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
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)  

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

