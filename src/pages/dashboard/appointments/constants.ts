import type { Day } from "./types";

export const days: Day[] = [
  {
    name: "MON",
    date: 24,
    appointments: [
      {
        id: 1,
        time: "09:00",
        patient: "James Miller",
        type: "General consultation",
        duration: 60,
      },
      {
        id: 2,
        time: "11:30",
        patient: "Emma Wilson",
        type: "Follow-up",
        duration: 60,
      },
    ],
  },
  {
    name: "TUE",
    date: 25,
    appointments: [
      {
        id: 3,
        time: "10:00",
        patient: "Anna Taylor",
        type: "Initial consultation",
        duration: 60,
      },
      {
        id: 4,
        time: "14:00",
        patient: "Noah Davis",
        type: "General consultation",
        duration: 60,
      },
    ],
  },
  {
    name: "WED",
    date: 26,
    appointments: [
      {
        id: 5,
        time: "09:30",
        patient: "Olivia Brown",
        type: "Follow-up",
        duration: 60,
      },
      {
        id: 6,
        time: "13:00",
        patient: "Liam Wilson",
        type: "General consultation",
        duration: 60,
      },
    ],
  },
  {
    name: "THU",
    date: 27,
    appointments: [
      {
        id: 7,
        time: "09:00",
        patient: "Emma Wilson",
        type: "General consultation",
        duration: 60,
      },
      {
        id: 8,
        time: "10:30",
        patient: "James Miller",
        type: "Follow-up",
        duration: 60,
      },
      {
        id: 9,
        time: "12:00",
        patient: "Olivia Brown",
        type: "Initial consultation",
        duration: 60,
      },
      {
        id: 10,
        time: "14:30",
        patient: "Noah Davis",
        type: "General consultation",
        duration: 60,
      },
      {
        id: 11,
        time: "16:00",
        patient: "Sophia Wilson",
        type: "Follow-up",
        duration: 60,
      },
    ],
  },
  {
    name: "FRI",
    date: 28,
    appointments: [
      {
        id: 12,
        time: "09:00",
        patient: "Noah Davis",
        type: "Follow-up",
        duration: 60,
      },
      {
        id: 13,
        time: "11:00",
        patient: "Charlotte Smith",
        type: "General consultation",
        duration: 60,
      },
    ],
  },
  {
    name: "SAT",
    date: 29,
    appointments: [],
  },
  {
    name: "SUN",
    date: 30,
    appointments: [],
  },
];

export const hours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];
