import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import CryptoJS from "crypto-js";

export async function GET(req, { params }) {

    const { id } = params;

    try {
        const committee = await prisma.committee.findUnique({
            where: {
                id
            },
            include: {
                portfolios: true,
                coupons: true
            }
        })

        if (!process.env.SECRET_KEY) {
            return NextResponse.json({ Response: "Server Error: Missing Encryption Key!" }, { status: 500 });
        }

        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(committee), process.env.SECRET_KEY).toString();
        return NextResponse.json({ Response: encryptedData }, { status: 200 })

    } catch {
        return NextResponse.json({ Response: "Committee Fetching Unsuccessfull!" }, { status: 400 })
    }
}