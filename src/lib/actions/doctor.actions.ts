"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

import {
  BUCKET_ID,
  DATABASE_ID,
  DOCTOR_COLLECTION_ID,
  ENDPOINT,
  PROJECT_ID,
  databases,
  storage,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Doctor } from "@/types/appwrite.types";

export const createDoctor = async (doctorData: {
  name: string;
  specialization?: string;
  imageFile?: FormData;
}) => {
  try {
    let file;
    if (doctorData.imageFile) {
      const inputFile = InputFile.fromBuffer(
        doctorData.imageFile.get("blobFile") as Blob,
        doctorData.imageFile.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newDoctor = await databases.createDocument(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      ID.unique(),
      {
        name: doctorData.name,
        specialization: doctorData.specialization || null,
        imageId: file?.$id || null,
        imageUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
          : null,
      }
    );

    return parseStringify(newDoctor);
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }
};

export const getDoctors = async () => {
  try {
    const doctors = await databases.listDocuments(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      [Query.orderAsc("name")]
    );
    return parseStringify(doctors.documents as Doctor[]);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

export const updateDoctor = async (doctorId: string, doctorData: {
  name: string;
  specialization?: string;
  imageFile?: FormData;
}) => {
  try {
    let file;
    if (doctorData.imageFile) {
      const inputFile = InputFile.fromBuffer(
        doctorData.imageFile.get("blobFile") as Blob,
        doctorData.imageFile.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const updateData = {
      name: doctorData.name,
      specialization: doctorData.specialization || null,
      ...(file?.$id && {
        imageId: file.$id,
        imageUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`
      })
    };

    const updatedDoctor = await databases.updateDocument(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      doctorId,
      updateData
    );

    return parseStringify(updatedDoctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
};

export const deleteDoctor = async (doctorId: string) => {
  try {
    await databases.deleteDocument(
      DATABASE_ID!,
      DOCTOR_COLLECTION_ID!,
      doctorId
    );
    return parseStringify({ success: true });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};