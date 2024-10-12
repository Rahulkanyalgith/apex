import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(req, res) {
    const { name, price, portfolios, coupons } = await req.json();

    try {
        const existingCommittee = await prisma.committee.findUnique({
            where: {
                name: name,
            },
        });

        const existingCoupon = await prisma.coupon.findMany({
            select: {
                code: true
            }
        });

        const existingCouponCodes = existingCoupon.map(data => data.code);

        const duplicateCoupons = coupons.filter(data => existingCouponCodes.includes(data.code));

        if (duplicateCoupons.length > 0) {
            const duplicateCodes = duplicateCoupons.map(coupon => coupon.code).join(", ");
            return NextResponse.json({ Response: `These Coupon Codes ${duplicateCodes} Already Exist!` }, { status: 400 });
        }

        if (existingCommittee) {
            return NextResponse.json({ Response: "Committee Already Exists!" }, { status: 400 });
        }

        await prisma.committee.create({
            data: {
                name: name,
                price: price,
                portfolios: {
                    createMany: {
                        data: portfolios,
                    }
                },
                coupons: {
                    createMany: {
                        data: coupons
                    }
                }
            },
            include: {
                portfolios: true,
                coupons: true
            }
        })

        return NextResponse.json({ Response: "Committee Creation Successfull!" }, { status: 200 })
    }
    catch {
        return NextResponse.json({ Response: "Committee Creation Unsuccessfull!" }, { status: 400 })
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