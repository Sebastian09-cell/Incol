import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { statusLabels } from "@/lib/labels";
import { deleteInvoiceAction } from "@/lib/actions/invoiceActions/deleteInvoiceAction";
export default async function Invoices() {
  const session = await auth();
  const invoices = await prisma.invoice.findMany({
    where: { userId: session?.user?.id },
    include: { client: true },
  });

  return (
    <div>
      <h1>Facturas</h1>

      <ul>
        {invoices.map((Invoice) => (
          <li key={Invoice.id}>
            {Invoice.client.name} - {Invoice.description} -{" "}
            {statusLabels[Invoice.status]} -{" "}
            {Invoice.dueDate
              ? Invoice.dueDate.toLocaleDateString()
              : "sin fecha limite"}
            - {Invoice.totalAmount}
            <a href={`/dashboard/invoices/${Invoice.id}/edit`}>Editar</a>
            <form action={deleteInvoiceAction.bind(null, Invoice.id)}>
              <button type="submit">Eliminar</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
