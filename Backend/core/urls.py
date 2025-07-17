from django.urls import path,include
from .views import RegisterViewSet, ProjectViewSet, TaskViewSet, CommentViewSet, ActivityLogViewSet, MyTokenObtainPairView,LoginView, UserViewSet, CurrentUserView
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'projects',ProjectViewSet, basename='project')
router.register(r'tasks',TaskViewSet, basename='tasks')
router.register(r'comments',CommentViewSet, basename='comment')
router.register(r'logs',ActivityLogViewSet, basename='activitylogs')
router.register(r'users',UserViewSet, basename='users')
urlpatterns = [
    path('register/', RegisterViewSet.as_view(), name='RegisterView'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/me/', CurrentUserView.as_view(), name='current-user'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('',include(router.urls)),
]
