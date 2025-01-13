"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { UploadDropzone } from "../app/lib/uploadthing"

const Forms = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const email = session?.user?.email

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    webinarlink: "",
    date: ""
  })
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [link, setLink] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      alert("you need to signin before you can register")
      setTimeout(() => router.push("/signin"), 5000)
      return
    }

    if (!link) {
      setMessage("Please upload an image")
      return
    }

    try {
      setIsSubmitting(true)
      const res = await fetch("/api/form/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email,
          link
        }),
      })

      const data = await res.json()
      
      if (res.ok) {
        setFormData({ name: "", description: "", webinarlink: "", date: "" })
        setLink("")
        router.push("/success")
      } else {
        setMessage(data.message || "Submission failed")
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Submission failed")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white text-center">
              Program Registration
            </h2>
            <p className="mt-2 text-blue-100 text-center">
              Enter your program details below
            </p>
          </div>

          {message && (
            <div className={`px-8 py-4 ${
              message.includes("failed") || message.includes("error")
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}>
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter category name"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                Program Description
              </label>
              <input
                type="text"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                minLength={16}
                placeholder="Enter program description (min. 16 characters)"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="webinarlink" className="block text-sm font-semibold text-gray-700">
                Webinar Link
              </label>
              <input
                type="url"
                id="webinarlink"
                value={formData.webinarlink}
                onChange={handleInputChange}
                required
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700">
                Program Date & Time
              </label>
              <input
                type="datetime-local"
                id="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Program Image
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setLink(res[0].url)
                      setMessage("Image uploaded successfully")
                    }
                  }}
                  onUploadError={(error: Error) => {
                    setMessage(`Upload failed: ${error.message}`)
                  }}
                />
                {link && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Image uploaded successfully
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition duration-200 ease-in-out
                ${isSubmitting 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Forms