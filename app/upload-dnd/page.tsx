"use client";
import { useState } from "react";
import { UploadDropzone } from "../lib/uploadthing";
import Link from "next/link";

export default function UploadButtonPage() {
  const [images, setimages] = useState<
    {
      fileUrl: string;
      filekey: string;
    }[]
  >([]);

  const title = images.length ? (
    <>
      <p>Upload complete!</p>
      <p className="mt-2">{images.length}</p>
    </>
  ) : null;

  const imgList = (
    <>
      {title}
      <ul>
        {images.map((image) => (
          <li key={image.fileUrl}>
            <Link href={image.fileUrl} target="_blank">
              {image.fileUrl}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            // Map the response to the expected structure
            const formattedImages = res.map((file) => ({
              fileUrl: file.url, // Use the 'url' property from the response
              filekey: file.key, // Use the 'key' property from the response
            }));
            setimages(formattedImages);

            // Optional: Display an alert and log the response
            alert("Upload Completed");
            const json = JSON.stringify(formattedImages);
            console.log(json);
          }
        }}
        onUploadError={(error: Error) => {
          // Handle upload error
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imgList}
    </main>
  );
}
