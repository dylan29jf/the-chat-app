"use client";

import { FC } from "react";

import { UploadDropzone } from "@/lib";

import "@uploadthing/react/styles.css";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  endpoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload: FC<Props> = ({ endpoint, value, onChange }) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="upload" className="rounded-full" />
        <button
          type="button"
          onChange={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        // Do something with the response
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};
export default FileUpload;
