import { auth } from "@/auth";
import { deleteClientAction } from "@/lib/actions/clientActions/deleteClientAction";
import { prisma } from "@/lib/prisma";

export default async function Clients() {
  const session = await auth();
  const clients = await prisma.client.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <div>
      <h1>Clientes</h1>

      <a href="/dashboard/clients/new">Nuevo cliente</a>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} - {client.email} - {client.phone}
            <a href={`/dashboard/clients/${client.id}/edit`}>Editar</a>
            <form action={deleteClientAction.bind(null, client.id)}>
              <button type="submit">Eliminar</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
