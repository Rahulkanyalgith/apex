"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader2, Trash } from 'lucide-react'
import Script from 'next/script'
import { RegisterSchema } from '@/schema/RegisterSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import CryptoJS from 'crypto-js'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import SparklesText from '@/components/ui/sparkles-text'
import { Input } from '@/components/ui/input'

function page() {

    const { register, handleSubmit, setError, setFocus, clearErrors, resetField, setValue, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterSchema)
    });

    const [isCouponValid, setIsCouponValid] = useState(false);
    const [couponProcessing, setCouponProcessing] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [couponApply, setCouponApply] = useState(false);
    const [committeeData, setCommitteeData] = useState([]);
    const [data, setData] = useState([]);
    const [price, setPrice] = useState("");
    const [couponData, setCouponData] = useState({});
    const [committeeID, setCommitteeID] = useState("");
    const router = useRouter();

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
            console.error("Error fetching and decrypting data:", error);
            toast("Error: While Fetching & Decrypting Data!");
        }
    };

    useEffect(() => {
        handleData();
    }, [])

    const handleCommitteeChange = async (id) => {
        try {
            if (!process.env.NEXT_PUBLIC_SECRET_KEY) {
                toast("Server Error: Missing Encryption Key!");
            }

            setIsCouponValid(false);
            resetField("couponCode");
            setCommitteeID(id);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/Committee/${id}`);
            const encryptedData = res.data.Response;
            const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_SECRET_KEY);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            const parsedData = JSON.parse(decryptedData);
            setData(parsedData.portfolios);
            setPrice(parsedData.price);
        } catch {
            toast("Error: While Fetching & Decrypting Data!");
        }
    };

    const handleRemoveCouponCode = () => {
        setCouponApply(false);
        setIsCouponValid(false);
        resetField("couponCode");
        toast("Coupon Code Is Removed Successfully!")
    }

    const handleCouponCode = async () => {
        setCouponProcessing(true);
        try {
            const code = getValues("couponCode");
            const committee = getValues("committee");

            if (!code) {
                toast("Please Enter An Coupon Code!");
                resetField("couponCode");
                setFocus("couponCode");
                return setError("couponCode", { message: "Coupon Code Is Required!" });
            }

            if (!committee) {
                toast("Select Atleast 1 Committe To Apply Coupon Code!");
                resetField("couponCode");
                setFocus("committee");
                return setError("committee", { message: "Committee Is Required!" });
            }

            const res = await axios.post(`/api/Committee/ValidCoupon`, {
                code, committee
            });

            const encryptedData = res.data.Response;
            const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_SECRET_KEY);
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            const parsedData = JSON.parse(decryptedData);

            if (res.data.Data) {
                setIsCouponValid(res.data.Data);
                setCouponData(parsedData);
                setCouponApply(true);
                toast("Coupon Code Applied Successfully!");
                clearErrors("couponCode");
            }
            else {
                setIsCouponValid(res.data.Data);
                resetField("couponCode");
                toast("Coupon Code Is Invalid")
                setFocus("couponCode");
                return setError("couponCode", { message: "Coupon Code Is Invalid!" });
            }
        }
        catch {
            setIsCouponValid(false);
            resetField("couponCode");
            toast("Coupon Code Is Invalid!")
            setFocus("couponCode");
            return setError("couponCode", { message: "Coupon Code Is Invalid!" });
        }
        finally {
            setCouponProcessing(false);
        }
    }

    const handlePayment = async (formData) => {
        setPaymentProcessing(true);

        try {
            if (!process.env.NEXT_PUBLIC_SECRET_KEY) {
                toast("Server Error: Missing Encryption Key!");
            }

            if (!isCouponValid) {
                const payment = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/Payment/CreateOrder`, {
                    committeeID
                });


                const encryptedData = payment.data.Response;
                const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_SECRET_KEY);
                const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                const parsedData = JSON.parse(decryptedData);
                if (parsedData.id) {
                    const options = {
                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                        amount: parsedData.amount,
                        currency: parsedData.currency,
                        name: 'Apex Mun',
                        description: 'Apex Mun Registration Payment',
                        order_id: parsedData.id,
                        handler: async function (payment) {
                            try {
                                const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/Payment/VerifyPayment`, {
                                    formData,
                                    razorpayOrderId: payment.razorpay_order_id,
                                    razorpayPaymentId: payment.razorpay_payment_id,
                                    razorpaySignature: payment.razorpay_signature,
                                    paymentAmount: parsedData.amount,
                                });

                                if (res.data.Verification) {
                                    router.push(`/Payment-Success?paymentID=${payment.razorpay_order_id}`)
                                    toast.success("Payment Successfull.");
                                    setTimeout(() => {
                                        toast.success("Thank You For Registering Your Community!");
                                    }, 2000);
                                }
                                else {
                                    toast.error("Error: Payment Verification Failed!");
                                }
                            } catch (error) {
                                console.log(error);
                                toast.error("Error: Payment Verification Failed!");
                            }
                        },
                        modal: {
                            ondismiss: function () {
                                router.push(`/Payment-Failed?paymentID=${parsedData.id}`)
                                toast('Payment Gateway Closed!');
                                setTimeout(() => {
                                    toast.success("Payment Failed!");
                                }, 2000);
                            }
                        },
                        prefill: {
                            name: getValues("name"),
                            email: getValues("email"),
                            contact: getValues("mobileNo"),
                        },
                        theme: {
                            color: "#bbf7d0"
                        }
                    };

                    const rzp = new window.Razorpay(options);
                    rzp.open();
                }
                else {
                    toast("Error: While Initiating Payment!");
                }
            } else {
                const payment = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/Payment/CreateOrder`, {
                    committeeID, couponData
                });

                const encryptedData = payment.data.Response;
                const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.NEXT_PUBLIC_SECRET_KEY);
                const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                const parsedData = JSON.parse(decryptedData);
                console.log(parsedData);

                if (parsedData.id) {
                    const options = {
                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                        amount: parsedData.amount,
                        currency: parsedData.currency,
                        name: 'Apex Mun',
                        description: 'Apex Mun Registration Payment',
                        order_id: parsedData.id,
                        handler: async function (payment) {
                            try {
                                const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/Payment/VerifyPayment`, {
                                    formData,
                                    razorpayOrderId: payment.razorpay_order_id,
                                    razorpayPaymentId: payment.razorpay_payment_id,
                                    razorpaySignature: payment.razorpay_signature,
                                    paymentAmount: parsedData.amount,
                                });

                                if (res.data.Verification) {
                                    router.push(`/Payment-Success?paymentID=${payment.razorpay_order_id}`)
                                    toast.success("Payment Successfull.");
                                    setTimeout(() => {
                                        toast.success("Thank You For Registering Your Community!");
                                    }, 2000);
                                }
                                else {
                                    toast.error("Error: Payment Verification Failed!");
                                }
                            } catch (error) {
                                console.log(error);
                                toast.error("Error: Payment Verification Failed!");
                            }
                        },
                        modal: {
                            ondismiss: function () {
                                router.push(`/Payment-Failed?paymentID=${parsedData.id}`)
                                toast('Payment Gateway Closed!');
                                setTimeout(() => {
                                    toast.success("Payment Failed!");
                                }, 2000);
                            }
                        },
                        prefill: {
                            name: getValues("name"),
                            email: getValues("email"),
                            contact: getValues("mobileNo"),
                        },
                        theme: {
                            color: "#bbf7d0"
                        }
                    };

                    const rzp = new window.Razorpay(options);
                    rzp.open();
                }
            }
        }
        catch (error) {
            console.log(error);

            toast("Error: While Initiating Payment!");
        }
        finally {
            setPaymentProcessing(false);
        }
    }

    const onSubmit = async (formData) => {
        handlePayment(formData);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full gap-20 py-20 overflow-hidden bg-gradient-to-b via-green-50 to-white from-white">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="flex flex-col justify-center w-11/12 gap-20 md:w-3/4">
                <div className="leading-none tracking-tighter">
                    <SparklesText className="text-[5rem] md:text-[7.5rem] lg:text-[9rem] font-black" text={"Apex MUN'25"} />
                    <h1 className="text-[5rem] md:text-[7.5rem] lg:text-[9rem] font-black">Registration</h1>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-6">
                    <div className="flex flex-col gap-2">
                        <Label>Full Name*</Label>
                        <Input type="text" placeholder="Harshit Jain" {...register("name")} />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Mobile No*</Label>
                        <Input type="tel" minLength={10} maxLength={10} placeholder="+91 00000 00000" {...register("mobileNo")} />
                        {errors.mobileNo && <p className="text-red-500">{errors.mobileNo.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Email ID*</Label>
                        <Input type="text" placeholder="demo@company.com" {...register("email")} />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Institution Name*</Label>
                        <Input type="text" placeholder="ABC School/College" {...register("institutionName")} />
                        {errors.institutionName && <p className="text-red-500">{errors.institutionName.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Class/Year*</Label>
                        <Input type="text" placeholder="2nd Year" {...register("classYear")} />
                        {errors.classYear && <p className="text-red-500">{errors.classYear.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>MUN Experience*</Label>
                        <Input type="tel" placeholder="No. of MUN's Done?" {...register("munExperience")} />
                        {errors.munExperience && <p className="text-red-500">{errors.munExperience.message}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Age*</Label>
                        <Input type="tel" placeholder="18" {...register("age")} />
                        {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Committee*</p>
                        <Select onValueChange={(value) => (setValue('committee', value), handleCommitteeChange(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select A Committee" />
                            </SelectTrigger>
                            <SelectContent>
                                {committeeData.map((data, index) => (
                                    <SelectItem key={index} value={data.id}>
                                        {data.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.committee && <p className="text-red-500">{errors.committee.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Portfolio Reference 1*</p>
                        <Select onValueChange={(value) => setValue('portfolioRef1', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select An Portfolio" />
                            </SelectTrigger>
                            <SelectContent>
                                {data.map((data, index) => (
                                    <SelectItem key={index} value={data.id}>
                                        {data.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.portfolioRef1 && <p className="text-red-500">{errors.portfolioRef1.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Portfolio Reference 2*</p>
                        <Select onValueChange={(value) => setValue('portfolioRef2', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select An Portfolio" />
                            </SelectTrigger>
                            <SelectContent>
                                {data.map((data, index) => (
                                    <SelectItem key={index} value={data.id}>
                                        {data.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.portfolioRef2 && <p className="text-red-500">{errors.portfolioRef2.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium">Portfolio Reference 3*</p>
                        <Select onValueChange={(value) => setValue('portfolioRef3', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select An Portfolio" />
                            </SelectTrigger>
                            <SelectContent>
                                {data.map((data, index) => (
                                    <SelectItem key={index} value={data.id}>
                                        {data.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.portfolioRef3 && <p className="text-red-500">{errors.portfolioRef3.message}</p>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Message</Label>
                        <Input type="text" placeholder="Type Your Message..." {...register("message")} />
                    </div>

                    <div className="flex flex-col w-full mt-10 py-10 border border-[#dddddd] px-4 sm:p-6 rounded-xl">
                        <h1 className="mb-6 text-3xl font-black tracking-tight text-gray-800">Payment Details</h1>

                        <div className="flex items-center justify-between mb-3 text-base">
                            <p className="text-gray-600">Delegation Fee :</p>
                            <p className="font-medium text-gray-800">₹{price - (price * 2 / 100).toFixed(2)}</p>
                        </div>

                        <div className="flex items-center justify-between mb-3 text-base">
                            <p className="text-gray-600">Tax (2%) :</p>
                            <p className="font-medium text-gray-800">₹{(price * 2 / 100).toFixed(2)}</p>
                        </div>

                        <div className="flex flex-col w-full gap-4 mb-4">
                            <div className="flex flex-col items-end gap-3 md:flex-row">
                                <div className="flex-1 w-full">
                                    <Label className="text-gray-600">Coupon Code</Label>
                                    <Input type="text" className="w-full uppercase placeholder:normal-case" placeholder="Enter Coupon Code" {...register("couponCode")} />
                                </div>
                                <div className="flex w-full gap-3 md:w-fit">
                                    <Button type="button" disabled={couponProcessing || couponApply} onClick={handleCouponCode} className="w-full text-white transition-all bg-orange-500 rounded-md md:w-36 hover:bg-orange-600">
                                        {couponProcessing ? <Loader2 size={20} className="mx-auto animate-spin" /> : "Apply"}
                                    </Button>
                                    <Button type="button" disabled={!couponApply} onClick={handleRemoveCouponCode} className="text-white transition-all bg-red-500 rounded-md w-fit hover:bg-red-600" >
                                        <Trash size={20} className="mx-auto" />
                                    </Button>
                                </div>
                            </div>
                            {errors.couponCode && <p className="text-red-500">{errors.couponCode.message}</p>}
                            {isCouponValid && <p className="text-green-600">Coupon Code Applied Successfully!</p>}
                        </div>

                        {isCouponValid && (
                            <div className="flex items-center justify-between mb-3 text-base">
                                <p className="text-gray-600">Coupon Discount ({couponData.percentage}%) :</p>
                                <p className="font-medium text-gray-800">- ₹{(price * couponData.percentage / 100).toFixed(2)}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-4 text-lg font-semibold border-t border-gray-200">
                            <p className="text-gray-800">Grand Total :</p>
                            <div className="flex flex-col items-end">
                                {isCouponValid && <p className="text-gray-400 line-through">₹{price}</p>}
                                <p className="font-bold text-orange-600">₹{isCouponValid ? (price - (price * couponData.percentage / 100)).toFixed(2) : price}</p>
                            </div>
                        </div>

                        <Button type="submit" disabled={paymentProcessing} className="w-full mt-6 text-white transition-all bg-green-500 rounded-md hover:bg-green-600">
                            {paymentProcessing ? <Loader2 size={20} className="mx-auto animate-spin" /> : "Proceed to Pay"}
                        </Button>
                    </div>
                </form >
            </div >
        </div >
    )
}

export default page