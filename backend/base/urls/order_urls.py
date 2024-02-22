from django.urls import path
from ..views.order_views import *

urlpatterns = [
    path('', getOrders, name='orders'),
    path('add/', addOrderItems, name='orders-add'),
    path('myorders/', getMyOrders, name='my-orders'),
    path('<str:pk>/deliver/', updateOrderToDelivered, name='order-deliver'),
    path('<str:pk>/', getOrderbyId, name='user-order'),
    path('<str:pk>/pay/', updateOrderToPaid, name='pay'),
]