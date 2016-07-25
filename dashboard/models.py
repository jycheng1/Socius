from django.db import models
from django.contrib.auth.models import User

# Todo: change field config for Org - phone number, site url 

class UserProfile(models.Model):
	user = models.OneToOneField(User)
	username = models.CharField(max_length = 30, primary_key = True)
	firstname = models.CharField(max_length = 30)
	lastname = models.CharField(max_length = 30)
	picture = models.ImageField(upload_to = "photos/profile", blank = True, null = True)

	def __unicode__(self):
		return self.firstname + ' ' + self.lastname

class Organization(models.Model):
	name = models.CharField(max_length = 100)
	address = models.CharField(max_length = 100)
	phone_number = models.IntegerField()
	site_url = models.URLField()
	picture = models.ImageField(upload_to = "photos/org", blank = True, null = True)


	def __unicode__(self):
		return self.name;


class Product(models.Model):
	name = models.CharField(max_length=100)
	picture = models.ImageField(upload_to='photos/product', blank=True, null=True)
	organization = models.ForeignKey(Organization, related_name = 'products')

	def __unicode__(self):
		return self.name + ', org: ' + self.organization.name


class Request(models.Model):
	# reverse - Organization.requests.all(), default related_name = request_set
	organization = models.ForeignKey(Organization, related_name = 'requests')
	requester_firstname = models.CharField(max_length = 30)
	requester_lastname = models.CharField(max_length = 30)

	product1 = models.CharField(max_length = 30)
	product2 = models.CharField(max_length = 30, blank=True)
	product3 = models.CharField(max_length = 30, blank=True)

	date = models.DateTimeField(auto_now_add = True)
	reason = models.CharField(max_length = 200) 


	def __unicode__(self):
		return (str(self.date.strftime('%Y-%m-%d %H:%M:%S')) + ' - ' + self.request1 + ' - ' + 
		self.request2 + ' - ' + self.request3)




