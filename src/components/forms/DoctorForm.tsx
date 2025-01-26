"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { DoctorSchema } from "@/lib/validation";
import { createDoctor, updateDoctor } from "@/lib/actions/doctor.actions";
import { useRouter } from "next/navigation";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { FileUploader } from "../FileUploader";
import { Doctor } from "@/types/appwrite.types";


interface DoctorFormProps {
  doctor?: Doctor;
  type: "create" | "edit";
  setOpen: (open: boolean) => void;
}

const DoctorForm = ({ doctor, type, setOpen }: DoctorFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof DoctorSchema>>({
    resolver: zodResolver(DoctorSchema),
    defaultValues: {
      name: doctor?.name || "",
      specialization: doctor?.specialization || "",
      imageFile: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof DoctorSchema>) => {
    setIsLoading(true);

    let formData;
    if (values.imageFile && values.imageFile.length > 0) {
      const blobFile = new Blob([values.imageFile[0]], {
        type: values.imageFile[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.imageFile[0].name);
    }

    try {
      const doctorData = {
        name: values.name,
        specialization: values.specialization,
        imageFile: formData,
      };

      if (type === "create") {
        const newDoctor = await createDoctor(doctorData);
        if (newDoctor) router.refresh();
      } else if (doctor?.$id) {
        await updateDoctor(doctor.$id, doctorData);
      }

      setOpen(false);
    } catch (error) {
      console.error("Form submission error:", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="space-y-4">
          <h1 className="header">
            {type === "create" ? "Add New Doctor" : "Edit Doctor"}
          </h1>
          <p className="text-dark-700">
            Manage doctor&apos;s professional information
          </p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="Dr. John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="specialization"
          label="Specialization (optional)"
          placeholder="E.g. General Practice"
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="imageFile"
          label="Profile Image"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader doctorImageUrl={doctor?.imageUrl} files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <SubmitButton isLoading={isLoading}>
          {type === "create" ? "Add Doctor" : "Update Doctor"}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default DoctorForm;