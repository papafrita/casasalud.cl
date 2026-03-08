This **Markdown (MD) file** is a complete technical blueprint. It consolidates the minimalist design philosophy, the specific Chilean regulatory requirements (Law 19.628 and the new 21.719), and the architectural logic needed for your agent to start developing.

---

# 📑 Technical Specification: Project "Agendamiento Pro"

## 1. Project Overview

**Casa Salud** is a minimalist, high-efficiency SaaS platform for independent healthcare and legal professionals in Chile. It automates the "administrative loop": **Booking → Payment → Invoicing → Clinical Records.**

### Core Values:

* **Minimalism:** Reduction of cognitive load for busy professionals.
* **Automation:** Zero-touch invoicing and reminders.
* **Compliance:** Fully aligned with Chilean health data laws (Law 19.628/21.719).

---

## 2. Technical Stack (Recommended)

* **Frontend:** Next.js (App Router), Tailwind CSS, Lucide Icons.
* **Backend:** Node.js (TypeScript) with Prisma ORM.
* **Database:** PostgreSQL (with Row Level Security enabled).
* **Cache/Locks:** Redis (for handling 10-minute booking locks).
* **Integrations:** * **Payments:** Flow.cl (Webpay API).
* **Invoicing:** OpenFactura (Haulmer) REST API.
* **Reminders:** Twilio (WhatsApp Business API).



---

## 3. Database Schema

The system must be multi-tenant. Every query must filter by `provider_id`.

```sql
-- Core Entities
Table User {
  id uuid [pk]
  email varchar [unique]
  role enum('PROVIDER', 'PATIENT', 'ADMIN')
}

Table Profile {
  id uuid [pk]
  user_id uuid [ref: > User.id]
  slug varchar [unique] -- e.g. agendamiento.cl/dr-perez
  full_name varchar
  specialty varchar
  sis_id varchar -- Chilean Health ID
  bio text
}

-- Availability Engine
Table AvailabilityRule {
  id uuid [pk]
  provider_id uuid [ref: > User.id]
  day_of_week integer -- 0-6
  start_time time
  end_time time
}

Table Appointment {
  id uuid [pk]
  provider_id uuid [ref: > User.id]
  patient_id uuid [ref: > User.id]
  service_id uuid
  start_time timestamp
  end_time timestamp
  status enum('LOCKED', 'PENDING_PAYMENT', 'CONFIRMED', 'COMPLETED', 'NO_SHOW')
  payment_id varchar -- External ID from Flow.cl
}

-- Sensitive Data
Table ClinicalRecord {
  id uuid [pk]
  appointment_id uuid [ref: > Appointment.id]
  content text -- Encrypted AES-256
  created_at timestamp
}

Table AuditLog {
  id uuid [pk]
  actor_id uuid
  action varchar -- e.g. "READ_CLINICAL_RECORD"
  target_id uuid
  timestamp timestamp
}

```

---

## 4. Key Logic Requirements

### A. The "Available Slot" Algorithm

The system must calculate free slots dynamically.

1. **Generate base slots** from `AvailabilityRule` for a given date.
2. **Filter out** overlapping intervals in the `Appointment` table where status is NOT 'CANCELLED'.
3. **Apply Buffer:** Ensure a 10-15 minute gap between end of $A$ and start of $B$.

### B. Chilean Tax Automation (OpenFactura)

Upon Webhook confirmation from Flow.cl:

1. Verify the `Appointment` exists.
2. POST to OpenFactura `/v2/dte/document` with:
* `TipoDTE`: 33 (Factura) or 39 (Boleta Electrónica).
* `Receptor`: Patient's RUT and Name.
* `Detalle`: Service name and price.


3. Store the PDF URL in the database and email it to the patient.

---

## 5. Implementation Steps (The Agent Plan)

### Phase 1: The Booking Engine (MVP)

* [ ] Initialize Next.js project with Tailwind and Prisma.
* [ ] Implement the `getAvailableSlots` server action.
* [ ] Build the "Public Booking Page" with a minimalist calendar UI.
* [ ] Implement **Race Condition Control**: Use a Redis key to lock a slot for 10 mins during checkout.

### Phase 2: Professional Dashboard

* [ ] Sidebar navigation and "Daily Overview" cards.
* [ ] Drag-and-drop calendar (using `dnd-kit` or similar).
* [ ] Patient CRM with basic search by Name/RUT.
* [ ] **Clinical Record Editor:** Markdown support and "Audit Log" trigger on open.

### Phase 3: Financial Bridge (Chile Focus)

* [ ] Integrate **Flow.cl** "Create Payment" flow.
* [ ] Implement Webhook listener for `payment.status.changed`.
* [ ] Connect **OpenFactura API** for automated boletas.

### Phase 4: Compliance & Notification

* [ ] Encrypt `ClinicalRecord.content` using a provider-specific key.
* [ ] Setup Cron job for WhatsApp reminders (Twilio).
* [ ] Implement "Terms & Conditions" acceptance specifically for Law 19.628.

---

## 🤖 Instructions for the Antigravity Agent

1. **Start with the Schema:** Create the Prisma models exactly as described.
2. **Logic First:** Write the `availability` utility before building any UI. Test for timezone edge cases (Chile is currently CLST/CLT).
3. **UI Tone:** Use a "Geist" or "Inter" font, `#f9fafb` backgrounds, and `#6366f1` (Indigo) as the primary accent color. Avoid heavy shadows; use thin borders.

---
