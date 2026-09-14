import { z } from "zod";

export const invoiceSchema = z.object({
  totalAmount: z.coerce.number(),
  description: z.string().optional(),
  status: z.enum(["PARTIAL", "PAID", "OVERDUE", "PENDING"]),
  dueDate: z.string().optional(),
  clientId: z.string(),
});
