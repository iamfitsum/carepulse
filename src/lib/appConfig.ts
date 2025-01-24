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
    calendar: "/assets/icons/calendar.svg"
  },
  gifs: {
    success: "/assets/gifs/success.gif",
  },
  copyright: () =>
    `© ${new Date().getFullYear()} CarePulse. All rights reserved.`,
};

export default appConfig;
