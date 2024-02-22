from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Product, Order, OrderItem, ShippingAddress, Review
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken



class ReviewSerializer(ModelSerializer):
    class Meta():
        model = Review
        fields = '__all__'

class ProductSerializer(ModelSerializer):
    reviews = SerializerMethodField(read_only=True)
    class Meta():
        model = Product
        fields = '__all__'
    
    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs) -> dict[str, str]:
        data = super().validate(attrs)
        # data['username'] = self.user.username
        # data['email'] = self.user.email
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class UserSerializer(ModelSerializer):
    name = SerializerMethodField(read_only=True)
    _id = SerializerMethodField(read_only=True)
    isAdmin = SerializerMethodField(read_only=True)

    class Meta():
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin' ]

    def get__id(self, obj):
        return obj.id
    
    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if not name:
            name = obj.email

        return name
    
class UserSerializerWithToken(UserSerializer):
    token = SerializerMethodField(read_only=True)
    class Meta():
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token',]

    def get_token(self, obj) -> str:
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    
class ShippingAddressSerializer(ModelSerializer):
    class Meta():
        model = ShippingAddress
        fields = '__all__'
    
class OrderItemSerializer(ModelSerializer):
    class Meta():
        model = OrderItem
        fields = '__all__'
    
class OrderSerializer(ModelSerializer):
    orderItems = SerializerMethodField(read_only=True)
    shippingAddress = SerializerMethodField(read_only=True)
    user = SerializerMethodField(read_only=True)

    class Meta():
        model = Order
        fields = '__all__'
    
    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    
    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress).data
        except:
            address = False
        return address
    
    def get_user (self, obj):
        user = obj.user
        serializer = UserSerializer(user)
        return serializer.data
    
