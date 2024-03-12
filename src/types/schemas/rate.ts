import { z } from "zod";

export const rateSchema = z.object({
  success: z.boolean(),
  query: z.object({
    from: z.string(),
    to: z.string(),
    amount: z.number(),
  }),
  result: z.number(),
});
