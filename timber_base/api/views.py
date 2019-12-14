from .models import Customer
from .serializers import CustomerSerializer

from django.http import Http404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status  

class CustomerList(generics.ListCreateAPIView):
    """
    Lists and creates customers.
    """
    try:
        queryset = Customer.objects.all()
        serializer_class = CustomerSerializer
    except Exception as error:
        print(error)

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Returns a single Customer and allows updates and deletion of a Customer.
    """
    try:
        queryset = Customer.objects.all()
        serializer_class = CustomerSerializer
        lookup_url_kwarg = 'customer_id'
    except Exception as error:
        print(error)