import { z } from 'zod'

export const createValuationSchema = z.object({
  description: z.string().min(1, 'Description required').max(500, 'Max 500 characters'),
  category: z.enum(['collectible', 'art', 'tech', 'luxury', 'other']),
})

export const getValuationSchema = z.object({
  id: z.string().min(1),
})

export type CreateValuationInput = z.infer<typeof createValuationSchema>
export type GetValuationInput = z.infer<typeof getValuationSchema>
