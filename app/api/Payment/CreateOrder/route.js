import Razorpay from "razorpay";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function POST(req, res) {
    try {
        const { committeeID, couponData } = await req.json();

        if (!committeeID) {
            return NextResponse.json({ Response: "Invalid Committee ID!" }, { status: 400 });
        }

        const Committee = await prisma.committee.findUnique({
            where: {
                id: committeeID
            },
        });

        if (!Committee) {
            return NextResponse.json({ Response: "Committee Not Found!" }, { status: 404 });
        }

        const billId = `bill_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;

        if (!process.env.SECRET_KEY) {
            return NextResponse.json({ Response: "Server Error: Missing Encryption Key!" }, { status: 500 });
        }

        let amount = Committee.price * 100;

        if (couponData) {
            const discountPercentage = Math.min(Math.max(couponData.percentage, 0), 100);
            amount = (Committee.price - (Committee.price * discountPercentage / 100)) * 100;
        }

        const order = await razorpay.orders.create({
            amount: amount,
            currency: "INR",
            receipt: billId,
        });

        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(order), process.env.SECRET_KEY).toString();
        return NextResponse.json({ Response: encryptedData });

    } catch {
        return NextResponse.json({ Response: "Error While Creating Payment Order!" }, { status: 500 });
    }
}