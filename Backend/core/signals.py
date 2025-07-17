from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Task, Comment, ActivityLog
from django.core.mail import send_mail
from django.conf import settings

@receiver(post_save, sender=Task)
def log_task_creation(sender, instance, created, **kwargs):
    if created and instance.assigned_to:
        
        ActivityLog.objects.create(
            user=instance.assigned_to,
            action=f"Task '{instance.title}' was created and assigned.",
            related_task=instance
        )
        # Send email
        if instance.assigned_to and instance.assigned_to.email:
            print("📨 Task signal fired!")
            send_mail(
                subject="New Task Assigned",
                message=f"You have been assigned a new task: {instance.title}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[instance.assigned_to.email],
                fail_silently=True
            )

@receiver(post_save, sender=Comment)
def log_comment(sender, instance, created, **kwargs):
    if created :
        ActivityLog.objects.create(
            user=instance.user,
            action=f"Commented on task '{instance.task.title}'",
            related_task=instance.task
        )
        # Email notification to task owner (optional)
        if instance.task.assigned_to and instance.task.assigned_to.email:
            send_mail(
                subject="New Comment on Your Task",
                message=f"New comment: {instance.content}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[instance.task.assigned_to.email],
                fail_silently=True
            )


