from rest_framework import serializers
from .models import Customer, Invoice

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'name', 'email', 'password', 'created_on')

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = ('id', 'address', 'created_on', 'total', 'customer')