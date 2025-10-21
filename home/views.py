from django.shortcuts import render, redirect
from .models import Note
import json

# Home/Login view
def home(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return render(request, "account/login.html")

def dashboard(request):
    return render(request, "dashboard.html")


def department(request):
    notes = Note.objects.all().order_by('-uploaded_at')  
    print(notes)
    return render(request, "department.html", {"notes": notes})

def practice(request):
    return render(request, "practice.html")

def roadmap(request):
    return render(request, "roadmap.html")

def tutorial(request):
    return render(request, "tutorial.html")

# ✅ Department page — fetch and pass notes
def department_page(request):
    notes = Note.objects.all().order_by('-uploaded_at')
    notes_json = json.dumps(list(notes.values(
        "id", "title", "description", "branch", "subject", "semester", "name", "driveLink", "views"
    )))
    return render(request, 'department.html', {
        'notes': notes,
        'notes_json': notes_json
    })

# ✅ Upload page — handles uploads
def upload_page(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        semester = request.POST.get('semester')
        branch = request.POST.get('branch')
        contentType = request.POST.get('contentType')
        subject = request.POST.get('subject')
        title = request.POST.get('title')
        description = request.POST.get('description')
        driveLink = request.POST.get('driveLink')

        Note.objects.create(
            name=name,
            email=email,
            semester=semester,
            branch=branch,
            contentType=contentType,
            subject=subject,
            title=title,
            description=description,
            driveLink=driveLink
        )
        return redirect('department')  # redirect to department after upload

    return render(request, 'upload_page.html')


