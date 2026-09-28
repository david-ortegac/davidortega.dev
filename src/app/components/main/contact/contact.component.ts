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
      name: ['', Validators.required],
      phone: [''],
      category: ['', Validators.required],
      service: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendWhatsApp(): void {
    if (this.contactForm.invalid) return;

    const { name, phone, category, service, subject, message } = this.contactForm.value;

    const lines = [
      `🔔 *Solicitud de Cotización*`,
      ``,
      `👤 *Nombre:* ${name}`,
      phone ? `📱 *Teléfono:* ${phone}` : '',
      `🏷️ *Categoría:* ${category}`,
      `💼 *Servicio:* ${service}`,
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
