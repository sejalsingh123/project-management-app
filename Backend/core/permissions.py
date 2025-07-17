from rest_framework import permissions

class IsAdminOrManager(permissions.BasePermission):
    """
    Custom permission to only allow admins or managers to access the view.
    """
    def has_permission(self, request, view):
        # Check if the user is authenticated
        # if not request.user.is_authenticated:
        #     return False
        
        # Allow access if the user is an admin or a manager
        return request.user.role in ['manager', 'admin']