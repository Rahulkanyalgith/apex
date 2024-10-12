import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(3, "Name Must Be At Least 3 Characters"),
    mobileNo: z.string().regex(/(\+)?(91)?( )?[789]\d{9}/g, "MobileNo Must Be Exactly 10 Digits."),
    email: z.string().email("Invalid Email Address"),
    institutionName: z.string().min(3, "School/College Name Must Be At Least 3 Characters"),
    classYear: z.string().min(1, "Class/Year Must Be At Least 1 Characters"),
    munExperience: z.string().min(1, "Mun Experience Must Be At Least 1 Characters"),
    age: z.string().min(1, "Age Must Be At Least 1 Characters"),
    committee: z.string(),
    portfolioRef1: z.string(),
    portfolioRef2: z.string(),
    portfolioRef3: z.string(),
    couponCode: z.string().optional(),
    ref: z.string().optional(),
});