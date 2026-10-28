'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Book = { id: string; title: string; author: string; category: string | null; digital_url: string | null }

export default function BibliotecaPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [selected, setSelected] = useState<Book | null>(null)
  const [viewId, setViewId] = useState<string | null>(null)

  useEffect(() => { createClient().from('books').select('id,title,author,category,digital_url').not('digital_url', 'is', null).order('created_at', { ascending: false }).then(({ data }: { data: Book[] | null }) => setBooks(data ?? [])) }, [])

  async function openBook(book: Book) {
    setSelected(book)
    const sessionKey = crypto.randomUUID()
    const { data } = await createClient().from('digital_views').insert({ book_id: book.id, session_key: sessionKey }).select('id').single()
    setViewId(data?.id ?? null)
  }

  async function closeBook() {
    if (viewId) await createClient().from('digital_views').update({ last_seen_at: new Date().toISOString(), completed: true }).eq('id', viewId)
    setSelected(null)
    setViewId(null)
  }

  return <main className="library-page"><header className="page-header"><div><p className="eyebrow">Biblioteca digital</p><h1>Acervo para leitura</h1><p className="muted">Aceda aos títulos digitais disponíveis e acompanhe a sua leitura.</p></div><a className="secondary-button" href="/">Voltar ao painel</a></header><section className="book-grid">{books.length === 0 ? <div className="empty-state"><h2>Nenhum livro digital disponível</h2><p>Os livros aparecem aqui depois de um administrador adicionar o link do PDF.</p></div> : books.map((book) => <article className="book-card" key={book.id}><span className="book-cover">PDF</span><div><p className="eyebrow">{book.category || 'Acervo geral'}</p><h2>{book.title}</h2><p className="muted">{book.author}</p><button className="primary-button" onClick={() => openBook(book)}>Abrir leitura</button></div></article>)}</section>{selected && <div className="reader-overlay"><div className="reader"><div className="reader-bar"><strong>{selected.title}</strong><button className="secondary-button" onClick={closeBook}>Fechar</button></div>{selected.digital_url ? <iframe title={`Leitura de ${selected.title}`} src={selected.digital_url} /> : <p className="empty-state">Este livro ainda não tem ficheiro digital.</p>}</div></div>}</main>
}
