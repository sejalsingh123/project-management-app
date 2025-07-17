from rest_framework import serializers
from .models import MyUser, Project, Task, Comment, ActivityLog
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# Serializer for User .this to fetch all registerd users 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ['id', 'username', 'email', 'role', 'attachment']  



#to fetch username and role of login user so we can give permission based things in frontend
#by default django does not provide these things it only give the id of user 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['username'] = self.user.username
        data['role'] = self.user.role  
        data['email'] = self.user.email  
        if self.user.attachment:         
            data['attachment'] = self.user.attachment.url
        else:
            data['attachment'] = None
        return data
       
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role
        token['email'] = user.email        
        if user.attachment:               
            token['attachment'] = user.attachment.url
        else:
            token['attachment'] = None
        return token
        

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True, required=True)
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True, required=True)
    class Meta:
        model = MyUser
        fields = ['username','email','password', 'password2', 'role','attachment']
        extra_kwargs = {
            'password': {'required': True, 'allow_blank': False},
            'role': {'required': True, 'allow_blank': False}
        }    
    # validating password and confirm passsword while registration
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password!=password2:
            raise serializers.ValidationError("password does not match with confirm password")
        return attrs
    def create(self, validated_data):
        validated_data.pop('password2')
        return MyUser.objects.create_user(**validated_data)
    
class CommentSerializer(serializers.ModelSerializer):
     user = serializers.StringRelatedField(read_only=True)
     class Meta:
        model = Comment
        fields = ['id', 'task', 'user', 'content', 'created_at']
        read_only_fields = ['created_at', 'user']



class TaskSerializer(serializers.ModelSerializer):
    comment = CommentSerializer(many=True, read_only=True)
    project_name = serializers.CharField(source='project.title', read_only=True)
    assigned_to = serializers.CharField(source='assigned_to.username', read_only=True)
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['created_at', 'assigned_to',]  

class ProjectSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True,)
    created_by = serializers.CharField(source='created_by.username', read_only=True)
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['created_at', 'created_by', 'tasks']

class ActivityLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    related_task = serializers.StringRelatedField()

    class Meta:
        model = ActivityLog
        fields = '__all__'
