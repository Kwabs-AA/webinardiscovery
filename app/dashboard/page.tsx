"use client";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";

const DashboardComponent = dynamic(() => import("@/components/WebinarDashboard"), { 
  ssr: false,
});

const DashboardPage = () => {
  return (
    <SessionProvider>
      <DashboardComponent />
    </SessionProvider>
  );
};


export default DashboardPage;
