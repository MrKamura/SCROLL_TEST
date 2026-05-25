import { useCallback, useState } from 'react'
import { ActionsList } from './components/ActionsList'
import { BeforeCard } from './components/BeforeCard'
import { ChecksList } from './components/ChecksList'
import { CheckCounters } from './components/CheckCounters'
import { CTASection } from './components/CTASection'
import { ExampleButtons } from './components/ExampleButtons'
import { FieldsTable } from './components/FieldsTable'
import { ItemsTable } from './components/ItemsTable'
import { ProcessingAnimation } from './components/ProcessingAnimation'
import { SummaryStats } from './components/SummaryStats'
import { ThemeToggle } from './components/ThemeToggle'
import { DocumentHistory } from './components/DocumentHistory'
import { mockDocuments } from './data/mockDocuments'
import { useDocumentHistory } from './hooks/useDocumentHistory'
import type { DocumentAnalysis, DocumentType } from './types/document'

type Phase = 'idle' | 'processing' | 'done'

const examples: DocumentAnalysis[] = [
  mockDocuments.invoice,
  mockDocuments.act,
  mockDocuments.waybill,
]

function App() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [active, setActive] = useState<DocumentAnalysis | null>(null)
  const [resultsKey, setResultsKey] = useState(0)
  const { history, addEntry } = useDocumentHistory()

  const showResults = () => setResultsKey((key) => key + 1)

  const handlePick = (type: DocumentType) => {
    setActive(mockDocuments[type])
    setPhase('processing')
  }

  const handleHistorySelect = (type: DocumentType) => {
    setActive(mockDocuments[type])
    setPhase('done')
    showResults()
  }

  const handleComplete = useCallback(
    (doc: DocumentAnalysis) => {
      addEntry(doc)
      setPhase('done')
      showResults()
    },
    [addEntry],
  )

  const handleReset = () => {
    setPhase('idle')
    setActive(null)
  }

  return (
    <div className="min-h-svh w-full min-w-0 max-w-full overflow-x-clip bg-page text-foreground">
      <div className="mx-auto w-full min-w-0 max-w-6xl px-3 py-6 sm:px-6 sm:py-12">
        {/* 1. Заголовок */}
        <header className="mb-8 min-w-0 sm:mb-10">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1 text-status sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1">
            <div className="flex min-w-0 items-center gap-2">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h12l4 4v12a2 2 0 0 1-2 2H4z" />
                <path d="M14 4v6h6" />
                <path d="M8 14h8" />
                <path d="M8 18h6" />
              </svg>
              </span>
              <span className="font-semibold uppercase tracking-[0.16em] text-foreground sm:tracking-[0.2em]">
                СВИТОК ЛАЙТ
              </span>
            </div>
            <span className="hidden text-muted sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="text-pretty text-muted sm:shrink-0">
              Универсальный анализ документов
            </span>
            </div>
            <ThemeToggle />
          </div>
          <h1 className="mt-4 text-balance text-page-title text-foreground">
            Загрузил документ — получил структурированные данные и проверки
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-table-data text-muted">
            Для бухгалтеров, менеджеров, секретарей и всех, кто работает с
            первичкой. Выберите пример ниже — увидите, как СВИТОК извлекает поля,
            считает суммы и подсказывает, что нужно сделать.
          </p>
        </header>

        {/* 2. Три кнопки-примера */}
        <section className="mb-8">
          <p className="mb-3 text-status uppercase tracking-wide text-muted">
            Попробуйте на примере
          </p>
          <ExampleButtons
            examples={examples}
            activeType={active?.type}
            disabled={phase === 'processing'}
            onPick={handlePick}
          />
        </section>

        {history.length > 0 && (
          <section className="mb-8">
            <DocumentHistory
              entries={history}
              activeType={phase === 'done' ? active?.type : undefined}
              disabled={phase === 'processing'}
              onSelect={handleHistorySelect}
            />
          </section>
        )}

        {/* 3. Блок «До» + 4. Анимация + 5. Результат */}
        {active && (
          <section className="mb-10 min-w-0 space-y-4 sm:mb-12 sm:space-y-5">
            <BeforeCard
              fileName={active.fileName}
              pageCount={active.pageCount}
              fileSize={active.fileSize}
              typeLabel={active.typeLabel}
            />

            {phase === 'processing' && active && (
              <ProcessingAnimation
                onComplete={() => handleComplete(active)}
              />
            )}

            {phase === 'done' && (
              <>
                <div className="flex flex-col gap-3 rounded-2xl border border-success/40 bg-success/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-status">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/20 text-sm font-semibold text-success">
                      ✓
                    </span>
                    <span className="text-foreground">
                      Готово за {active.processedInSec} сек
                    </span>
                    <span aria-hidden="true" className="text-muted">
                      ·
                    </span>
                    <span className="text-muted">Тип: {active.typeLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full rounded-full border border-border bg-card px-4 py-2.5 text-status font-medium text-foreground transition hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:w-auto"
                  >
                    Попробовать другой пример
                  </button>
                </div>

                <SummaryStats stats={active.summary} />

                <CheckCounters
                  resetKey={String(resultsKey)}
                  success={active.checks.filter((c) => c.status === 'success').length}
                  warning={active.checks.filter((c) => c.status === 'warning').length}
                  error={active.checks.filter((c) => c.status === 'error').length}
                />

                <div className="grid min-w-0 gap-4 sm:gap-5">
                  <FieldsTable fields={active.fields} />
                  <ChecksList checks={active.checks} resetKey={String(resultsKey)} />
                  <ItemsTable items={active.items} />
                  <ActionsList actions={active.actions} />
                </div>
              </>
            )}
          </section>
        )}

        {/* 6. CTA */}
        <CTASection />
      </div>
    </div>
  )
}

export default App
