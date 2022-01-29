from rest_framework.response import Response
from .serializers import TeamSerialzer

from .models import *

# Create Team
def createTeam(request):
    serializer = TeamSerialzer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# Get Team
def readTeam(request, pk):
    Team = Team.objects.get(id=pk)
    serializer = TeamSerialzer(Team, many=False)

    return Response(serializer.data)


# Update Team
def updateTeam(request, pk):
    Team = Team.objects.get(id=pk)
    serializer = TeamSerialzer(instance=Team, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

# Delete Team
def deleteTeam(request, pk):
    Team = Team.objects.get(id=pk)
    Team.delete()

    return Response('Team successfully deleted!')