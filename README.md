<div align="center">
  <h1>CarePulse - A healthcare management system.</h1>
  <img src="public/assets/images/banner.png" alt="CarePulse Banner" style="width: 100%;"  />
</div>

<br/>

**CarePulse** is an advanced healthcare patient management application designed to simplify the process of registering, booking, and managing appointments with doctors. The system features robust administrative tools for managing doctors, scheduling, confirming, and canceling appointments, as well as sending SMS notifications to patients regarding their appointment status. Built with Next.js and powered by modern web technologies, CarePulse ensures seamless performance and a responsive design for all devices.

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies Used](#%EF%B8%8F-technologies-used)
- [📂 File Structure](#-file-structure)
- [🚀 Getting Started](#-getting-started)
- [🙏 Acknowledgements](#-acknowledgements)
- [📜 License](#-license)

---

## ✨ Features

- **Patient Registration:** Users can create their profiles to access the platform.
- **Appointment Booking:** Patients can schedule appointments with doctors, including multiple bookings.
- **Doctor Management:** Admins can add, edit, and delete doctors to keep the platform up-to-date.
- **Appointment Management:** Admins can view, manage, confirm, and cancel appointments efficiently.
- **SMS Notifications:** Patients receive SMS confirmations for their appointments.
- **File Uploads:** Users can securely upload and store files using Appwrite storage.
- **Error Monitoring:** Integrated with Sentry to track performance and identify errors.
- **Responsive Design:** Optimized for use on all devices, from desktops to mobile phones.
- **Scalable Architecture:** Built with reusable code for maintainability and scalability.

---

## 🛠️ Technologies Used

- **Next.js** for the application framework.
- **Appwrite** for backend services and file storage.
- **TypeScript** for type-safe development.
- **TailwindCSS** for styling.
- **ShadCN** for UI components.
- **Twilio** for SMS notifications.
- **Sentry** for application monitoring.

---

## 📂 File Structure

```plaintext
.
├── components.json
├── eslint.config.mjs
├── LICENSE
├── next.config.ts
├── next-env.d.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
│   ├── assets
│   ├── next.svg
│   └── vercel.svg
├── README.md
├── sentry.client.config.ts
├── sentry.edge.config.ts
├── sentry.server.config.ts
├── src
│   ├── app
│   │   ├── admin
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── global-error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── patients
│   │       └── [userId]
│   │           ├── new-appointment
│   │           │   ├── page.tsx
│   │           │   └── success
│   │           │       └── page.tsx
│   │           └── register
│   │               └── page.tsx
│   ├── components
│   │   ├── AppointmentModal.tsx
│   │   ├── CustomFormField.tsx
│   │   ├── DoctorModal.tsx
│   │   ├── FileUploader.tsx
│   │   ├── forms
│   │   │   ├── AppointmentForm.tsx
│   │   │   ├── DoctorForm.tsx
│   │   │   ├── PatientForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── PasskeyModal.tsx
│   │   ├── StatCard.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── SubmitButton.tsx
│   │   ├── table
│   │   │   ├── columns.tsx
│   │   │   └── DataTable.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui
│   │       ├── alert-dialog.tsx
│   │       ├── button.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── radio-group.tsx
│   │       ├── select.tsx
│   │       ├── table.tsx
│   │       └── textarea.tsx
│   ├── constants
│   │   └── index.ts
│   ├── instrumentation.ts
│   ├── lib
│   │   ├── actions
│   │   │   ├── appointment.actions.ts
│   │   │   ├── doctor.actions.ts
│   │   │   └── patient.actions.ts
│   │   ├── appConfig.ts
│   │   ├── appwrite.config.ts
│   │   ├── utils.ts
│   │   └── validation.ts
│   └── types
│       ├── appwrite.types.ts
│       └── index.d.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following tools installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [npm (Node Package Manager)](https://www.npmjs.com/)

### Cloning the Repository

```bash
git clone https://github.com/iamfitsum/carepulse.git
cd carepulse
```

### Installation

Install the required dependencies:

```bash
npm install
```

### Set Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```plaintext
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
DOCTOR_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

#Sentry
SENTRY_AUTH_TOKEN=

#General
NEXT_PUBLIC_ADMIN_PASSKEY=111111
```

Replace placeholders with your actual credentials. If you're unfamiliar with these services:

- **Appwrite Credentials**: You can obtain these from the [Appwrite Cloud Console](https://cloud.appwrite.io/). Create a project, configure your database and collections, and generate API keys.
- **Sentry Credentials**: Sign up for Sentry at [https://sentry.io/](https://sentry.io/), create a new project, and generate an authentication token from the API section in your account settings.

### Running the Project

Start the development server:

```bash
npm run dev
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

## 🙏 Acknowledgements

Special thanks to [Adrian](https://github.com/adrianhajdin) from JSMastery for his insightful video tutorial that guided the development of this project. Check out the course video [here](https://www.youtube.com/watch?v=lEflo_sc82g).

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
