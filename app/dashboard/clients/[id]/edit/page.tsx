import { prisma } from "@/lib/prisma";
import { updateClientAction } from "@/lib/actions/clientActions/updateClientActions";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
  });

  return (
    <form action={updateClientAction.bind(null, id)}>
      <input name="name" defaultValue={client?.name} />
      <input name="email" defaultValue={client?.email ?? ""} />
      <input name="phone" defaultValue={client?.phone ?? ""} />
      <button type="submit">Guardar cambios</button>
    </form>
  );
}
