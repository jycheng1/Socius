from django.db import models

class Request(models.Model):
    requestDate = models.DateTimeField(auto_now_add=True)
    request1 = models.CharField(max_length=100)
    request2 = models.CharField(max_length=100)
    request3 = models.CharField(max_length=100)
    why = models.CharField(max_length=200)

    def __str__(self):
        return (str(self.requestDate.strftime('%Y-%m-%d %H:%M:%S')) + ' - ' + self.request1 + ' - ' + 
            self.request2 + ' - ' + self.request3)



class Products(models.Model):
    prodName = models.CharField(max_length=100)
    prodImg = models.CharField(max_length=400)
    isAdded = models.BooleanField(default=False)

    def __str__(self):
        return self.prodName + ' - ' + str(self.isAdded)

