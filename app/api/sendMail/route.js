import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prismadb"

export async function POST(req) {

    const year = new Date().getFullYear();

    try {
        const { name, email, mobileNo, bodyMessage } = await req.json();

        const transport = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            priority: "high",
            auth: {
                user: process.env.ADMIN_EMAIL_ID,
                pass: process.env.ADMIN_PASSWORD,
            },
        });

        const emailBody = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Apex Mun - ${year}</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                }
                .content{
                    direction: flex;
                    flex-direction: column;
                    gap: 40px;
                }
                .container {
                    text-align: center;
                    background: #bbf7d0;
                    border-radius: 30px;
                    padding: 40px;
                }
                .info-container {
                    font-size: 18px;
                    margin-top: 100px;
                    margin-bottom: 100px;
                }
                .footer {
                    padding : 20px;
                    border-top: 1px solid #cccccc;
                    text-align: center;
                    font-size: 14px;
                }
                h1 {
                    font-size: 42px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                img {
                    display: block;
                    margin: 20px auto;
                }
            </style>
        </head>
        <body>
            <div class="content">
                <div class="container">
                    <img src="https://apexmun.vercel.app/Logo.png" width="400" alt="Apex Mun - 2024" fetchPriority="high" loading="eager"/>
                    <h1 class="heading">Apex Mun - ${year}</h1>
                </div>
                <div class="info-container">
                    <p><strong>Full Name :</strong>${name}</p>
                    <p><strong>Email ID :</strong>${email}</p>
                    <p><strong>Mobile No :</strong>${mobileNo}</p>
                    <p><strong>Message :</strong>${bodyMessage}</p>
                </div>
                 <div class="footer">
                     <p>Copyright © ${year} · All Rights Reserved</p>
                </div>
            </div>
        </body>
        </html>`;

        await transport.sendMail({
            from: `Apex Mun - ${year}  <${process.env.ADMIN_EMAIL_ID}>`,
            to: email,
            subject: `Hi ${name}, We Received Your Inquiry!`,
            html: emailBody,
        });

        await transport.sendMail({
            from: `Apex Mun - ${year}  <${process.env.ADMIN_EMAIL_ID}>`,
            to: process.env.USER_EMAIL_ID,
            subject: `Hi Apex Mun - ${year}, We Received An Your Inquiry From ${name}!`,
            html: emailBody,
        });

        await prisma.reachUs.create({
            data: {
                name,
                email,
                mobileNo,
                message: bodyMessage
            }
        });

        return NextResponse.json({ message: "Email Sent Successfully!" }, { status: 200 });
    } catch {
        return NextResponse.json({ message: "Email Sent Unsuccessfully!" }, { status: 500 });
    }
}