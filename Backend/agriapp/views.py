from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import usersSerializers,usersloginserializer,Addcropserializer,BusinessBidSerializer,Forgetpasswordserializer,Resetpasswordserializer,UserFeedbackserializers
from .models import users,resetpassword
from rest_framework_simplejwt.tokens import RefreshToken
from .customepermission import tokenValidation
from .models import addyourcrop
from .models import BusinessBid,UserFeedback
import time
from django.db.models import Count,Sum
def simple_hash(password):
    # Ensure the password is a string
    if not isinstance(password, str):
        password = str(password)

    # Initialize a large prime seed
    seed = 131071
    hash_val = 0

    for char in password:
        hash_val = (hash_val * seed + ord(char)) % (2**64)

    # Expand the hash into a long string using bitwise and hex mapping
    hash_string = ''
    temp = hash_val
    for i in range(64):  # 64 hex characters = 256 bits
        temp ^= (temp << 13) & 0xFFFFFFFFFFFFFFFF
        temp ^= (temp >> 7)
        temp ^= (temp << 17) & 0xFFFFFFFFFFFFFFFF
        hash_string += hex(temp & 0xF)[2:]  # Take last hex digit

    return hash_string

# Create your views here.
class userApi(APIView):
    def post(self, request, format=None):
        serializers = usersSerializers(data=request.data)
        if serializers.is_valid():
            hased_password=simple_hash(serializers.validated_data["password"])
            serializers.validated_data["password"]=hased_password
            print(serializers.validated_data["password"])
            serializers.save()
            return Response({"success": "User signup successful"}, status=status.HTTP_201_CREATED)
        return Response({"errors": serializers.errors})
   
        

    

def get_tokens_for_Banklogin(user):
    refresh = RefreshToken.for_user(user)

    refresh['email']=user.email
    
    refresh['id']=user.id

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
class userloginApi(APIView):
    def post(self,request,fromat=None):
        serializers=usersloginserializer(data=request.data)
        if serializers.is_valid():
            try:
               email=serializers.validated_data.get("email")
               password=serializers.validated_data.get("password")
               hased_password=simple_hash(password)
               userdata=users.objects.get(email=email,password=hased_password)

               if userdata:
                   token=get_tokens_for_Banklogin(user=userdata)
                   return Response({"success":"User loggedin successfully","token":token,"usertype":userdata.usertype,"userid":userdata.id,"username":userdata.name},status=status.HTTP_200_OK)
               
            except Exception as error:
               return Response({"error":"Invalid credentials"},status=status.HTTP_401_UNAUTHORIZED)
        return Response({"error":serializers.errors})
           
class VerifyToken(APIView):
    permission_classes=[tokenValidation]
    def post(self,request,format=None):
        return Response({"detail":True})
class Addyourcropview(APIView):
    permission_classes=[tokenValidation]
    def post(self,request,format=None):
        serializer=Addcropserializer(data=request.data)
        userid=int(request.headers.get("userid"))
        
        if serializer.is_valid():
            
            try:
               
                usertype=request.headers.get("usertype")
                if usertype=="Farmer":
                    serializer.save(addedbyuser_id=userid)
                    return Response({"success":"your crop added successfully"})
                else:
                     return Response({"error":"not authoirized"},status=status.HTTP_401_UNAUTHORIZED)
            except Exception as error:
                print(error)
                return Response({"error":"some server error occur"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"error":serializer.errors})
        
    def get(self, request, format=None):
        usertype = request.headers.get("usertype")
        userid = request.headers.get("userid")

        if usertype == "Farmer" and userid:
            # All crops of this farmer
            crops = addyourcrop.objects.filter(addedbyuser_id=int(userid)).annotate(
                bid_count=Count("businessbid")
            )

            # Get crop IDs
            crop_ids = crops.values_list("id", flat=True)

            # All related bids
            bids = BusinessBid.objects.filter(crop_name_id__in=crop_ids)

            # Aggregate bid info
            total_accepted_amount = bids.filter(bid_statusforbusinessman="Accepted").aggregate(
                total=Sum("bid_amount"))["total"] or 0

            total_bids = bids.count()
            accepted_bids = bids.filter(bid_statusforbusinessman="Accepted").count()
            rejected_bids = bids.filter(bid_statusforbusinessman="Rejected").count()

            serializer = Addcropserializer(crops, many=True)

            return Response({
                "crops": serializer.data,
                "total_accepted_amount": total_accepted_amount,
                "total_bids": total_bids,
                "accepted_bids": accepted_bids,
                "rejected_bids": rejected_bids
            })
        else:
            # You can handle other user types here
            crops = addyourcrop.objects.all()
            serializer = Addcropserializer(crops, many=True)
            return Response(serializer.data)
        

    def patch(self, request, pk, format=None):
       
        try:
           
            crop = addyourcrop.objects.get(pk=pk)
            print(request.data)
            serializer = Addcropserializer(crop, data=request.data, partial=True)
            if serializer.is_valid():
               
                serializer.save()
                print(serializer.data)
                return Response({"success": "Crop updated successfully"})
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except addyourcrop.DoesNotExist:
            return Response({"error": "Crop not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as error:
            print(error)
            return Response({"error": "Some server error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BusinessBidApi(APIView):
     permission_classes=[tokenValidation]
     def post(self, request, format=None):
        serializers = BusinessBidSerializer(data=request.data)
        userid=int(request.headers.get("userid"))
        cropid=int(request.query_params.get("cropid"))
        print(cropid)
        print(userid)
        if serializers.is_valid():
            serializers.save(businessman_id=userid,crop_name_id=cropid)
            return Response({"success": "Bidding sucessfull"}, status=status.HTTP_201_CREATED)
        return Response({"errors": serializers.errors})
     
    
     def get(self, request, format=None):
        businessman_id = request.query_params.get('businessman_id')
        crop_id = request.query_params.get('crop_id')
        condition = request.query_params.get('condition')
        farmer_id = request.query_params.get('farmer_id')  # This is the addedbyuser_id

        # 1. Case: Only businessman_id is provided
        if businessman_id and not crop_id and not condition:
            bidded_crop_ids = list(
                BusinessBid.objects.filter(businessman_id=businessman_id)
                .values_list('crop_name_id', flat=True)
            )
            return Response({"crop_ids": bidded_crop_ids}, status=status.HTTP_200_OK)

        # 2. Case: businessman_id + crop_id
        elif businessman_id and crop_id and not condition:
            bids = BusinessBid.objects.filter(businessman_id=businessman_id, crop_name_id=crop_id)
            if bids.exists():
                data = list(bids.values())
                return Response({"details": data}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No matching bid found for provided businessman_id and crop_id"}, status=status.HTTP_404_NOT_FOUND)

        # 3. Case: crop_id + condition
        elif crop_id and condition and not businessman_id:
            bids = BusinessBid.objects.filter(crop_name_id=crop_id)
            if bids.exists():
                serializer = BusinessBidSerializer(bids, many=True)
                return Response({"details": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No bids found for the given crop_id"}, status=status.HTTP_404_NOT_FOUND)

        # 4. Case: farmer_id + crop_id for my croplisting
        elif farmer_id and crop_id:
            bids = BusinessBid.objects.filter(crop_name__addedbyuser_id=farmer_id, crop_name_id=crop_id)
            if bids.exists():
                serializer = BusinessBidSerializer(bids, many=True)
                return Response({"details": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No bids found for the given farmer_id and crop_id"}, status=status.HTTP_404_NOT_FOUND)

        # 5. NEW Case: businessman_id + condition => return all bids by that businessman
        elif businessman_id and condition and not crop_id:
            bids = BusinessBid.objects.filter(businessman_id=businessman_id)
            if bids.exists():
                serializer = BusinessBidSerializer(bids, many=True)
                return Response({"details": serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "No bids found for the given businessman_id"}, status=status.HTTP_404_NOT_FOUND)

        # 6. Invalid or incomplete request
        return Response({"error": "Invalid parameters. Please provide a valid combination."}, status=status.HTTP_400_BAD_REQUEST)



     def patch(self, request, format=None):
        businessman_id = request.data.get("businessman")
        crop_id = request.data.get("crop_id") or request.data.get("crop_name")

        bid_amount = request.data.get("bid_amount")
        update_status = request.data.get("update_status")
        farmer_id = request.data.get("farmer_id")
        payment = request.data.get("payment")

        # Validate inputs
        if bid_amount:
            if not (businessman_id and crop_id):
                return Response(
                    {"error": "businessman and crop_id (or crop_name) are required for bid amount update."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        elif update_status:
            if not (farmer_id and crop_id):
                return Response(
                    {"error": "farmer_id and crop_id (or crop_name) are required for status update."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        elif payment is not None:
            if not (businessman_id and crop_id):
                return Response(
                    {"error": "businessman and crop_id (or crop_name) are required for payment update."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            return Response(
                {"error": "Either bid_amount, update_status, or payment must be provided."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            if bid_amount:
                bid = BusinessBid.objects.get(businessman_id=businessman_id, crop_name_id=crop_id)
                bid.bid_amount = bid_amount
                bid.save()
                return Response({"success": "Bid amount updated successfully."}, status=status.HTTP_200_OK)

            if update_status:
             try:
                # Get the specific bid
                bid = BusinessBid.objects.get(crop_name__addedbyuser_id=farmer_id, crop_name_id=crop_id)

                if update_status == "Accepted":
                    # 1. Accept this bid
                    bid.bid_statusforbusinessman = "Accepted"
                    bid.save()

                    # 2. Reject all other bids for the same crop
                    BusinessBid.objects.filter(
                        crop_name_id=crop_id
                    ).exclude(
                        id=bid.id
                    ).update(bid_statusforbusinessman="Rejected")

                    return Response(
                        {"success": "Bid accepted and other bids rejected."},
                        status=status.HTTP_200_OK
                    )

                elif update_status == "Rejected":
                    # Just reject this bid
                    bid.bid_statusforbusinessman = "Rejected"
                    bid.save()

                    return Response(
                        {"success": "Bid rejected successfully."},
                        status=status.HTTP_200_OK
                    )

                else:
                    return Response(
                        {"error": "Invalid update_status value. Must be 'Accepted' or 'Rejected'."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

             except BusinessBid.DoesNotExist:
                return Response(
                    {"error": "No matching bid found for the provided farmer_id and crop_id."},
                    status=status.HTTP_404_NOT_FOUND
                )


            if payment is not None:
                bid = BusinessBid.objects.get(businessman_id=businessman_id, crop_name_id=crop_id)
                bid.pay = payment
                bid.save()
                return Response({"success": "Payment status updated successfully."}, status=status.HTTP_200_OK)

        except BusinessBid.DoesNotExist:
            return Response(
                {"error": "No matching bid found."},
                status=status.HTTP_404_NOT_FOUND
            )



       
            
class UserdetailApi(APIView):
     permission_classes=[tokenValidation]
     def get(self,request,format=None):
        userid=request.headers.get("userid")
       
        data = users.objects.filter(id=userid)
        serializer = usersSerializers(data,many=True)
        return Response(serializer.data)
        

#algo-2
def generateotp():
    seed = int(time.time() * 1000)
    otp = ""
    for _ in range(6):
        seed = (seed * 73 + 41) % 100000000 
        digit = seed % 10 
        otp += str(digit)
    return otp

 
   
class ForgetpasswordApi(APIView):
    def post(self,request,format=None):
        
        serializers = Forgetpasswordserializer(data=request.data)
      
        if serializers.is_valid():
            
            email=serializers.validated_data["email"]
            print("email",email)
            
            resetinfo = resetpassword.objects.filter(resetuser__email=email)
            if resetinfo.exists():
                   resetinfo.delete()
            try:
            
                user=users.objects.get(email=email)
                if user:
                    otp=generateotp()
                    reset_entry = resetpassword(resetuser=user, otp=otp)
                    reset_entry.save()
                    subject="Reset your agricon password"
                    message="your otp is: "+ otp
                    from_email=settings.EMAIL_HOST_USER
                    recipient_list=[email]
                    send_mail(subject,message,from_email,recipient_list)
                    return Response({"success":"your otp is send to email please enter otp"},status=status.HTTP_200_OK)
                
                else:
                    return Response({"Invalid Email"},status=status.HTTP_401_UNAUTHORIZED)
            except Exception as error:
                print(error)
                return Response({"error":"Internal server Error occur"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({"error":serializers.errors})

            
           
        
class ResetpasswordApi(APIView):
    def post(self,request,format=None):
        serializers=Resetpasswordserializer(data=request.data)
        if serializers.is_valid():
            email=serializers.validated_data["email"]
            password=serializers.validated_data["password"]
            otp=(serializers.validated_data["otp"])
           
            try:
                user=resetpassword.objects.filter(resetuser__email=email,otp=otp)
               
                if user:
                    newpassword=simple_hash(password)
                    resetuser=users.objects.get(email=email)
                    resetuser.password=newpassword
                    resetuser.save()
                    return Response({"success":"Your password is Reset"},status=status.HTTP_200_OK)
                else:
                    return Response({"error":"Invalid Email or Otp"},status=status.HTTP_400_BAD_REQUEST)

            except Exception as error:
                print("error is",error)
                return Response({"errror":"internal server error occur"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({"errors":serializers.errors})
class Feedbackapi(APIView):
    def post(self, request, format=None):
        print("hi")
        serializers = UserFeedbackserializers(data=request.data)
        
        if serializers.is_valid():
            print(serializers.validated_data)
            serializers.save()
            return Response({"success": "your feedback is submitted"}, status=status.HTTP_201_CREATED)
        return Response({"errors": serializers.errors})
   
    def get(self, request, format=None):
        feedbacks = UserFeedback.objects.all().order_by('-id')  # latest first
        serializer = UserFeedbackserializers(feedbacks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)