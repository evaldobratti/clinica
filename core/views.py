from django.shortcuts import render
from django import http
from django.contrib.auth.decorators import login_required
# Create your views here.

from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
import serialiazers
from rest_framework.decorators import api_view


@ensure_csrf_cookie
@csrf_exempt
def auth(request):
    username = request.POST['username']
    password = request.POST['password']

    user = authenticate(username=username, password=password)
    if user:
        login(request, user)
        return http.JsonResponse(serialiazers.UserSerializer(user).data)
    else:
        return http.HttpResponseForbidden()


@ensure_csrf_cookie
@csrf_exempt
def get_user_data(request):
    if request.user.is_authenticated:
        return http.JsonResponse(serialiazers.UserSerializer(request.user).data)
    else:
        return http.HttpResponseForbidden()


def home(request):
    return render(request, 'base.html')
