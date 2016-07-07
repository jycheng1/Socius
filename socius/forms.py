from django import forms
from socius.models import *

# basic user information form for login
class UserProfileForm(forms.ModelForm):
	class Meta: 
		model = UserProfile
		exclude = ('user',)
		# widgets = {'picture' : forms.FileInput()}
	password1 = forms.CharField(max_length = 30, 
								label = 'Password',
								widget = forms.PasswordInput())
	password2 = forms.CharField(max_length = 30, 
								label = 'Confirm Password',
								widget = forms.PasswordInput())

	# Password confirmation check.
	def clean_password2(self):
		# Extract password data.
		password1 = self.cleaned_data.get('password1')
		password2 = self.cleaned_data.get('password2')
		
		# Check password conditions:
		if not password2:
			raise forms.ValidationError("Enter password confirmation.")
		
		if password1 != password2:
			raise forms.ValidationError("Passwords do not match")
		
		# Return cleaned data if no error:
		return password2


# basic request form 
class RequestForm(forms.ModelForm):
	class Meta:
		model = Request
		exclude = ()
