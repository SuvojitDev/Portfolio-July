import { AbstractControl, ValidationErrors } from '@angular/forms';

const ALLOWED_DOMAINS = [
    'gmail.com',
    'outlook.com',
    'yahoo.com',
    'zoho.com',
    'icloud.com',
    'aol.com'
];

export function allowedEmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.toLowerCase();
    if (!value || !value.includes('@')) {
        return { missingAtSymbol: true };
    }

    const [localPart, domain] = value.split('@');

    // ✅ Only allow selected domains
    if (!ALLOWED_DOMAINS.includes(domain)) {
        return { invalidDomain: true };
    }

    // ✅ Block "+" sign
    if (localPart.includes('+')) {
        return { suspiciousEmail: true };
    }

    // ✅ Block multiple consecutive dots
    if (/\.\.+/.test(localPart)) {
        return { suspiciousEmail: true };
    }

    // ✅ Block if too many dots (more than 1)
    const dotCount = (localPart.match(/\./g) || []).length;
    if (dotCount > 1) {
        return { suspiciousEmail: true };
    }

    // ✅ Check structure
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
        return { invalidEmail: true };
    }

    return null;
}

