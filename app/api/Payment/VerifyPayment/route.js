import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function POST(req, res) {
    try {
        const { name, email, mobileNo, schoolCollege, classYear, munExperience, age, committeeID, portfolioID, portfolioID1, portfolioID2, ref, razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

        const paymentConfirmation = await razorpay.payments.fetch(razorpayPaymentId);

        if (paymentConfirmation.status === "captured" && paymentConfirmation.order_id === razorpayOrderId) {

            const committee = await prisma.committee.findUnique({ where: { id: committeeID } });
            const portfolio = await prisma.portfolio.findUnique({ where: { id: portfolioID } });
            const portfolio1 = await prisma.portfolio.findUnique({ where: { id: portfolioID1 } });
            const portfolio2 = await prisma.portfolio.findUnique({ where: { id: portfolioID2 } });

            await prisma.register.create({
                data: {
                    name,
                    email,
                    mobileNo,
                    schoolCollege,
                    classYear,
                    munExperience,
                    age,
                    committeeName: committee.name,
                    portfolioName: portfolio.name,
                    portfolioName1: portfolio1.name,
                    portfolioName2: portfolio2.name,
                    ref,
                    paymentMethod: paymentConfirmation.method,
                    cardPayment: paymentConfirmation.card_id,
                    cardLast4No: paymentConfirmation.card?.last4,
                    cardNetwork: paymentConfirmation.card?.network,
                    cardType: paymentConfirmation.card?.type,
                    cardName: paymentConfirmation.card?.name,
                    bankPayment: paymentConfirmation.bank,
                    walletPayment: paymentConfirmation.wallet,
                    vpa: paymentConfirmation.vpa,
                    razorpayUpiTranscationId: paymentConfirmation.acquirer_data?.upi_transaction_id,
                    razorpayBankranscationId: paymentConfirmation.acquirer_data?.bank_transaction_id,
                    razorpayOrderId: razorpayOrderId,
                    razorpayPaymentId: razorpayPaymentId,
                    razorpaySignature: razorpaySignature,
                    paymentAmount: paymentConfirmation.amount,
                    paymentStatus: "Payment Successful!"
                }
            });

            return NextResponse.json({ Verification: true, Response: "Payment Verification Successful!" });
        } else {
            return NextResponse.json({ Verification: false, Response: "Payment Verification Failed!" });
        }
    } catch (error) {
        return NextResponse.json({ Verification: false, Response: "Error While Verifying Payment Order!" });
    }
}