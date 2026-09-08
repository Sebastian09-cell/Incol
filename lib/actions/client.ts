"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { clientSchema } from "@/lib/validations/client";
import { redirect } from "next/navigation";
export async function createClientAction(formData: FormData) {
  const session = await auth();

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  const parsed = clientSchema.safeParse(raw);

  if (!parsed.success) {
    throw new Error("algo salio mal...");
  }
  await prisma.client.create({
    data: {
      ...parsed.data,
      userId: session?.user?.id as string,
    },
  });
  redirect("/dashboard/clients");
}
