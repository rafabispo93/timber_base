from django.db import models
from datetime import date

# Create your models here.
class Customer(models.Model):
    """Stores a customer."""
    name = models.CharField(max_length=50)
    email = models.EmailField()
    password = models.CharField(max_length=12)

    # Date the customer was created.
    created_on = models.DateField(default=date.today)

    # Meta data about the database table.
    class Meta:
        db_table = 'customer'

        # Set default ordering
        ordering = ['id']

    # Define what to output when the model is printed as a string.
    def __str__(self):
        return self.email