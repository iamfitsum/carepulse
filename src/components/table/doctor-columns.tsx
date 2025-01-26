"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import { Doctor } from "@/types/appwrite.types";
import { DoctorModal } from "@/components/DoctorModal";
import { Button } from "@/components/ui/button";

export const doctorColumns: ColumnDef<Doctor>[] = [
  {
    header: "#",
    cell: ({ row }) => <span className="text-14-medium">{row.index + 1}</span>,
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative size-10">
        <Image
          src={row.original.imageUrl || "/assets/images/default-doctor.png"}
          alt="Doctor"
          fill
          className="rounded-full object-cover border border-dark-300"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="text-14-medium">Dr. {row.original.name}</span>
    ),
  },
  {
    accessorKey: "specialization",
    header: "Specialization",
    cell: ({ row }) => (
      <span className="text-14-regular text-dark-700">
        {row.original.specialization || "General Practice"}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const doctor = row.original;

      return (
        <div className="flex w-full gap-2">
          <DoctorModal
            doctor={doctor}
            type="edit"
            title="Edit Doctor"
            description="Update the doctor's information"
          >
            <Button variant="ghost" className="text-green-500 bg-green-600 w-1/2">
              Edit
            </Button>
          </DoctorModal>

          <DoctorModal
            doctor={doctor}
            type="delete"
            title="Delete Doctor"
            description="Are you sure you want to delete this doctor?"
          >
            <Button variant="ghost" className="text-red-500 bg-red-600 w-1/2">
              Delete
            </Button>
          </DoctorModal>
        </div>
      );
    },
  },
];
