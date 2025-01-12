"use client"
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { redirect } from "next/navigation";
import successAnimation from "@/components/SuccessTick.json";
import "../../components/Success.page.css";

const Success = () => {
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [countdown, setCountdown] = useState(15);
    
    useEffect(() => {
        // Start countdown immediately
        const countdownInterval = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        // Set redirecting message after 7 seconds
        const redirectMessageTimer = setTimeout(() => {
            setIsRedirecting(true);
        }, 5000);

        // Redirect after 10 seconds
        const redirectTimer = setTimeout(() => {
            redirect("/");
        }, 15000);

        // Cleanup
        return () => {
            clearInterval(countdownInterval);
            clearTimeout(redirectMessageTimer);
            clearTimeout(redirectTimer);
        };
    }, []);

    const date = new Date();

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