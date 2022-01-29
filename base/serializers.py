from rest_framework import serializers
from .models import Team, Tag, Bug 

class TeamSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class TagSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'

class BugSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Bug
        fields = '__all__'