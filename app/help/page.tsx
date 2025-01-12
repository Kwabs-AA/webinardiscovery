"use client"
import React, { useState } from "react";
import { UploadDropzone } from "../lib/uploadthing";
import { Contact } from "lucide-react";
import { useRouter } from "next/navigation";

const HelpPage = () => {
  const router=useRouter()
  const [link, setLink] = useState("null");
  const [FormData, setFormData] = useState({
    name: "",
    contact: "",  
    complaint: ""
  });
  const [message, setMessage] = useState("Upload any supporting documents (optional)");

  const HandleInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [event.target.id]: event.target.value
    }));
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
      try{event.preventDefault();
      const res= await fetch("/api/help",{
        method:"POST",
        headers: {"Content-Type":"Application/json"},
        body:JSON.stringify({
          ...FormData,
          link
        }),
      })
  
      if(res.ok){
        router.push("/success")
      }else{
        
      }}catch(error){
        console.log(error instanceof Error ? error.message : "Submission failed");
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Submit a Help Request
          </h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label 
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
                <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your full name"
                value={FormData.name}
                onChange={HandleInput}
              />
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
                <span className="text-red-500">*</span>
              </label>
              <input
                id="contact"
                type="tel"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your contact number"
                value={FormData.contact}
                onChange={HandleInput}
              />
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="complaint"
                className="block text-sm font-medium text-gray-700"
              >
                Complaint
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="complaint"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                placeholder="Please describe your issue"
                value={FormData.complaint}
                onChange={HandleInput}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Supporting Documents (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setLink(res[0].url);
                      setMessage("Image uploaded successfully");
                    }
                  }}
                  onUploadError={(error) => {
                    setMessage(`Upload failed: ${error.message}`);
                  }}
                />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {message}
                </p>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;