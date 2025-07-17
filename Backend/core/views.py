from django.shortcuts import render
from rest_framework import generics, viewsets, permissions, filters, serializers
from django_filters.rest_framework import DjangoFilterBackend
from .models import MyUser, Project, Task, Comment, ActivityLog
from .serializers import UserRegistrationSerializer, ProjectSerializer, TaskSerializer, CommentSerializer, ActivityLogSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
# from .permissions import IsAdminOrManager
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer



class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class IsAdminOrManager(permissions.BasePermission):
    """
    Custom permission: Only admin or manager can create, update, or delete.
    Members can only view (read-only).
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            # SAFE_METHODS = GET, HEAD, OPTIONS
            return True
        return request.user.role in ['admin', 'manager']

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user, context={'request': request})
        return Response(serializer.data)

User = get_user_model()
class UserViewSet(viewsets.ReadOnlyModelViewSet):  # ReadOnly because we only want GET
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]  # Only logged-in users can fetch users


# Create your views here.
class RegisterViewSet(generics.CreateAPIView):
   queryset = User.objects.all()
   permission_classes = [AllowAny]
   serializer_class = UserRegistrationSerializer

class ProjectViewSet(viewsets.ModelViewSet): 
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrManager]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']

    def perform_create(self, serializer):
      serializer.save(created_by=self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
      queryset = Task.objects.all()
      serializer_class = TaskSerializer
      permission_classes = [permissions.IsAuthenticated]
      filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
      filterset_fields = ['project', 'status', 'assigned_to']
      search_fields = ['title', 'description']
      ordering_fields = ['due_date', 'created_at']

      def get_queryset(self):
        user = self.request.user
        if user.role == 'member':
            return Task.objects.filter(assigned_to=user)
        return Task.objects.all()

class CommentViewSet(viewsets.ModelViewSet):
      serializer_class = CommentSerializer
      permission_classes = [permissions.IsAuthenticated]
      
      def get_queryset(self):
          queryset = Comment.objects.all()
          task_id = self.request.query_params.get('task')
          if task_id:
              queryset = queryset.filter(task__id=task_id)
          return queryset
      
      def perform_create(self, serializer):
          task_id = self.request.data.get("task")
          if not task_id:
              raise serializers.ValidationError
          try:
              task = Task.objects.get(id=task_id)
          except Task.DoesNotExist:
              raise serializers.ValidationError({"task": "Invalid task ID"})

          serializer.save(user=self.request.user, task=task)
          
      
class ActivityLogViewSet(viewsets.ReadOnlyModelViewSet):    
    queryset = ActivityLog.objects.all().order_by('-timestamp')
    serializer_class = ActivityLogSerializer
    permission_classes = [permissions.IsAuthenticated]