"use client"
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { Loader2, MailCheck, MapPinCheckIcon, PhoneCall } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ReachUsSchema } from '@/schema/ReachUsSchema'
import { Input } from '@/components/ui/input'

function page() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(ReachUsSchema)
    });

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const res = await axios.post("/api/sendMail", data);

            if (res) {
                toast.success("Your Message Has Been Sent Successfully.");
                setTimeout(() => {
                    toast.success("We'll Get Back to You Within 48 Hours!");
                }, 2000);
                router.replace("/");
            }
            else {
                toast.error("Oops! Something Went Wrong. Please Try Again Later.");
            }
        } catch {
            toast.error("Oops! Something Went Wrong. Please Try Again Later.");
        } finally {
            setLoading(false);
            reset();
        }
    }

    return (
        <div className="flex items-center justify-center w-full py-28 md:py-40 bg-gradient-to-b via-green-50 to-white from-white">
            <div className="flex flex-col items-start w-11/12 gap-20 xl:w-3/4 xl:flex-row">
                <div className="flex flex-col w-full gap-10">
                    <div className="flex flex-col gap-4">
                        <p className="font-mono md:text-lg">WE'D LOVE TO HEAR FROM YOU</p>
                        <h1 className="text-6xl font-black leading-none md:text-7xl">Contact Us</h1>
                        <div className="h-1 bg-black rounded-full w-28"></div>
                        <p className="font-mono md:text-lg">Get In Touch With Us</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-4 font-mono font-semibold md:text-xl"><MapPinCheckIcon /> 🇮🇳 Janakpuri, New Delhi</Link>
                        <Link href="/" className="flex items-center gap-4 font-mono font-semibold md:text-xl"><PhoneCall /> +91 7782824824</Link>
                        <Link href="/" className="flex items-center gap-4 font-mono font-semibold md:text-xl"><MailCheck /> apexmun10@gmail.com</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Full Name*</Label>
                        <Input className="bg-transparent" type="text" placeholder="Harshit Jain" {...register("name")} />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Mobile No*</Label>
                        <Input className="bg-transparent" type="tel" minLength={10} maxLength={10} placeholder="+91 00000 00000" {...register("mobileNo")} />
                        {errors.mobileNo && <p className="text-red-500">{errors.mobileNo.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Email ID*</Label>
                        <Input className="bg-transparent" type="email" placeholder="demo@company.com" {...register("email")} />
                        {errors.email && (<p className="text-red-500">{errors.email.message}</p>)}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Message*</Label>
                        <textarea {...register("bodyMessage")} placeholder="Type Your Message ...." rows="5" className="p-2 border border-[#dddddd] focus:border-black rounded-lg resize-none focus:outline-none bg-transparent"></textarea>
                        {errors.bodyMessage && (<p className="text-red-500">{errors.bodyMessage.message}</p>)}
                    </div>
                    <div className="flex justify-end">
                        <Button disabled={loading} className="flex justify-center w-40">
                            {!loading ? "Submit" : <Loader2 className="animate-spin" />}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default page