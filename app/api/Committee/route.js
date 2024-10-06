import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req, res) {
    const { name, price, portfolio } = await req.json();

    try {
        const existingCommittee = await prisma.committee.findUnique({
            where: {
                name: name,
            },
        });

        if (existingCommittee) {
            return NextResponse.json({ Response: "Committee Already Exists!" }, { status: 400 });
        }

        await prisma.committee.create({
            data: {
                name: name,
                price: price,
                portfolio: {
                    createMany: {
                        data: portfolio,
                    }
                }
            },
            include: {
                portfolio: true
            }
        })

        return NextResponse.json({ Response: "Committee Creation Successfull!" })
    }
    catch (error) {
        return NextResponse.json({ Response: "Committee Creation Unsuccessfull!" })
    }
}

export async function GET(req, res) {
    try {
        const committees = await prisma.committee.findMany();

        if (!process.env.SECRET_KEY) {
            return NextResponse.json({ Response: "Server Error: Missing Encryption Key!" }, { status: 500 });
        }

        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(committees), process.env.SECRET_KEY).toString();

        return NextResponse.json({ Response: encryptedData })

    } catch {
        return NextResponse.json({ Response: "Committee Fetching Unsuccessfull!" })
    }
}