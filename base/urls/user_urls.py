from django.urls import path
from ..views.user_views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', getUsers, name='users'),
    path('profile/', getUserProfile, name='user-proifile'),
    path('profile/update/', updateUserProfile, name='user-proifile-update'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', registerUser, name='register'),

    path('delete/<str:pk>/', deleteUser, name='user-delete'),
    path('update/<str:pk>/', updateUser, name='user-update'),
    path('<str:pk>/', getUserById, name='user'),
]