from django.shortcuts import render
from basic_func.forms import UserInfoForm, UserForm, LoginForm

# Extra Imports for the Login and Logout Capabilities
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required
from django.urls import reverse

# Create your views here.
def index(request):
    loginForm = LoginForm()

    if (request.method == 'POST'):
        if ('user_name' in request.session and 'user_password' in request.session):
            User_authenticate(request,request.session['user_name'],request.session['user_password'])
            print("enter")

        else:

            loginDetail = LoginForm(request.POST)

            if loginDetail.is_valid():
                User_authenticate(request,loginDetail.cleaned_data['user_name'],loginDetail.cleaned_data['password'])
            else:
                print(loginDetail.errors)

    return render(request,'basic_func/home.html',{'loginForm':loginForm})

def User_authenticate(request,user_name,user_password):
    user = authenticate(username=user_name, password=user_password)
    if user:
        #Check it the account is active
        if user.is_active:
            # Log the user in.
            login(request,user)
        else:
            # If account is not active:
            return HttpResponse("Your account is not active.")
    else:
        print("Someone tried to login and failed.")
        print("They used username: {} and password: {}".format(user_name,user_password))
        return HttpResponse("Invalid login details supplied.")


def User_register(request):
    registered = False
    user_name = None
    user_password = None
    if (request.method == "POST"):
        form_0 = UserForm(data=request.POST)
        form_1 = UserInfoForm(data=request.POST)

        if form_0.is_valid() and form_1.is_valid():

            user = form_0.save()
            # print(form_0.cleaned_data['username'],form_0.cleaned_data['password'])

            request.session['user_name'] = form_0.cleaned_data['username']
            request.session['user_password'] = form_0.cleaned_data['password']

            user.set_password(user.password)
            user.save()


            profile = form_1.save(commit=False)
            profile.user = user                 # set up the OneToOne Relationship

            if 'profile_pic' in request.FILES:
                profile.profile_pic = request.FILES['profile_pic']

            profile.save()                      # save to db

            registered = True
        else:
            print(form_0.errors,form_1.errors)
            print (form_0.cleaned_data)
    else:
        form_0 = UserForm()
        form_1 = UserInfoForm()

    return render(request,'basic_func/register.html',
                {'user_form':form_0,'profile_form':form_1,'registered':registered})

@login_required
def User_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('basic_func:User_index'))
