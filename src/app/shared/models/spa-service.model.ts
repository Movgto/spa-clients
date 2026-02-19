import z from 'zod';

export const spaServiceSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.int(),
    createdAt: z.date()
})

export type SpaService = z.infer<typeof spaServiceSchema>;