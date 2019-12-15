from django.contrib import admin
from django.urls import path

from api import views as api_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/customer/', api_views.CustomerList.as_view(), name='customer-list'),
    path('api/customer/<int:customer_id>/', api_views.CustomerDetail.as_view(), name='customer-detail'),
    path('api/customer/login/', api_views.CustomerLogin.as_view(), name='customer-login'),
    path('api/invoices/', api_views.InvoiceList.as_view(), name='invoice-list'),
    path('api/invoices/<int:invoice_id>/', api_views.InvoiceDetail.as_view(), name='invoice-detail'),
    path('api/invoices/customer/<int:customer_id>/', api_views.InvoiceExtra.as_view(), name='invoices-list'),
    path('api/invoices/pdf/<int:invoice_id>/', api_views.GeneratePDF.as_view(), name='generate-pdf'),



]
