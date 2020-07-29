from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        
        extra_kwargs = {
            "password": {"write_only": True},
        }

        fields = ["id", "username", "password", "email"]

    def create(self, data):
        user = super(UserSerializer, self).create(data)
        user.set_password(data['password'])
        user.save()
        return user
