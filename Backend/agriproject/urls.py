"""
URL configuration for agriproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path,include
from agriapp.views import userApi,userloginApi,VerifyToken,Addyourcropview,BusinessBidApi,UserdetailApi,ForgetpasswordApi,ResetpasswordApi,Feedbackapi
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
     path('admin_tools_stats/', include('admin_tools_stats.urls')),
    path("signupuser/",userApi.as_view(),name="signupuser"),
     path("userdetails/",UserdetailApi.as_view(),name="userdetails"),
    path("loginuser/",userloginApi.as_view(),name="userlogin"),
    path("validatetoken/",VerifyToken.as_view(),name="validatetoken"),
    path("addcrop/",Addyourcropview.as_view(),name="addyourcrop"),
    path("addcrop/<int:pk>/", Addyourcropview.as_view(), name="update-crop"),
    path("businessbid/",BusinessBidApi.as_view(),name="businessbidapi"),
    path("forgetpassword/",ForgetpasswordApi.as_view(),name="forgetpassword"),
    path("resetpassword/",ResetpasswordApi.as_view(),name="resetpassword"),
    path("feedback/",Feedbackapi.as_view(),name="feedback"),
    
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)