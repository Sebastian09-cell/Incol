import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createInvoiceAction } from "@/lib/actions/invoiceActions/createInvoiceAction";

export default async function newInvoicesPage() {
  const session = await auth();
  const clients = await prisma.client.findMany({
    where: { userId: session?.user?.id },
  });
  return (
    <form action={createInvoiceAction}>
      <select name="clientId">
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <input name="totalAmount" type="number" placeholder="Monto (centavos)" />
      <select name="description">
        <option value="Curso de barbería">Curso de barbería</option>
        <option value="Curso de uñas">Curso de uñas</option>
        <option value="Curso de cejas">Curso de cejas</option>
        <option value="Curso de maquillaje">Curso de maquillaje</option>
        <option value="Curso de tattoo">Curso de tattoo</option>
      </select>

      <select name="status">
        <option value="PENDING">Pendiente</option>
        <option value="PARTIAL">Parcial</option>
        <option value="PAID">Pagada</option>
        <option value="OVERDUE">Vencida</option>
      </select>

      <input name="dueDate" type="date" />

      <button type="submit">Crear factura</button>
    </form>
  );
}
