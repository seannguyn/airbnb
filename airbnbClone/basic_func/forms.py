from django.contrib.auth.models import User
from django import forms
from basic_func.models import UserProfileInfo

class UserForm(forms.ModelForm):

    email_verify = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput())
    password_verify = forms.CharField(widget=forms.PasswordInput(),label='verify password')

    field_order = ['username', 'email', 'email_verify','password','form_password_verify']


    class Meta():
        model = User
        fields = ('username','email','password',)
        help_texts = {
            'username': None,
        }

    def clean(self):
        all_clean = super().clean()

        email = all_clean['email']
        v_email = all_clean['email_verify']

        password = all_clean['password']
        password_verify = all_clean['password_verify']

        if (email != v_email):
            raise forms.ValidationError("email doesnt match")

        if (password != password_verify):
            raise forms.ValidationError("password doesnt match")

class UserInfoForm(forms.ModelForm):

    class Meta():
        model = UserProfileInfo
        fields = ('profile_pic',)

class LoginForm(forms.Form):

    user_name = forms.CharField(min_length=3, label="Username")
    password = forms.CharField(widget=forms.PasswordInput, label="Password")
