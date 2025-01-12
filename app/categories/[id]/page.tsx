"use client"

import CategoryDesign from "@/components/CategoryDesign";
import { SessionProvider } from "next-auth/react";

const SpecificPage = () => {
 return(
  <SessionProvider>
    <CategoryDesign/>
  </SessionProvider>
  )
};

export default SpecificPage;
