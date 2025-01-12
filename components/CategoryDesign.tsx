"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Calendar, Clock, Link, Mail, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";


const CategoryDesign = () => {
    const { id } = useParams();
    const [category, setCategory] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrolling, setEnrolling] = useState(false);
    const [enrollmentStatus, setEnrollmentStatus] = useState("");
    const {data:session}=useSession();
  
    useEffect(() => {
      if (!id) return;
  
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/categories/${id}`);
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch category");
          }
          const data = await res.json();
          setCategory(data);
        } catch (err: any) {
          setError(err.message);
          console.error("Error fetching category:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id]);
  
    const enrollHandler = async () => {
      if (!category || !category._id) return;
  
      setEnrolling(true);
      setEnrollmentStatus("");
  
      try {
        const res = await fetch("/api/enrollment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            webinarId: category._id,
            email:session?.user?.email // Replace with user's email (e.g., fetched from auth)
          }),
        });
  
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message || "Enrollment failed");
        }
  
        setEnrollmentStatus("Successfully enrolled in the webinar!");
      } catch (err: any) {
        setEnrollmentStatus(err.message || "Error enrolling in the webinar.");
      } finally {
        setEnrolling(false);
      }
    };
    if (loading) {
  return (
   
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-lg text-gray-600">Loading category details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold text-red-600">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Main Content Container */}
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white">
              {category?.name?.toUpperCase()}
            </h1>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description Section */}
            <div className="mb-8">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                Description
              </h2>
              <p className="rounded-lg bg-gray-50 p-4 text-gray-700 leading-relaxed">
                {category?.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="space-y-4">
              {category?.link && (
                <div className="w-full rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center space-x-3">
                    <Link className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div className="w-full">
                      <p className="text-sm font-medium text-gray-600">Link</p>
                      <p className="break-all text-gray-800">{category.link}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {category?.email && (
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
                    <Mail className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-600">Email</p>
                      <p className="truncate text-gray-800">{category.email}</p>
                    </div>
                  </div>
                )}

                {category?.date && (
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
                    <Calendar className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Date</p>
                      <p className="text-gray-800">{category.date.slice(0, 10)}</p>
                    </div>
                  </div>
                )}

                {category?.date && (
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-4">
                    <Clock className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Time</p>
                      <p className="text-gray-800">{category.date.slice(11, 19)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enroll Button */}
            <div className="mt-6">
              <button
                onClick={enrollHandler}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
                disabled={enrolling}
              >
                {enrolling ? "Enrolling..." : "Enroll Now"}
              </button>
              {enrollmentStatus && (
                <p className="mt-4 text-center text-sm text-gray-700">
                  {enrollmentStatus}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CategoryDesign
