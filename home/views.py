from django.shortcuts import render,HttpResponse

def login(request):

    return render(request, "login.html")

def dashboard(request):

    return render(request, "dashboard.html")

def department(request):

    return render(request, "department.html")

def practice(request):

    return render(request, "practice.html")

def roadmap(request):

    return render(request, "roadmap.html")

 

