"use client"
import { Input } from '@/components/ui/Input'
import axios from 'axios'
import { Loader2, MailCheck, MapPinCheckIcon, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

function page() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post("/api/sendMail", { name, email, mobileNo, message });

            if (res) {
                toast.success("Your Message Has Been Sent Successfully.");
                setTimeout(() => {
                    toast.success("We'll Get Back to You Within 48 Hours!");
                }, 2000);
                setName("");
                setEmail("");
                setMobileNo("");
                setMessage("");
            }
            else {
                toast.error("Oops! Something Went Wrong. Please Try Again Later.");
            }
        } catch {
            toast.error("Oops! Something Went Wrong. Please Try Again Later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center w-full py-28 md:py-40">
            <div className="flex flex-col items-start w-11/12 gap-20 xl:w-3/4 xl:flex-row">
                <div className="flex flex-col w-full gap-10">
                    <div className="flex flex-col gap-4">
                        <p className="font-mono md:text-lg">WE'D LOVE TO HEAR FROM YOU</p>
                        <h1 className="text-6xl font-black leading-none md:text-7xl">Contact Us</h1>
                        <div className="h-1 bg-black rounded-full w-28"></div>
                        <p className="font-mono md:text-lg">Get In Touch With Us</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-4 font-mono font-semibold md:text-xl"><MapPinCheckIcon /> 🇮🇳 Jankapuri, New Delhi</Link>
                        <Link href="/" className="flex items-center gap-4 font-mono font-semibold md:text-xl"><PhoneCall /> +91 72997 29975</Link>
                        <Link href="/" className="flex items-center gap-4 font-mono font-semibold md:text-xl"><MailCheck /> apexmun2024@gmail.com</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                    <Input value={name} onChange={(e) => setName(e.target.value)} type={"text"} labelValue={"Full Name*"} placeholder={"Abc"} required={true} />
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type={"email"} labelValue={"Email ID*"} placeholder={"abc@company.com"} required={true} />
                    <Input value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} type={"text"} labelValue={"Mobile No*"} placeholder={"+91 00000 00000"} required={true} />
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Message*</p>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type Your Message ...." rows="5" required className="p-2 border border-black rounded-lg resize-none focus:outline-none"></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button disabled={loading} className="flex justify-center w-40 py-3 font-medium bg-green-200 rounded-full hover:bg-green-100 disabled:bg-green-100">
                            {!loading ? "Submit" : <Loader2 className="animate-spin" />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default page