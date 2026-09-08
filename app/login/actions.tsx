"use server";

import { signIn } from "@/auth";

export async function loginAction(formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  await signIn("credentials", {
    username,
    password,
    redirectTo: "/dashboard",
  });
}
