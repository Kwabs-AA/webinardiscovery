"use client"
import {SessionProvider} from "next-auth/react";

import Forms from "@/components/Forms";



const FormPage = () => {

  return (
    <SessionProvider>
      <Forms/>
    </SessionProvider>
  )
}

export default FormPage