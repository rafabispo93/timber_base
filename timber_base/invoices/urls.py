from django.contrib import admin
from django.urls import path

from api import views as api_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/customer/', api_views.CustomerList.as_view(), name='customer-list'),
    path('api/customer/<int:customer_id>/', api_views.CustomerDetail.as_view(), name='customer-detail'),
]
