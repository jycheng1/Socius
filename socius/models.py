from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
	user = models.OneToOneField(User)
	username = models.CharField(max_length = 30, primary_key = True)
	firstname = models.CharField(max_length = 30)
	lastname = models.CharField(max_length = 30)
	# picture = models.ImageField (upload_to = "photos", blank = True, null = True)

	def __unicode__(self):
		return self.firstname + ' ' + self.lastname

class Item(models.Model):
	# primary_key set only for 1 pantry. need to change when more than 1 pantry. 
	name = models.CharField(max_length = 30, primary_key = True) 

	# picture = models.ImageField (upload_to = "images", blank = True, null = True)
	# category = models.CharField()



class Request(models.Model):
	requester_firstname = models.CharField(max_length = 30)
	requester_lastname = models.CharField(max_length = 30)

	# request 3 items at a time 
	# 1 item can be requested multiple times
	# manytomanyfield, but temporarilly..
	item1 = models.CharField(max_length = 30)
	item2 = models.CharField(max_length = 30, blank=True)
	item3 = models.CharField(max_length = 30, blank=True)

	date = models.DateTimeField(auto_now_add = True)
	reason = models.CharField(max_length = 200) 



# class Donation(models.Model):
# 	# 1 donation is only done by 1 person
# 	# 1 person can make multiple donations 
# 	donor = models.ForeignKey(UserProfile)
# 	# 1 donation is only done by 1 item
# 	# 1 item can be donated multiple times 
# 	item = models.ForeignKey(Item)
# 	date = models.DateTimeField(auto_now_add = True)
# 	# whereTo = models.CharField()
