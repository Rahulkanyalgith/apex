import { z } from "zod";

export const ReachUsSchema = z.object({
    name: z.string().min(3, "Name Must Be At Least 3 Characters"),
    mobileNo: z.string().regex(/(\+)?(91)?( )?[789]\d{9}/g, "MobileNo Must Be Exactly 10 Digits."),
    email: z.string().email("Invalid Email Address"),
    bodyMessage: z.string().min(3, "Message Must Be At Least 3 Characters"),
});