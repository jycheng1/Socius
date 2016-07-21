from django.db import models

class Request(models.Model):
    requestDate = models.DateTimeField(auto_now_add=True)
    request1 = models.CharField(max_length=100)
    request2 = models.CharField(max_length=100, default="", null=True, blank=True)
    request3 = models.CharField(max_length=100, default="", null=True, blank=True)
    why1 = models.CharField(max_length=200, default="", null=True, blank=True)
    why2 = models.CharField(max_length=200, default="", null=True, blank=True)
    why3 = models.CharField(max_length=200, default="", null=True, blank=True)
    # satisfaction = models.CharField(max_length=20, default=None, blank=True, null=True)
    additionalItems = models.CharField(max_length=400, default="", null=True, blank=True)
    ethnicity = models.CharField(max_length=50, default="", null=True, blank=True)
    zipcode = models.CharField(max_length=6, default="", null=True, blank=True)
    birthday = models.CharField(max_length=50, default="", null=True, blank=True)
    gender = models.CharField(max_length=20, default="", null=True, blank=True)
    diet = models.CharField(max_length=100, default="", null=True, blank=True)
    religiousDiet = models.CharField(max_length=100, default="", null=True, blank=True)



    def __str__(self):
        return (str(self.requestDate.strftime('%Y-%m-%d %H:%M:%S')) + ' - ' + self.request1 + ' - ' + 
            self.request2 + ' - ' + self.request3 + ' - ' + self.why1 + ' - ' + self.why2 + ' - ' + 
            self.why3 + ' - ' + self.additionalItems + ' - ' + 
            self.ethnicity + ' - ' + self.zipcode + ' - ' + self.birthday + ' - ' + self.gender + ' - ' + 
            self.diet + ' - ' + self.religiousDiet)



class Products(models.Model):
    prodName = models.CharField(max_length=100, default=None, blank=True, null=True)
    prodImg = models.CharField(max_length=400, default=None, blank=True, null=True)
    prodType = models.CharField(max_length=400, default=None, blank=True, null=True)    

    def __str__(self):
        return self.prodName + ' - ' + str(self.prodType)

