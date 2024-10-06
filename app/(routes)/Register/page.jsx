"use client"
import { Input } from '@/components/ui/Input'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from 'sonner';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';


function page() {

    const router = useRouter();

    const [committeeData, setCommitteeData] = useState([]);
    const [committeeID, setcommitteeID] = useState("");
    const [portfolioID, setPortfolioID] = useState("");
    const [portfolioID1, setPortfolioID1] = useState("");
    const [portfolioID2, setPortfolioID2] = useState("");
    const [portfolioData, setPortfolioData] = useState([]);
    const [price, setPrice] = useState(0);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [schoolCollege, setSchoolCollege] = useState("");
    const [classYear, setClassYear] = useState("");
    const [munExperience, setMunExperience] = useState("");
    const [age, setAge] = useState("");
    const [ref, setRef] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const handlePayment = async () => {
        setPaymentProcessing(true);

        // try {
        if (!process.env.NEXT_PUBLIC_SECRET_KEY) {
            toast("Server Error: Missing Encryption Key!");
        }

        const payment = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/Payment/CreateOrder`, {
            committeeID
        });
        console.log(process.env.NEXT_PUBLIC_URL);
        console.log(process.env.NEXT_PUBLIC_SECRET_KEY);
        console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
        const encryptedData = payment.data.Response;
        // const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_SECRET_KEY);
        // const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        // const parsedData = JSON.parse(decryptedData);
        if (encryptedData.id) {
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: parsedData.amount,
                currency: parsedData.currency,
                name: 'Apex Mun',
                description: 'Test Transaction',
                order_id: parsedData.id,
                handler: async function (payment) {
                    try {

                        const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/Payment/VerifyPayment`, {
                            name: name,
                            email: email,
                            mobileNo: mobileNo,
                            schoolCollege: schoolCollege,
                            classYear: classYear,
                            munExperience: munExperience,
                            age: age,
                            committeeID: committeeID,
                            portfolioID: portfolioID,
                            portfolioID1: portfolioID1,
                            portfolioID2: portfolioID2,
                            ref: ref,
                            razorpayOrderId: payment.razorpay_order_id,
                            razorpayPaymentId: payment.razorpay_payment_id,
                            razorpaySignature: payment.razorpay_signature,
                            paymentAmount: parsedData.amount,
                        });

                        if (res.data.Verification) {
                            router.replace(`/Payment-Success?paymentID=${payment.razorpay_order_id}`)
                            toast.success("Payment Successfull.");
                            setTimeout(() => {
                                toast.success("Thank You For Registering Your Community!");
                            }, 2000);
                        }
                        else {
                            toast.error("Error: Payment Verification Failed!");
                        }
                    } catch {
                        toast.error("Error: Payment Verification Failed!");
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: mobileNo,
                },
                theme: {
                    color: "#bbf7d0"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        else {
            alert('Payment initiation failed');
        }
        // }
        // catch (error) {
        //     console.log(error);
        //     toast("Error: While Initiating Payment!");
        // }
        // finally {
        //     setPaymentProcessing(false);
        //     setcommitteeID("");
        //     setPortfolioID("");
        //     setPortfolioID1("");
        //     setPortfolioID2("");
        //     setPrice(0);
        //     setName("");
        //     setEmail("");
        //     setMobileNo("");
        //     setSchoolCollege("");
        //     setClassYear("");
        //     setMunExperience("");
        //     setAge("");
        //     setRef("");
        //     setIsChecked(false);
        // }
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleData = async () => {
        try {
            if (!process.env.NEXT_PUBLIC_SECRET_KEY) {
                toast("Server Error: Missing Encryption Key!");
            }

            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/Committee`);
            const encryptedData = res.data.Response;
            const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_SECRET_KEY);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            const parsedData = JSON.parse(decryptedData);
            setCommitteeData(parsedData);
        } catch (error) {
            toast("Error: While Fetching & Decrypting Data!");
        }
    };

    const handleCommitteeChangeData = async (id) => {
        try {
            if (!process.env.NEXT_PUBLIC_SECRET_KEY) {
                toast("Server Error: Missing Encryption Key!");
            }

            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/Committee/${id}`);
            const encryptedData = res.data.Response;
            const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_SECRET_KEY);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            const parsedData = JSON.parse(decryptedData);
            setPortfolioData(parsedData);
            setcommitteeID(id);
            const encryptedPriceData = res.data.Data;
            const priceBytes = CryptoJS.AES.decrypt(encryptedPriceData, process.env.NEXT_PUBLIC_SECRET_KEY);
            const decryptedPriceData = priceBytes.toString(CryptoJS.enc.Utf8);
            const parsedPriceData = JSON.parse(decryptedPriceData);
            setPrice((parsedPriceData.price + (parsedPriceData.price * 5) / 100));
        } catch (error) {
            toast("Error: While Fetching & Decrypting Data!");
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        handlePayment();
    }

    return (
        <div className="flex flex-col items-center justify-center w-full gap-20 py-20 overflow-hidden">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="flex flex-col justify-center w-11/12 gap-20 md:w-3/4">
                <div className="leading-none tracking-tighter">
                    <h1 className="text-[5rem] md:text-[7.5rem] lg:text-[9rem] font-black">Apex MUN'24</h1>
                    <h1 className="text-[5rem] md:text-[7.5rem] lg:text-[9rem] font-black">Register</h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
                    <Input required={true} onChange={(e) => setName(e.target.value)} value={name} className="rounded-t-xl" type={"text"} labelValue={"Full Name*"} placeholder={"Abc"} />
                    <Input required={true} onChange={(e) => setEmail(e.target.value)} value={email} type={"email"} labelValue={"Email ID*"} placeholder={"abc@company.com"} />
                    <Input required={true} onChange={(e) => setMobileNo(e.target.value)} value={mobileNo} type={"tel"} minLength={10} maxLength={10} labelValue={"Mobile No*"} placeholder={"+91 00000 00000"} />
                    <Input required={true} onChange={(e) => setSchoolCollege(e.target.value)} value={schoolCollege} type={"text"} labelValue={"School/College*"} placeholder={"ABC College"} />
                    <Input required={true} onChange={(e) => setClassYear(e.target.value)} value={classYear} type={"text"} labelValue={"Class/Year*"} placeholder={"2nd Year"} />
                    <Input required={true} onChange={(e) => setMunExperience(e.target.value)} value={munExperience} type={"tel"} labelValue={"MUN Experience*"} placeholder={"No. of MUN's Done?"} />
                    <Input required={true} onChange={(e) => setAge(e.target.value)} value={age} type={"tel"} labelValue={"Age*"} placeholder={"18"} />

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Committee*</p>
                        <Select required onValueChange={handleCommitteeChangeData}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select An Committee" />
                            </SelectTrigger>
                            <SelectContent>
                                {committeeData.map((data, index) => (
                                    <SelectItem key={index} value={data.id}>
                                        {data.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Portfolio Reference 1*</p>
                        <Select required onValueChange={(id) => setPortfolioID(id)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select An Portfolio" />
                            </SelectTrigger>
                            <SelectContent>
                                {portfolioData.map((data, index) => (
                                    <SelectItem key={index} value={data.id}>
                                        {data.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Portfolio Reference 2*</p>
                        <Select required onValueChange={(id) => setPortfolioID1(id)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select An Portfolio" />
                            </SelectTrigger>
                            <SelectContent>
                                {portfolioData.map((data, index) => (
                                    <SelectItem key={index} value={data.id}>
                                        {data.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Portfolio Reference 3*</p>
                        <Select required onValueChange={(id) => setPortfolioID2(id)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select An Portfolio" />
                            </SelectTrigger>
                            <SelectContent>
                                {portfolioData.map((data, index) => (
                                    <SelectItem key={index} value={data.id}>
                                        {data.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Input value={ref} onChange={(e) => setRef(e.target.value)} className="rounded-b-xl" type={"text"} labelValue={"Reference (If Any)"} placeholder={"Name"} />

                    <div className="flex flex-col gap-10 py-10">
                        <h1 className="text-4xl font-semibold">Payment Details</h1>
                        <div className="flex flex-col gap-4">
                            <div className="text-lg font-semibold text-red-500">
                                Delegation Fee: ₹{price}
                            </div>
                            <ul className="pl-5 text-sm list-disc">
                                <li>The delegation fee is <span className="font-bold">non-refundable</span>.</li>
                                <li>A <span className="font-bold">5% transaction fee</span> will be applicable.</li>
                            </ul>
                            <div className="flex items-center gap-4">
                                <input type="checkbox" required checked={isChecked} onChange={handleCheckboxChange} />
                                <p>Yes, I agree</p>
                            </div>
                        </div>
                    </div>

                    <button disabled={paymentProcessing} className="flex justify-center w-full p-3 duration-300 bg-green-200 border-2 border-green-200 active:bg-green-200 active:border-green-200 hover:bg-white disabled:bg-black disabled:border-black disabled:text-green-200 hover:border-green-200 rounded-b-xl">
                        {!paymentProcessing ? "Pay Now" : <Loader2 className="animate-spin" />}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default page