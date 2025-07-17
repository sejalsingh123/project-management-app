from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        user = None
        if username is not None:
            try:
                user = UserModel.objects.get(username=username)
            except UserModel.DoesNotExist:
                try:
                    user = UserModel.objects.get(email=username)
                except UserModel.DoesNotExist:
                    return None
        if user and user.check_password(password):
            return user
        return None