import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"
import CryptoJS from "crypto-js";

export async function PUT(req, { params }) {
    const { id } = params;

    const { portfolioId, booked } = await req.json();

    try {

        await prisma.portfolio.update({
            where: {
                id: portfolioId,
                committeeId: id
            },
            data: {
                booked: booked
            }
        })

        if (portfolio.every(data => data.booked === true)) {
            await prisma.committee.update({
                where: {
                    id: id
                },
                data: {
                    totallyBooked: true
                }
            })
        }

        return NextResponse.json({ Response: "Committee Updation Successfull!" })

    } catch (error) {
        return NextResponse.json({ Response: "Committee Fetching Unsuccessfull!" })
    }
}

export async function GET(req, { params }) {

    const { id } = params;
    try {
        const portfolio = await prisma.portfolio.findMany({
            where: {
                booked: false,
                committeeId: id
            },
        });

        const price = await prisma.committee.findUnique({
            where: {
                totallyBooked: false,
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