from .models import Customer
from .serializers import CustomerSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

class CustomerList(APIView):
    """
    View all customers.
    """
    def get(self, request, format=None):
        """
        Return a list of all customers.
        """
        customers = Customer.objects.all()
        if customers:
            serializer = CustomerSerializer(customers, many=True)
            return Response(serializer.data)
        return Response("No data!")