from allauth.account.adapter import DefaultAccountAdapter
from django.core.exceptions import ValidationError

class CollegeDomainRestrictionAdapter(DefaultAccountAdapter):
    def is_open_for_signup(self, request):
        # ✅ Allow signup (needed for Google login)
        return True

    def clean_email(self, email):
        email = super().clean_email(email)
        allowed_domain = "eng.rizvi.edu.in"
        if not email.endswith(f"@{allowed_domain}"):
            raise ValidationError(
                f"Access denied. Only emails ending with @{allowed_domain} are allowed."
            )
        return email

