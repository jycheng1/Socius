from django.db import models

class Request(models.Model):
    requestDate = models.DateTimeField(auto_now_add=True)
    request1 = models.CharField(max_length=100)
    request2 = models.CharField(max_length=100, default=None, blank=True, null=True)
    request3 = models.CharField(max_length=100, default=None, blank=True, null=True)
    why = models.CharField(max_length=200, default=None, blank=True, null=True)
    #why2 = models.CharField(max_length=200)
    #why3 = models.CharField(max_length=200)
    satisfaction = models.CharField(max_length=20, default=None, blank=True, null=True)
    ethnicity = models.CharField(max_length=50, default=None, blank=True, null=True)
    name = models.CharField(max_length=100, default=None, blank=True, null=True)
    birthday = models.CharField(max_length=50, default=None, blank=True, null=True)
    email = models.CharField(max_length=50, default=None, blank=True, null=True)



    def __str__(self):
        return (str(self.requestDate.strftime('%Y-%m-%d %H:%M:%S')) + ' - ' + self.request1 + ' - ' + 
            self.request2 + ' - ' + self.request3 + ' - ' + self.why + ' - ' + self.satisfaction + ' - ' + 
            self.ethnicity + ' - ' + self.name + ' - ' + self.birthday + ' - ' + self.email)



class Products(models.Model):
    prodName = models.CharField(max_length=100, default=None, blank=True, null=True)
    prodImg = models.CharField(max_length=400, default=None, blank=True, null=True)
    prodType = models.CharField(max_length=400, default=None, blank=True, null=True)    

    def __str__(self):
        return self.prodName + ' - ' + str(self.prodType)

