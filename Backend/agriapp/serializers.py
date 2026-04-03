from rest_framework import serializers
from .models import users,addyourcrop,BusinessBid,UserFeedback
class usersSerializers(serializers.ModelSerializer):
    class Meta:
        model=users
        fields='__all__'
class usersloginserializer(serializers.Serializer):
    email=serializers.EmailField(max_length=50)
    password=serializers.CharField(max_length=100)

class checkserializer(serializers.Serializer):
    email=serializers.EmailField(max_length=50)
    password=serializers.CharField(max_length=100)

class Addcropserializer(serializers.ModelSerializer):
    
    bid_count = serializers.IntegerField(read_only=True)
    addedbyuser = usersSerializers(read_only=True)
    # this is when crop is need to be add
    class Meta:
        model=addyourcrop
        fields="__all__"


class BusinessBidSerializer(serializers.ModelSerializer):
    businessman = usersSerializers(read_only=True)
    crop_name = Addcropserializer(read_only=True)
    class Meta:
        model=BusinessBid
        fields="__all__"

class Forgetpasswordserializer(serializers.Serializer):
     email=serializers.EmailField()

class Resetpasswordserializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(max_length=100)
    otp=serializers.IntegerField()
class UserFeedbackserializers(serializers.ModelSerializer):
     userid = serializers.PrimaryKeyRelatedField(queryset=users.objects.all())
     user = usersSerializers(source='userid', read_only=True)
     class Meta:
        model=UserFeedback
        fields="__all__"