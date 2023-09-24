import { z } from "zod";

export const registerSchema = z.object({

    email:z.string({
        required_error: 'email is required',
    }).email({
        message: 'Email es invalido' 
    }),
    username:z.string({
        required_error: 'Usuario es requerido',
    }).min(3),
    password:z.string({
        required_error: 'Password es requerida',
    }).min(6, {
        message: 'Password minimo 6 caracteres'
    })

    })

    export const loginSchema
    = z.object({
        email: z.string({
            required_error: 'Email es requerido',
        }).email({
            message: 'Email es invalido' 
        }),
        password: z.string({
            required_error: "Password is required"
        }).min(6,{
            message: 'Password minimo 6 caracteres'
        }),
    
        })
    
      