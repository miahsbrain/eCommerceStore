from django.urls import path
from ..views.product_views import *

urlpatterns = [
    path('', getProducts, name='products'),
    path('create/', createProduct, name='product-create'),
    path('upload/', uploadImage, name='product-upload'),
    path('<str:pk>/reviews/', createProductReview, name='create-review'),
    path('top/', getTopProducts, name='top-products'),
    path('<str:pk>/', getProduct, name='product'),
    path('delete/<str:pk>/', deleteProduct, name='product-delete'),
    path('update/<str:pk>/', updateProduct, name='product-update'),
]