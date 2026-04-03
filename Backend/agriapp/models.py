
from django.db import models
from django.utils import timezone
from datetime import timedelta
# Create your models here.
class users(models.Model):
    USER_TYPE_CHOICES = [
        ('User', 'User'),
        ('Farmer', 'Farmer'),
        ('Businessman', 'Businessman'),]  
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=254, unique=True)  
    password = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    usertype=models.CharField(max_length=20,choices=USER_TYPE_CHOICES,default='User',)


    def __str__(self):
        return self.name
    
#this for add your crops
class addyourcrop(models.Model):
    def get_bidclosestime_plus_72():
        return timezone.now() + timedelta(hours=72)
    
    crop_grade = [
            ('A', 'A'),
            ('B', 'B'),
            ('C', 'C'),
           ]  
    addedbyuser=models.ForeignKey(users,on_delete=models.CASCADE)
    cropName=models.CharField(max_length=100)
    cropestimatedprice=models.IntegerField()
    cropgrade=models.CharField(max_length=10,choices=crop_grade,default="B")
    croptotalweight=models.IntegerField()
    cropdescription=models.CharField(max_length=200)
    cropimages=models.ImageField(upload_to="crop_images/")
    cropaddedat=models.DateTimeField(default=timezone.now,null=True)
    bidclosestime= models.DateTimeField(default=get_bidclosestime_plus_72, null=True)
    currentbidamount=models.IntegerField(null=True)
    totalPrice=models.IntegerField(null=True)
    bidstatus=models.CharField(default="open",max_length=10)
    def __str__(self):
        return self.cropName


class BusinessBid(models.Model):
    Crop_bid_status = [
            ('TBD', 'TBD'),
            ('Accepted', 'Accepted'),
            ('Rejected', 'Rejected'),
           ]  
    businessman = models.ForeignKey(
        users, 
        on_delete=models.CASCADE
       
    )
    crop_name =  models.ForeignKey(addyourcrop, on_delete=models.CASCADE)
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2)
    bid_date = models.DateTimeField(auto_now_add=True)
    bid_statusforbusinessman = models.CharField(max_length=20, default='TBD',choices=Crop_bid_status)
    pay=models.BooleanField(default=False)

class resetpassword(models.Model):
    resetuser=models.ForeignKey(users,on_delete=models.CASCADE)
    otp=models.CharField(max_length=6)
class UserFeedback(models.Model):
    userid=models.ForeignKey(users,on_delete=models.CASCADE,null=True)
    feedback=models.CharField(max_length=200,null=True)
    rating=models.CharField(max_length=50,null=True)
    