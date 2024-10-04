import Razorpay from "razorpay";
import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function POST(req, res) {
    try {

        const { committeeID } = await req.json();

        const Committee = await prisma.committee.findUnique({
            where: {
                totallyBooked: false,
                id: committeeID
            },
        });

        const billId = `bill_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        const order = await razorpay.orders.create({
            amount: (Committee.price * 5 / 100) * 100,
            currency: "INR",
            receipt: billId,
        });

        if (!process.env.SECRET_KEY) {
            return NextResponse.json({ Response: "Server Error: Missing Encryption Key!" }, { status: 500 });
        }

        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(order), process.env.SECRET_KEY).toString();

        return NextResponse.json({ Response: encryptedData })
    } catch {
        return NextResponse.json({ Response: "Error While Creating Payment Order!" });
    }
}