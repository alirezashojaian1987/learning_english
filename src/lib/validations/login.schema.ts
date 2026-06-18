import { z } from "zod";

export const loginSchema=z.object({
    email:z.email("ایمیل معتبر نیست!"),
    password:z.string().min(4,"رمز عبور باید بیشتر از 4 کاراکتر باشد."),
});

export type LoginFormData=z.infer<typeof loginSchema>;