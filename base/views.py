from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .utils import *
# Create your views here.

@api_view(['GET'])
def userprofile(request, pk):
    pass

## Team Methods
# TODO: Show teams based on user role
@api_view(['GET', 'POST'])
def teams(request):
    if request.method == 'GET':
        return getTeams(request)

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

## Bug methods
@api_view(['GET','POST'])
def bugs(request):
    if request.method == 'GET':
        return getBugs(request)

    if request.method == 'POST':
        return createBug(request)

# Methods pertaining to a single bug (excluding create)
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def bug(request, pk):
    if request.method == 'GET':
        return readBug(request, pk)

    if request.method == 'PUT' or request.method == 'PATCH':
        return updateBug(request, pk)
    
    if request.method == 'DELETE':
        return deleteBug(request, pk)


## Comment methods
@api_view(['GET','POST'])
def comments(request, pk):
    if request.method == 'POST':
        return createComment(request, pk)

    if request.method == 'GET':
        return getComments(request, pk)