import { FaRegCalendarAlt } from "react-icons/fa";

export const USER = {
  name: "Charlotte Seyab",
  email: "ron468896@gmail.com",
  role: "professional",
};

export const NAVLINKS = [
  {
    link: "Blog",
    path: "/blog",
  },
  {
    link: "About",
    path: "/about",
  },
  {
    link: "Book Consultation",
    path: "/consultation",
  },
  {
    link: "Therapist Jobs",
    path: "/professional",
  },
];

export const CLIENT_SIDEBAR_LINKS = [
  {
    link: "My Appointments",
    path: "/dashboard/appointments",
    icon: FaRegCalendarAlt,
  },
];

export const PROFESSIONAL_SIDEBAR_LINKS = [
  {
    link: "My Appointments",
    path: "/dashboard/professional/appointments",
    icon: FaRegCalendarAlt,
  },
  {
    link: "Consultations",
    path: "/dashboard/professional/consultations",
    icon: FaRegCalendarAlt,
  },
];
