"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Calendar, Clock, Link, Mail, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CategoryDesign = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState("");
  const { data: session } = useSession();
  const route=useRouter()

  

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
          email: session?.user?.email
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
        <div className="text-center p-4">
          <Loader2 className="mx-auto h-8 sm:h-12 w-8 sm:w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-base sm:text-lg text-gray-600">Loading category details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="w-full max-w-lg rounded-xl bg-white p-4 sm:p-6 shadow-lg">
          <div className="text-center">
            <h2 className="mb-2 text-lg sm:text-xl font-semibold text-red-600">Error</h2>
            <p className="text-sm sm:text-base text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-12 px-4">
      <div className="mx-auto max-w-3xl lg:max-w-6xl space-y-6">
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-6 sm:py-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {category?.name?.toUpperCase()}
            </h1>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Description Section */}
            <div className="mb-6 sm:mb-8">
              <h2 className="mb-2 sm:mb-3 text-lg sm:text-xl font-semibold text-gray-800">
                Description
              </h2>
              <p className="rounded-lg bg-gray-50 p-3 sm:p-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                {category?.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="space-y-4">
              {category?.link && (
                <div className="w-full rounded-lg bg-gray-50 p-3 sm:p-4">
                  <div className="flex items-center space-x-3">
                    <Link className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0 text-blue-600" />
                    <div className="w-full">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Link</p>
                      {session?.user?.email?(
                      <p className="break-all text-sm sm:text-base text-gray-800">{category.link}</p>
                    ):
                    <p className="break-all text-sm sm:text-base text-gray-800">You need to signin before you can have access to the link</p>
                    }
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category?.email && (
                  <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                    <Mail className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0 text-blue-600" />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Creator's Email</p>
                      <p className="truncate text-sm sm:text-base text-gray-800">{category.email}</p>
                    </div>
                  </div>
                )}

                {category?.date && (
                  <>
                    <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                      <Calendar className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0 text-blue-600" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Date</p>
                        <p className="text-sm sm:text-base text-gray-800">{category.date.slice(0, 10)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 sm:p-4">
                      <Clock className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0 text-blue-600" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">Time</p>
                        <p className="text-sm sm:text-base text-gray-800">{category.date.slice(11, 19)}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Enroll Button */}
            <div className="mt-6 sm:mt-8">
              <button
                onClick={enrollHandler}
                className="w-full rounded-lg bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white font-semibold hover:bg-blue-700 transition-colors duration-300"
                disabled={enrolling}
              >
                {enrolling ? "Enrolling..." : "Enroll Now"}
              </button>
              {enrollmentStatus && (
                <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-700">
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

export default CategoryDesign;