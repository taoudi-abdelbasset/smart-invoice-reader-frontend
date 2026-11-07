import { useState } from "react";
import type { BusinessEntity, Company, Invoice } from "./types";

const partyName = (company: Company | null, entity: BusinessEntity | null) =>
  company?.name ?? (entity ? `${entity.first_name} ${entity.last_name}` : "-");

const taxFactor = (rate: number) => (rate > 1 ? rate / 100 : rate);

const money = (n: number | null, currency: string | null) =>
  n === null
    ? "-"
    : `${n.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })} ${currency ?? ""}`;

function Party({
  label,
  company,
  entity,
}: {
  label: string;
  company: Company | null;
  entity: BusinessEntity | null;
}) {
  const source = company ?? entity;
  return (
    <div className="col-6">
      <div className="text-muted text-uppercase">{label}</div>
      <div className="fw-semibold">{partyName(company, entity)}</div>
      {source?.address && <div>{source.address}</div>}
      {source?.country && <div>{source.country}</div>}
      {source && source.contacts.length > 0 && (
        <div>{source.contacts.map((c) => c.value).join(" · ")}</div>
      )}
    </div>
  );
}

export default function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const q = search.trim().toLowerCase();
  const filtered = invoices.filter(
    (i) =>
      !q ||
      i.invoice_number.toLowerCase().includes(q) ||
      i.file.file_name.toLowerCase().includes(q) ||
      partyName(i.issuer_company, i.issuer).toLowerCase().includes(q) ||
      partyName(i.buyer_company, i.buyer).toLowerCase().includes(q),
  );

  return (
    <div>
      <input
        className="form-control form-control-sm mb-2"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 && (
        <p className="text-muted text-center my-4">No invoices yet</p>
      )}

      <div className="accordion accordion-flush">
        {filtered.map((i) => {
          const open = openId === i.id;
          return (
            <div className="accordion-item" key={i.id}>
              <h2 className="accordion-header">
                <button
                  type="button"
                  className={`accordion-button ${open ? "" : "collapsed"}`}
                  onClick={() => setOpenId(open ? null : i.id)}
                >
                  <div className="w-100 d-flex justify-content-between me-3">
                    <div>
                      <div className="fw-semibold">{i.invoice_number}</div>
                      <small className="text-muted">
                        {partyName(i.issuer_company, i.issuer)} ·{" "}
                        {i.file.file_name}
                      </small>
                    </div>
                    <div className="text-end">
                      <div className="fw-semibold">
                        {money(i.total_amount, i.currency)}
                      </div>
                      <small className="text-muted">
                        Due {i.due_date?.slice(0, 10) ?? "-"}
                      </small>
                    </div>
                  </div>
                </button>
              </h2>

              {open && (
                <div className="accordion-body">
                  <div className="row mb-3 small">
                    <Party
                      label="Issuer"
                      company={i.issuer_company}
                      entity={i.issuer}
                    />
                    <Party
                      label="Buyer"
                      company={i.buyer_company}
                      entity={i.buyer}
                    />
                  </div>

                  <div className="table-responsive">
                    <table className="table table-sm table-striped align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>#</th>
                          <th>Item</th>
                          <th className="text-end">Qty</th>
                          <th className="text-end">Unit</th>
                          <th className="text-end">Tax</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {i.items.map((it, idx) => (
                          <tr key={it.id}>
                            <td>{it.index ?? idx + 1}</td>
                            <td>{it.item_name}</td>
                            <td className="text-end">{it.qte}</td>
                            <td className="text-end">
                              {it.unit_price.toFixed(2)}
                            </td>
                            <td className="text-end">
                              {+(taxFactor(it.tax_rate) * 100).toFixed(2)}%
                            </td>
                            <td className="text-end">
                              {(
                                it.qte *
                                it.unit_price *
                                (1 + taxFactor(it.tax_rate))
                              ).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="small">
                        <tr>
                          <td colSpan={5} className="text-end">
                            Subtotal
                          </td>
                          <td className="text-end">
                            {money(i.subtotal, i.currency)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={5} className="text-end">
                            Tax
                          </td>
                          <td className="text-end">
                            {money(i.tax_amount, i.currency)}
                          </td>
                        </tr>
                        <tr className="fw-bold">
                          <td colSpan={5} className="text-end">
                            Total
                          </td>
                          <td className="text-end">
                            {money(i.total_amount, i.currency)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="small text-muted">
                    Date: {i.invoice_date?.slice(0, 10) ?? "-"} · Payment:{" "}
                    {i.payment_method ?? "-"}
                    {i.note && <> · Note: {i.note}</>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
