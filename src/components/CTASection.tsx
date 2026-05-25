import { useState } from 'react'
import type { FormEvent } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function CTASection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sent' | 'invalid'>('idle')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('invalid')
      return
    }
    setStatus('sent')
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-status uppercase tracking-[0.2em] text-accent">
            СВИТОК для бизнеса
          </p>
          <h2 className="mt-2 text-block-title text-foreground sm:text-2xl">
            Хочу такое для компании
          </h2>
          <p className="mt-2 text-table-data text-muted">
            Оставьте email — пришлём демо для вашего объёма документов,
            расскажем про интеграцию с 1С и СБИС, поможем настроить проверки
            под ваши регламенты.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md"
          noValidate
        >
          {status === 'sent' ? (
            <div className="flex items-center gap-3 rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-table-data text-foreground">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-sm font-semibold text-success">
                ✓
              </span>
              <span>
                Заявка отправлена. Свяжемся с вами по адресу{' '}
                <span className="font-semibold text-foreground">{email}</span>{' '}
                в течение рабочего дня.
              </span>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2 sm:flex-row">
                <label className="sr-only" htmlFor="cta-email">
                  Email
                </label>
                <input
                  id="cta-email"
                  type="email"
                  required
                  placeholder="name@company.ru"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (status === 'invalid') setStatus('idle')
                  }}
                  className={[
                    'flex-1 rounded-full border bg-page px-4 py-3 text-table-data text-foreground placeholder:text-muted',
                    'focus:outline-none focus:ring-2',
                    status === 'invalid'
                      ? 'border-error/60 focus:ring-error/40'
                      : 'border-border focus:border-accent focus:ring-accent/40',
                  ].join(' ')}
                />
                <button
                  type="submit"
                  className="rounded-full bg-accent px-5 py-3 text-table-data font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  Отправить заявку
                </button>
              </div>
              {status === 'invalid' && (
                <p className="mt-2 text-status text-error">
                  Укажите корректный email — формат name@company.ru
                </p>
              )}
              {status === 'idle' && (
                <p className="mt-2 text-status text-muted">
                  Отправляя форму, вы соглашаетесь с обработкой персональных данных.
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  )
}
