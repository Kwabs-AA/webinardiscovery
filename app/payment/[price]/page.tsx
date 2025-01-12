"use client"
import { useParams } from "next/navigation";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import { SubmitPayment } from "@/app/actions/actions";

const PaymentPage = () => {
  const appId = "sandbox-sq0idb-SOUPagxOLhBZKhekXjEdNA";
  const locationId = "main";

 const {price}=useParams();
 const priceAsNumber = price ? (Array.isArray(price) ? parseFloat(price[0]) : parseFloat(price)) : 0;
 console.log("Price from URL params:", priceAsNumber);
  return (
    <div>
     <PaymentForm
        applicationId={appId}
        locationId={locationId}
        cardTokenizeResponseReceived={async (token: any) => {
            console.log("Token received:", token);
            console.log("Price passed:", price); 
          const result = await SubmitPayment(token.token, priceAsNumber);
          console.log(result);
        }}
      >
        <CreditCard />
      </PaymentForm>
    </div>
  );
};

export default PaymentPage;
