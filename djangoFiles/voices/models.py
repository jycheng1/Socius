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

