"use server";

import { randomUUID } from "crypto";
import { Client, Environment } from "square";

const { paymentsApi } = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox,
});

export async function SubmitPayment(sourceId: string, price: number) {
    try {
        const { result } = await paymentsApi.createPayment({
            idempotencyKey: randomUUID(),
            sourceId,
            amountMoney: {
                currency: "USD",
                amount: BigInt(price * 100), // Convert to BigInt and handle cents
            },
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}
