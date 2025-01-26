"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import type { Doctor } from "@/types/appwrite.types";
import DoctorForm from "@/components/forms/DoctorForm";
import { deleteDoctor } from "@/lib/actions/doctor.actions";

interface DoctorModalProps {
  doctor?: Doctor;
  type?: "edit" | "delete" | "create";
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const DoctorModal = ({
  doctor,
  type = "create",
  title,
  description,
  children,
}: DoctorModalProps) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (doctor?.$id) {
      await deleteDoctor(doctor.$id);
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ||
          (type === "create" && (
            <Button className="bg-green-500/20" variant="secondary">
              Add Doctor
            </Button>
          ))}
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        {type === "delete" ? (
          <>
            <DialogHeader className="mb-4 space-y-3">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="flex justify-end gap-4">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Confirm Delete
              </Button>
            </div>
          </>
        ) : (
          <DoctorForm doctor={doctor} type={type} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
};
