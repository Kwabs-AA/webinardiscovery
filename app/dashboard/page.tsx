"use client"
import DashboardComponent from "@/components/WebinarDashboard"
import { SessionProvider } from "next-auth/react"

const DashboardPage = () => {
  return (
    <SessionProvider>
        <DashboardComponent/>
    </SessionProvider>
  )
}

export default DashboardPage
