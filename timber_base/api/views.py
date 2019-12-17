from django.template.loader import get_template
from django.http import HttpResponse
from django.views.generic import View

from .models import Customer, Invoice
from .serializers import CustomerSerializer, InvoiceSerializer

from django.http import Http404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status  

from api.utils import render_to_pdf

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

class CustomerLogin(APIView):
    def post(self, request, format=None):
        try:
            user = Customer.objects.get(name=request.data["username"], password=request.data["password"])
            if user:
                serializer = CustomerSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            raise Http404

class InvoiceList(generics.ListCreateAPIView):
    """
    Lists and creates invoices.
    """
    try:
        queryset = Invoice.objects.all()
        serializer_class = InvoiceSerializer
    except Exception as error:
        print(error)

class InvoiceDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Returns a single Invoice and allows updates and deletion of a Invoice.
    """
    try:
        queryset = Invoice.objects.all()
        serializer_class = InvoiceSerializer
        lookup_url_kwarg = 'invoice_id'
    except Exception as error:
        print(error)

class InvoiceExtra(APIView):
    def get(self, request, customer_id, format=None):
        try:
            invoices = Invoice.objects.filter(customer=customer_id)
            if invoices:
                serializer = InvoiceSerializer(invoices, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response("No data!")
        except Invoice.DoesNotExist:
            raise Http404

class GeneratePDF(View):
    def get(self, request, invoice_id, *args, **kwargs):
        print(invoice_id, "invoice id")
        template = get_template('pdf/invoice.html')
        invoice = Invoice.objects.filter(id=invoice_id)

        context = {
            "invoice_id": invoice_id,
            "customer_email": invoice[0].customer.email,
            "amount": invoice[0].total,
            "date": invoice[0].created_on,
            "address": invoice[0].address,
        }
        html = template.render(context)
        pdf = render_to_pdf('pdf/invoice.html', context)
        if pdf:
            response = HttpResponse(pdf, content_type='application/pdf')
            filename = "Invoice_%s.pdf" %("12341231")
            content = "inline; filename='%s'" %(filename)
            download = request.GET.get("download")
            if download:
                content = "attachment; filename='%s'" %(filename)
            response['Content-Disposition'] = content
            return response
        return HttpResponse("Not found")

