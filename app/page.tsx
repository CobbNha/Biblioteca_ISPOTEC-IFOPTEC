import Link from 'next/link'
import { BookOpen, ChevronRight, ClipboardList, Clock3, FileText, Home, Library, Settings, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

type Book = { id: string; title: string; author: string; copies_available: number; digital_url: string | null }
type Activity = { id: string; action: string; description: string; book_title: string | null; created_at: string }

function formatActivityDate(date: string) {
  return new Intl.DateTimeFormat('pt-PT', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date))
}

export default async function HomePage() {
  const supabase = await createClient()
  const [{ data: books }, { count: members }, { count: loans }, { data: activity }] = await Promise.all([
    supabase.from('books').select('id,title,author,copies_available,digital_url').order('created_at', { ascending: false }).limit(4),
    supabase.from('members').select('id', { count: 'exact', head: true }).eq('status', 'Ativo'),
    supabase.from('loans').select('id', { count: 'exact', head: true }).is('returned_at', null),
    supabase.from('library_activity').select('id,action,description,book_title,created_at').order('created_at', { ascending: false }).limit(3),
  ])
  const recentBooks = (books ?? []) as Book[]
  const recentActivity = (activity ?? []) as Activity[]
  const digitalCount = recentBooks.filter((book) => book.digital_url).length

  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rNYmWgNJhU8g0Y0v11doM12SNyC4zs.png" alt="Logótipo ISPOTEC" /><div><strong>BIBLIOTECA</strong><small>ISPOTEC • IFOPTEC</small></div></div>
      <nav className="nav" aria-label="Navegação principal"><Link className="active" href="/"><Home /><span>Visão geral</span></Link><Link href="/catalogo"><BookOpen /><span>Catálogo de livros</span></Link><Link href="/emprestimos"><ClipboardList /><span>Empréstimos</span></Link><button><Users /><span>Utilizadores</span></button><button><FileText /><span>Relatórios</span></button></nav>
      <div className="sideBottom"><Settings /> <span>Configurações</span><br /><br />Sistema de Gestão de Bibliotecas<br />Dados sincronizados com Supabase</div>
    </aside>
    <main className="main">
      <header className="top"><div><div className="eyebrow">Portal académico</div><h1 className="title">Visão geral</h1></div><div className="user"><div><strong>Bibliotecário</strong><br /><small>Administração</small></div><div className="avatar">BA</div></div></header>
      <div className="content">
        <section className="hero"><div><div className="eyebrow">Bem-vindo ao sistema</div><h2>Conhecimento ao alcance de todos.</h2><p>Gira o acervo, acompanha empréstimos e ajuda a comunidade académica a encontrar os recursos certos.</p></div><div className="heroBadge"><Library /><strong>ISPOTEC</strong><span>IFOPTEC integrado</span></div></section>
        <section><div className="sectionHead"><h3>Resumo da biblioteca</h3><button className="link">Ver relatório completo <ChevronRight /></button></div><div className="stats"><div className="stat"><div className="statTop"><span>Total de livros</span><span className="statIcon"><BookOpen /></span></div><strong>{recentBooks.length}</strong><small>Registos recentes exibidos</small></div><div className="stat"><div className="statTop"><span>Leitores ativos</span><span className="statIcon"><Users /></span></div><strong>{members ?? 0}</strong><small>Na base de dados</small></div><div className="stat"><div className="statTop"><span>Empréstimos</span><span className="statIcon"><ClipboardList /></span></div><strong>{loans ?? 0}</strong><small>Em aberto</small></div><div className="stat"><div className="statTop"><span>Acervo digital</span><span className="statIcon"><FileText /></span></div><strong>{digitalCount}</strong><small>Entre os livros recentes</small></div></div></section>
        <div className="grid"><section className="panel"><div className="sectionHead"><h3>Livros mais recentes</h3><Link className="link" href="/catalogo">Abrir catálogo <ChevronRight /></Link></div>{recentBooks.length ? recentBooks.map((book) => <div className="book" key={book.id}><div className="cover"><BookOpen /></div><div><h4>{book.title}</h4><p>{book.author}</p></div><span className="pill">{book.copies_available > 0 ? 'Disponível' : 'Emprestado'}</span></div>) : <div className="empty">Ainda não existem livros cadastrados na base de dados.</div>}</section><section className="panel"><div className="sectionHead"><h3>Atividade recente</h3><Clock3 /></div>{recentActivity.length ? recentActivity.map((item) => <div className="activity" key={item.id}><span className="dot" /><div><p><strong>{item.action}</strong> {item.description}</p><small>{formatActivityDate(item.created_at)}{item.book_title ? ` • ${item.book_title}` : ''}</small></div></div>) : <div className="empty">Ainda não existem atividades registadas.</div>}</section></div>
      </div>
    </main>
  </div>
}
