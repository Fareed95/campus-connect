from django.db import models

class Note(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    semester = models.CharField(max_length=20)
    branch = models.CharField(max_length=50)
    contentType = models.CharField(max_length=50)
    subject = models.CharField(max_length=100, blank=True, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    driveLink = models.URLField(max_length=500)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    views = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.title} - {self.branch} ({self.semester})"


