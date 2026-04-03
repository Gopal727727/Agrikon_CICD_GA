from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import AccessToken
from .models import users
class tokenValidation(BasePermission):
    def has_permission(self, request, view):
        try:
            usertype=request.headers.get("usertype")
            token=request.headers.get("Authorization")
            userid=int(request.headers.get("userid"))
            
            access_token=AccessToken(token)
            email=access_token.get('email')
            id=access_token.get('id')
           
            if id!=userid:
                return False
            user=users.objects.get(email=email,id=id,usertype=usertype)
            if user:
                return True
            else:
                return False
        except Exception as error:
            print(error)
            return False