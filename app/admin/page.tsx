import { createClient } from '@/lib/supabase/server'

export default async function AdminPage() {
  const supabase = await createClient()
  const [{ count: views }, { count: completed }, { data: popular }] = await Promise.all([
    supabase.from('digital_views').select('id', { count: 'exact', head: true }),
    supabase.from('digital_views').select('id', { count: 'exact', head: true }).eq('completed', true),
    supabase.from('digital_views').select('book_id, duration_seconds, completed').order('started_at', { ascending: false }).limit(8),
  ])
  const adherence = views ? Math.round(((completed ?? 0) / views) * 100) : 0
  return <main className="admin-page"><header className="page-header"><div><p className="eyebrow">Administração</p><h1>Monitoramento da biblioteca digital</h1><p className="muted">Indicadores calculados a partir das visualizações registadas no Supabase.</p></div><a className="secondary-button" href="/">Painel geral</a></header><section className="metric-grid"><article className="metric-card"><span>Visualizações</span><strong>{views ?? 0}</strong></article><article className="metric-card"><span>Leituras concluídas</span><strong>{completed ?? 0}</strong></article><article className="metric-card"><span>Aderência</span><strong>{adherence}%</strong></article></section><section className="panel"><h2>Últimas sessões de leitura</h2>{popular?.length ? <div className="activity-list">{popular.map((item) => <div className="activity-row" key={item.book_id + item.duration_seconds}><span>{item.book_id}</span><span>{item.duration_seconds}s · {item.completed ? 'Concluída' : 'Em andamento'}</span></div>)}</div> : <div className="empty-state"><h3>Sem sessões registadas</h3><p>As métricas surgirão quando os leitores abrirem livros digitais.</p></div>}</section></main>
}
