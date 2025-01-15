"use client";

import React from 'react';
import { SessionProvider } from "next-auth/react";
import dynamic from 'next/dynamic';

const DynamicDashboard = dynamic(
  () => import('../../components/WebinarDashboard'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center min-h-screen">
        Loading dashboard...
      </div>
    )
  }
);

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DynamicDashboard />
    </SessionProvider>
  );
}