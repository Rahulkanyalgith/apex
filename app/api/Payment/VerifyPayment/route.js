import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

export async function POST(req, res) {
    try {
        const { formData, razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

        const paymentConfirmation = await razorpay.payments.fetch(razorpayPaymentId);

        if (paymentConfirmation.status === "captured" && paymentConfirmation.order_id === razorpayOrderId) {

            const [committee, portfolio, portfolio1, portfolio2] = await Promise.all([
                prisma.committee.findUnique({ where: { id: formData.committee } }),
                prisma.portfolio.findUnique({ where: { id: formData.portfolioRef1 } }),
                prisma.portfolio.findUnique({ where: { id: formData.portfolioRef2 } }),
                prisma.portfolio.findUnique({ where: { id: formData.portfolioRef3 } })
            ]);

            let registrationData = {
                name: formData.name,
                email: formData.email,
                mobileNo: formData.mobileNo,
                institutionName: formData.institutionName,
                classYear: formData.classYear,
                munExperience: formData.munExperience,
                age: formData.age,
                committeeName: committee.name,
                portfolioRef1: portfolio.name,
                portfolioRef2: portfolio1.name,
                portfolioRef3: portfolio2.name,
                ref: formData.ref,
                paymentMethod: paymentConfirmation.method,
                cardDetails: {
                    create: {
                        paymentId: paymentConfirmation.card_id,
                        last4: paymentConfirmation.card?.last4,
                        network: paymentConfirmation.card?.network,
                        type: paymentConfirmation.card?.type,
                        cardholder: paymentConfirmation.card?.name,
                    }
                },
                bankPaymentDetails: {
                    create: {
                        transactionId: paymentConfirmation.bank
                    }
                },
                walletPaymentDetails: {
                    create: {
                        transactionId: paymentConfirmation.wallet,
                    }
                },
                UpiPaymentDetails: {
                    create: {
                        transactionId: paymentConfirmation.acquirer_data?.upi_transaction_id,
                        vpa: paymentConfirmation.vpa
                    }
                },
                razorpayOrderId: razorpayOrderId,
                razorpayPaymentId: razorpayPaymentId,
                razorpaySignature: razorpaySignature,
                paymentAmount: paymentConfirmation.amount,
                paymentStatus: "Payment Successful!"
            };

            if (formData.couponCode) {
                const coupon = await prisma.coupon.findUnique({ where: { code: formData.couponCode, committeeId: formData.committee } });
                if (coupon) {
                    const discountedPrice = (committee.price - (committee.price * coupon.percentage / 100)) * 100;
                    registrationData.couponCode = coupon.code;
                    registrationData.couponPercentage = coupon.percentage;
                    registrationData.couponAmount = discountedPrice;
                }
            }

            await prisma.register.create({ data: registrationData });

            return NextResponse.json({ Verification: true, Response: "Payment Verification Successful!" });
        } else {
            return NextResponse.json({ Verification: false, Response: "Payment Verification Failed!" });
        }
    } catch (error) {
        console.error("Error while verifying payment:", error);
        return NextResponse.json({ Verification: false, Response: "Error While Verifying Payment Order!" });
    }
}