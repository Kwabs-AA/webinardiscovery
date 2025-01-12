"use client"
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "../app/lib/uploadthing";

const Forms = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const email = session?.user?.email;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    webinarlink: "",
    date: ""
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [link, setLink] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      router.push("/signin");
      return;
    }

    if (!link) {
      setMessage("Please upload an image");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch("/api/form/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email,
          link // Changed from url to link
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setFormData({ name: "", description: "", webinarlink: "", date: "" });
        setLink("");
        router.push("/success")
      } else {
        setMessage(data.message || "Submission failed");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center shadow-xl mb-2 rounded-2xl ">
          <h2 className="text-3xl font-extrabold text-gray-900">Program Registration</h2>
          <p className="mt-2 text-lg text-gray-600">Enter your program details below</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {message && (
            <div role="alert" className={`alert ${message.includes("failed") || message.includes("error") ? "alert-error" : "alert-success"}`}>
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 uppercase">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 uppercase">
                Program Description
              </label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200"
                minLength={16}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="webinarlink" className="block text-sm font-semibold text-gray-700 uppercase">
                Upload Link here
              </label>
                <input
                  type="url"
                  id="webinarlink"
                  value={formData.webinarlink}
                  onChange={handleInputChange}
                  required
                  className="block w-full  px-4 py-3 rounded-xl border-2 border-gray-200"
                />
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 uppercase">
                Program Date
              </label>
              <input
                type="datetime-local"
                id="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 uppercase">
                Upload Image
              </label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0]) {
                    setLink(res[0].url);
                    setMessage("Image uploaded successfully");
                  }
                }}
                onUploadError={(error: Error) => {
                  setMessage(`Upload failed: ${error.message}`);
                }}
              />
              {link && (
                <p className="text-sm text-green-600">Image uploaded successfully</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl
                       text-lg font-semibold disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forms;