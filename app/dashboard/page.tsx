"use client";

import React from 'react';
import { SessionProvider } from "next-auth/react";
import dynamic from 'next/dynamic';

const DynamicDashboard = dynamic(
  () => import('../../components/WebinarDashboard'),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
);

export default function DashboardPage() {
  return (
    <SessionProvider>
      <DynamicDashboard />
    </SessionProvider>
  );
}