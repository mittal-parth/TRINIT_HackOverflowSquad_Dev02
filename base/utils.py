from rest_framework.response import Response
from .serializers import TeamSerialzer

from .models import *

## Team methods

# Create Team
def createTeam(request):
    serializer = TeamSerialzer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        # Create a tag based on the team name
        tag = Tag(name= request.data.get('name'))
        tag.save()

    return Response(serializer.data)

# Get Team
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


## Tag methods
def createTag(request):
    serializer = TagSerialzer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)  