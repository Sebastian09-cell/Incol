"use server";
import { auth } from "@/auth";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteInvoiceAction(id: string) {
  const session = await auth();
  await prisma.invoice.delete({
    where: {
      id: id,
      userId: session?.user?.id as string,
    },
  });

  revalidatePath("/dashboard/invoices");
}
