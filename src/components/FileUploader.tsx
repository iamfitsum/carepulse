"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  doctorImageUrl?: string;
};

export const FileUploader = ({
  files,
  doctorImageUrl,
  onChange,
}: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const previewUrl = files?.[0] ? convertFileToUrl(files[0]) : doctorImageUrl;

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {previewUrl ? (
        <div className="relative w-full h-40">
          <Image
            src={previewUrl}
            fill
            alt="uploaded image"
            className="object-contain rounded-full border border-dark-300"
          />
        </div>
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
