import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GoogleFormService {
  private formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdLhUMHBKpp9YDEHzCQFWz-4f8Gwm4Zk9Y47VmALiFaPymGLQ/formResponse';

  async submit(name: string, email: string, message: string): Promise<void> {
    return new Promise((resolve) => {
      // 1. Create a hidden iframe
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // 2. Create a form that targets the iframe
      const form = document.createElement('form');
      form.action = this.formUrl;
      form.method = 'POST';
      form.target = 'hidden_iframe'; // ✅ No new tab
      form.style.display = 'none';

      const data = {
        'entry.1223154815': name,
        'entry.1798431431': email,
        'entry.584764575': message
      };

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.name = key;
        input.value = value;
        input.type = 'hidden';
        form.appendChild(input);
      });

      document.body.appendChild(form);

      // 3. Submit via iframe, then cleanup
      iframe.onload = () => {
        setTimeout(() => {
          document.body.removeChild(form);
          document.body.removeChild(iframe);
          resolve();
        }, 100);
      };

      form.submit();
    });
  }
}