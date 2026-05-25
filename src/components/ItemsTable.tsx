import type { DocumentItem } from '../types/document'
import { Card } from './Card'

interface ItemsTableProps {
  items: DocumentItem[]
}

export function ItemsTable({ items }: ItemsTableProps) {
  return (
    <Card
      title="Позиции"
      subtitle={`Товары и услуги · ${items.length} строк`}
    >
      {/* Мобильная версия — карточки */}
      <ul className="space-y-3 sm:hidden">
        {items.map((item) => (
          <li
            key={item.index}
            className="rounded-xl border border-border bg-page px-3 py-3"
          >
            <div className="flex items-start gap-2">
              <span className="shrink-0 text-status font-semibold text-muted">
                #{item.index}
              </span>
              <div className="min-w-0 flex-1">
                <p className="break-words text-table-data font-medium text-foreground">
                  {item.name}
                </p>
                {item.meta && (
                  <p className="mt-1 break-words text-status text-muted">{item.meta}</p>
                )}
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-status">
              <div>
                <dt className="text-muted">Кол-во</dt>
                <dd className="mt-0.5 text-foreground">{item.quantity}</dd>
              </div>
              <div>
                <dt className="text-muted">НДС</dt>
                <dd className="mt-0.5 text-foreground">{item.vat}</dd>
              </div>
              <div>
                <dt className="text-muted">Цена</dt>
                <dd className="mt-0.5 tabular-nums text-foreground">{item.price}</dd>
              </div>
              <div>
                <dt className="text-muted">Сумма</dt>
                <dd className="mt-0.5 tabular-nums text-foreground">{item.amount}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {/* Desktop — таблица со скроллом */}
      <div className="hidden overflow-x-auto rounded-xl border border-border sm:block">
        <table className="w-full min-w-[640px] border-collapse text-table-data">
          <thead>
            <tr className="bg-page text-left text-status uppercase tracking-wide text-muted">
              <th className="w-10 px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Наименование</th>
              <th className="px-4 py-3 font-medium">Кол-во</th>
              <th className="px-4 py-3 text-right font-medium">Цена</th>
              <th className="px-4 py-3 text-right font-medium">Сумма</th>
              <th className="px-4 py-3 font-medium">НДС</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.index}
                className={
                  index !== items.length - 1 ? 'border-b border-border' : undefined
                }
              >
                <td className="px-4 py-3 align-top text-muted">{item.index}</td>
                <td className="px-4 py-3 align-top text-foreground">
                  <div className="font-medium">{item.name}</div>
                  {item.meta && (
                    <div className="mt-0.5 text-status text-muted">{item.meta}</div>
                  )}
                </td>
                <td className="px-4 py-3 align-top text-foreground">{item.quantity}</td>
                <td className="px-4 py-3 text-right align-top text-foreground tabular-nums">
                  {item.price}
                </td>
                <td className="px-4 py-3 text-right align-top text-foreground tabular-nums">
                  {item.amount}
                </td>
                <td className="px-4 py-3 align-top text-foreground">{item.vat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
