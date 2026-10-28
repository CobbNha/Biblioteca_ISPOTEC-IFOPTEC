"use client"

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Search, ArrowLeft, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Book = { id: string; title: string; author: string; category: string | null; copies_available: number; copies_total: number; digital_url: string | null }

export default function CatalogoPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => { createClient().from('books').select('id,title,author,category,copies_available,copies_total,digital_url').order('title').then(({ data }: { data: Book[] | null }) => { setBooks(data ?? []); setLoading(false) }) }, [])
  const filtered = useMemo(() => books.filter((book) => `${book.title} ${book.author} ${book.category ?? ''}`.toLowerCase().includes(query.toLowerCase())), [books, query])
  return <main className="page"><div className="page-header"><div><Link className="back-link" href="/"><ArrowLeft /> Voltar ao painel</Link><div className="eyebrow">Acervo institucional</div><h1 className="title">Catálogo de livros</h1><p className="lead">Pesquise no acervo real sincronizado com a biblioteca.</p></div><Link className="secondary-button" href="/biblioteca"><BookOpen /> Biblioteca digital</Link></div><div className="search-box"><Search /><input aria-label="Pesquisar livros" placeholder="Pesquisar por título, autor ou categoria" value={query} onChange={(event) => setQuery(event.target.value)} /></div>{loading ? <div className="empty">A carregar livros...</div> : filtered.length ? <div className="book-grid">{filtered.map((book) => <article className="book-card" key={book.id}><div className="cover large"><BookOpen /></div><div className="book-card-body"><div className="book-card-meta">{book.category ?? 'Sem categoria'}<span className={book.copies_available ? 'available' : 'unavailable'}>{book.copies_available ? 'Disponível' : 'Indisponível'}</span></div><h2>{book.title}</h2><p>{book.author}</p><small>{book.copies_available} de {book.copies_total} exemplares disponíveis</small>{book.digital_url && <a className="digital-link" href={book.digital_url} target="_blank" rel="noreferrer">Abrir versão digital <ExternalLink /></a>}</div></article>)}</div> : <div className="empty">{books.length ? 'Nenhum livro corresponde à pesquisa.' : 'Ainda não existem livros cadastrados na base de dados.'}</div>}</main>
}
