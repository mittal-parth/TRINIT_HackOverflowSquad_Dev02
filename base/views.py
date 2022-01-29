from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .utils import *
# Create your views here.

## Team Methods
# TODO: Show teams based on user role
@api_view(['GET', 'POST'])
def teams(request):
    if request.method == 'GET':
        teams = Team.objects.all()
        serializer = TeamSerialzer(teams, many=True)

        return Response(serializer.data)

    if request.method == 'POST':
        return createTeam(request)

# Methods pertaining to a single team (excluding create)
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def team(request, pk):
    if request.method == 'GET':
        return readTeam(request, pk)

    if request.method == 'PUT' or request.method == 'PATCH':
        return updateTeam(request, pk)
    
    if request.method == 'DELETE':
        return deleteTeam(request, pk)

## Tag methods
@api_view(['POST'])
def tag(request):
    if request.method == 'POST':
        createTag(request)