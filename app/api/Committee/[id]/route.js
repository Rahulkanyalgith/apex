import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import CryptoJS from "crypto-js";

export async function GET(req, { params }) {

    const { id } = params;
    
    try {
        const portfolio = await prisma.portfolio.findMany({
            where: {
                committeeId: id
            },
        });

        const price = await prisma.committee.findUnique({
            where: {
                id: id
            },
        });

        if (!process.env.SECRET_KEY) {
            return NextResponse.json({ Response: "Server Error: Missing Encryption Key!" }, { status: 500 });
        }

        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(portfolio), process.env.SECRET_KEY).toString();
        const encryptedPriceData = CryptoJS.AES.encrypt(JSON.stringify(price), process.env.SECRET_KEY).toString();

        return NextResponse.json({ Response: encryptedData, Data: encryptedPriceData })


    } catch {
        return NextResponse.json({ Response: "Portfolio Fetching Unsuccessfull!" })
    }
}