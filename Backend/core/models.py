from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
def task_attachment_path(instance, filename):
    return f'attachments/user_{instance.id}/{filename}'
class MyUser(AbstractUser):
    choices_role = [
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('member', 'Member'),
    ]
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    role = models.CharField(max_length=50, choices=choices_role ,default='member')
    attachment = models.FileField(upload_to=task_attachment_path, blank=True, null=True)
    def __str__(self,):
        return f"{self.username}({self.role})"
    
class Project(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title
    
class Task(models.Model):
    status_choices = [
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'), 
    ]
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    assigned_to = models.ForeignKey(MyUser, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=50, choices=status_choices, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return f"{self.title} - {self.project.title} ({self.assigned_to.username if self.assigned_to else 'Unassigned'})"

class Comment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.task.title}"   

class ActivityLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    action = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    related_task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.action} at {self.timestamp}"





