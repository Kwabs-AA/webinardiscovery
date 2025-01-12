"use client"
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const SigninPage = () => {

  const router=useRouter();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const [error,seterror]=useState("")
  const [pending,setPending]=useState(false);

  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    const res= await signIn("credentials",{
      redirect:false,
      email,
      password
    })
    setPending(true);

    if(res?.ok){
      router.push("/");
      toast.success("signin successful")
    }else if(res?.status===401){
      seterror("Invalid credentials");
      setPending(false)
    }else{
      seterror("Something went wrong");
    }
    }

    const handleProvider =(
      event:React.MouseEvent<HTMLButtonElement>,
      value:"google"
    )=>{
      event.preventDefault();
      signIn(value,{callbackUrl:"/"});
    };
   


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
          <h2 className="text-3xl font-semibold mb-6">Sign Up</h2>
          {error && (
            <div  className="bg-destructive/25 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              {error}</div>
          )}
    
          <form
            className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
    
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
        
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Sign In
            </button>
          </form>
    
          <div className="mt-6 text-center">
            <h3 className="text-sm text-gray-500 mb-4">Or</h3>
            <button
              className="w-full py-3 px-4 bg-red-500 text-white rounded-md flex items-center justify-center gap-3 hover:bg-red-600"
              onClick={(e) => handleProvider(e,"google")}
            >
              <FaGoogle size={20} />
              Sign Up with Google
            </button>
          </div>
        </div>
  )
}

export default SigninPage
