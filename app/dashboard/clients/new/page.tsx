import { createClientAction } from "@/lib/actions/client";

export default function NewClientPage() {
  return (
    <form action={createClientAction}>
      <input name="name" placeholder="Nombre" />
      <input name="email" placeholder="Email" />
      <input name="phone" placeholder="Teléfono" />
      <button type="submit">Crear cliente</button>
    </form>
  );
}
