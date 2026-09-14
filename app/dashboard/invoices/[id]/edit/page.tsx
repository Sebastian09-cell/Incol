import { updateInvoiceAction } from "@/lib/actions/invoiceActions/updateInvoiceAction";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const invoice = await prisma.invoice.findUnique({
    where: { id: id },
  });

  const clients = await prisma.client.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <form action={updateInvoiceAction.bind(null, id)}>
      <select name="clientId" defaultValue={invoice?.clientId ?? ""}>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <input
        name="totalAmount"
        type="number"
        defaultValue={invoice?.totalAmount ?? ""}
      />

      <select name="description" defaultValue={invoice?.description ?? ""}>
        <option value="Curso de barbería">Curso de barbería</option>
        <option value="Curso de uñas">Curso de uñas</option>
        <option value="Curso de cejas">Curso de cejas</option>
        <option value="Curso de maquillaje">Curso de maquillaje</option>
        <option value="Curso de tattoo">Curso de tattoo</option>
      </select>

      <select name="status" defaultValue={invoice?.status ?? "PENDING"}>
        <option value="PENDING">Pendiente</option>
        <option value="PARTIAL">Parcial</option>
        <option value="PAID">Pagada</option>
        <option value="OVERDUE">Vencida</option>
      </select>

      <input
        name="dueDate"
        type="date"
        defaultValue={
          invoice?.dueDate ? invoice.dueDate.toISOString().split("T")[0] : ""
        }
      />

      <button type="submit">Guardar cambios</button>
    </form>
  );
}
