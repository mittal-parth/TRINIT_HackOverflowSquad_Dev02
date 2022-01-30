from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField

# Create your models here
class Info(models.Model):
    CHOICES = (('Client','Client'),('Org Leader','Org Leader'),('Team Leader','Team Leader'),('Team Member','Team Member'))
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    designation = models.CharField(max_length=100, default="Member", choices=CHOICES)

class Team(models.Model):
    name = models.CharField(max_length=100, blank=False)
    description = models.TextField(max_length=2000, blank=True, null=True)
    members = models.ManyToManyField(User, blank=True, null=True, related_name="%(class)s_members")
    leader = models.ForeignKey(User, blank=False, null=True, on_delete=models.SET_NULL, related_name="%(class)s_leader")

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return self.name

class Bug(models.Model):
    STATUS = (('Unassigned', 'Unassigned'), ('Work-In-Progress', 'Work-In-Progress'), ('Resolved', 'Resolved'), ('Archived', 'Archived'))
    name = models.CharField(max_length=200)
    description = RichTextField()
    status = models.CharField(max_length=100, null=False, choices=STATUS, default='Unassigned')
    requested_by = models.ForeignKey(User, null=True, on_delete = models.SET_NULL, related_name="%(class)s_requested_by")
    assigned_to = models.ForeignKey(User, null=True, blank=True, on_delete = models.SET_NULL, related_name="%(class)s_assigned_to")
    tags = models.ManyToManyField(Tag, blank=True, null=True)
    date_created = models.DateField(auto_now_add=True)
    deadline = models.DateField(blank=True, null=True)
    team = models.ForeignKey(Team, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name + str(self.id)

class Comment(models.Model):
    bug = models.ForeignKey(Bug, null=True, on_delete=models.SET_NULL)
    description = RichTextField()

    def __str__(self):
        return str(self.id)
