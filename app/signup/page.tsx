"use client";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";



const SignupPage = () => {
  
  const router=useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(""); 
  const [pending, setPending] = useState(false);
  const [message, setmessage]=useState(null);

  ;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          password,
          confirmPassword,
        }),
      });
      const data=await res.json()

      if (res.ok) {
        setPending(false);
        
        toast.success(data.message)
        router.push('/signin')

      } else if(res.status===400) {
       setmessage(data.message)
        setPending(false)
      }else if(res.status===500) {
        setmessage(data.message)
         setPending(false)
       }
    } catch (error) {
      console.error("Network error:", error);
    } 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
      {!!message && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert/>
          <p>{message}</p>
        </div>
      )}
      <form
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            disabled={pending}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            disabled={pending}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            disabled={pending}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            disabled={pending}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Sign Up with Email
        </button>
      </form>

      <div className="mt-6 text-center">
        <h3 className="text-sm text-gray-500 mb-4">Or</h3>
        <button
          className="w-full py-3 px-4 bg-red-500 text-white rounded-md flex items-center justify-center gap-3 hover:bg-red-600"
          onClick={(e) => console.log(e)}
        >
          <FaGoogle size={20} />
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
