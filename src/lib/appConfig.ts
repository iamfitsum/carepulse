const appConfig = {
  appName: "CarePulse",
  description: "A healthcare management system",
  logo: {
    full: "/assets/icons/logo-full.svg",
    icon: "/assets/icons/logo-icon.svg",
  },
  images: {
    onboarding: "/assets/images/onboarding-img.png",
    register: "/assets/images/register-img.png",
    appointment: "/assets/images/appointment-img.png",
    calendar: "/assets/icons/calendar.svg",
    close: "/assets/icons/close.svg",
    appointments: "/assets/icons/appointments.svg",
    pending: "/assets/icons/pending.svg",
    cancelled: "/assets/icons/cancelled.svg",
    arrow: "/assets/icons/arrow.svg",
  },
  gifs: {
    success: "/assets/gifs/success.gif",
  },
  copyright: () =>
    `© ${new Date().getFullYear()} CarePulse. All rights reserved.`,
};

export default appConfig;
