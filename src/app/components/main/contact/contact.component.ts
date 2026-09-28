import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;

  private readonly phoneNumber = '573003887576';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: [''],
      category: ['', Validators.required],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  sendWhatsApp(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const { name, phone, category, subject, message } = this.contactForm.value;

    const lines = [
      `🔔 *Solicitud de Contacto / Cotización*`,
      ``,
      `👤 *Nombre:* ${name}`,
      phone ? `📱 *Teléfono:* ${phone}` : '',
      `🏷️ *Servicio:* ${category}`,
      `📋 *Asunto:* ${subject}`,
      ``,
      `💬 *Mensaje:*`,
      message,
    ].filter(line => line !== '');

    const text = encodeURIComponent(lines.join('\n'));
    const url = `https://wa.me/${this.phoneNumber}?text=${text}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
