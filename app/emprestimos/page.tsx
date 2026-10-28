import Link from 'next/link'
import { ArrowLeft, ClipboardList, UserRound } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'

type Loan = { id: string; borrowed_at: string; due_at: string; books: { title: string } | null; members: { full_name: string } | null }
const date = (value: string) => new Intl.DateTimeFormat('pt-PT', { dateStyle: 'medium' }).format(new Date(value))

export default async function EmprestimosPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('loans').select('id,borrowed_at,due_at,books(title),members(full_name)').is('returned_at', null).order('due_at')
  const loans = (data ?? []) as unknown as Loan[]
  return <main className="page"><div className="page-header"><div><Link className="back-link" href="/"><ArrowLeft /> Voltar ao painel</Link><div className="eyebrow">Circulação do acervo</div><h1 className="title">Empréstimos em aberto</h1><p className="lead">Acompanhamento dos empréstimos ativos registados no Supabase.</p></div><div className="metric-card compact"><ClipboardList /><strong>{loans.length}</strong><span>em aberto</span></div></div><section className="table-panel">{loans.length ? <div className="loan-list">{loans.map((loan) => <div className="loan-row" key={loan.id}><div className="loan-icon"><ClipboardList /></div><div><strong>{loan.books?.title ?? 'Livro removido'}</strong><span><UserRound /> {loan.members?.full_name ?? 'Leitor não identificado'}</span></div><time>Devolução<br /><strong>{date(loan.due_at)}</strong></time></div>)}</div> : <div className="empty">Não existem empréstimos em aberto na base de dados.</div>}</section></main>
}
