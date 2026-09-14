"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { invoiceSchema } from "@/lib/validations/invoices";
import { redirect } from "next/navigation";

export async function createInvoiceAction(formData: FormData) {
  const session = await auth();

  const raw = {
    totalAmount: formData.get("totalAmount"),
    description: formData.get("description"),
    status: formData.get("status"),
    dueDate: formData.get("dueDate"),
    clientId: formData.get("clientId"),
  };

  const parsed = invoiceSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("algo salio mal...");
  }

  await prisma.invoice.create({
    data: {
      ...parsed.data,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : undefined,
      userId: session?.user?.id as string,
    },
  });

  redirect("/dashboard/invoices");
}
