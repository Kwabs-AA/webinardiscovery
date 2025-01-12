"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import "../../components/Success.page.css";

// Dynamically import Lottie component
const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div className="lottie-animation-placeholder" />
});

const Success = () => {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [countdown, setCountdown] = useState(15);
    
    useEffect(() => {
        // Start countdown immediately
        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                }
                return prev - 1;
            });
        }, 1000);

        // Set redirecting message after 5 seconds
        const redirectMessageTimer = setTimeout(() => {
            setIsRedirecting(true);
        }, 5000);

        // Redirect after 15 seconds
        const redirectTimer = setTimeout(() => {
            router.push("/");
        }, 15000);

        // Cleanup
        return () => {
            clearInterval(countdownInterval);
            clearTimeout(redirectMessageTimer);
            clearTimeout(redirectTimer);
        };
    }, [router]);

    const date = new Date();

    // Import animation data dynamically
    const successAnimation = require("@/components/SuccessTick.json");

    return (
        <div className="success-page">
            <Lottie
                className="lottie-animation"  
                animationData={successAnimation}
                loop={false}
                autoplay={true}
                rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                }}
                height={400}  
                width={400}   
            />
            <b>Application Approved</b>
            <p>
                Status of Application has been received
                to approve as on {date.toLocaleDateString()}.
            </p>
            <p className={`text-sm mt-4 ${isRedirecting ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                Redirecting to home page in {countdown} seconds...
            </p>
        </div>
    );
};

export default Success;