import { z } from "zod";

export const taskSchema = z.object({
    
        title:z.string({
            required_error: 'title is required',
        }).min(3),
        description:z.string({
            required_error: 'description is required',
        }).min(3),
        date:z.string({
            required_error: 'date is required',
        }).datetime().optional(),
     
        })


