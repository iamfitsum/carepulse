"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment, Doctor } from "@/types/appwrite.types";

import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";
import { useEffect, useState } from "react";
import { getDoctors } from "@/lib/actions/doctor.actions";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      return <DoctorCell primaryPhysician={appointment.primaryPhysician} />;
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];

const DoctorCell = ({ primaryPhysician }: { primaryPhysician: string }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsData = await getDoctors();
      setDoctors(doctorsData);
    };
    fetchDoctors();
  }, []);

  const doctor = doctors.find((doctor) => doctor.name === primaryPhysician);

  return (
    <div className="flex items-center gap-3">
      <div className="relative size-8">
        <Image
          src={doctor?.imageUrl || "/assets/images/default-doctor.png"}
          alt="doctor"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="whitespace-nowrap">
          Dr. {doctor?.name || "Unknown Doctor"}
        </p>

        <span className="bg-green-100 text-green-800 text-12-semibold px-2 py-0.5 rounded-full">
          {doctor?.specialization || "General Practice"}
        </span>
      </div>
    </div>
  );
};
