
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import CryptoJS from "crypto-js";

export async function POST(req, res) {

    const { code, committee } = await req.json();

    try {
        const verifyCouponCode = await prisma.coupon.findUnique({
            where: {
                code,
                committeeId: committee
            },
        })

        if (!verifyCouponCode) {
            return NextResponse.json({ Data: false }, { status: 400 });
        }

        if (!process.env.SECRET_KEY) {
            return NextResponse.json({ Response: "Server Error: Missing Encryption Key!" }, { status: 500 });
        }

        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(verifyCouponCode), process.env.SECRET_KEY).toString();

        return NextResponse.json({ Response: encryptedData, Data: true }, { status: 200 });
    }
    catch {
        return NextResponse.json({ Response: "An Error Occured While Validating Coupon Code" }, { status: 400 });
    }
}