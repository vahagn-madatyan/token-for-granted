import { z } from 'zod'

export const createValuationSchema = z.object({
  description: z.string().min(1, 'Description required').max(500, 'Max 500 characters'),
  category: z.enum(['electronics', 'collectibles', 'fashion', 'entertainment', 'food', 'other']),
})

export const getValuationSchema = z.object({
  id: z.string().min(1),
})

export const runScenarioSchema = z.object({
  itemName: z.string().min(1),
  itemPrice: z.number().positive(),
})

export type CreateValuationInput = z.infer<typeof createValuationSchema>
export type GetValuationInput = z.infer<typeof getValuationSchema>
export type RunScenarioInput = z.infer<typeof runScenarioSchema>
