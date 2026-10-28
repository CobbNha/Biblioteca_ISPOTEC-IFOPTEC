import { BookOpen, ChevronRight, ClipboardList, Clock3, FileText, Grid2X2, Home, Library, Settings, Users } from 'lucide-react'

const books = [
  ['Metodologia de Investigação Científica', 'M. A. Lakatos', 'Disponível'],
  ['Fundamentos de Gestão', 'J. P. Kotler', 'Disponível'],
  ['Redes de Computadores', 'A. S. Tanenbaum', 'Emprestado'],
  ['Introdução à Programação', 'C. M. Bishop', 'Disponível'],
]

export default function HomePage() {
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-rNYmWgNJhU8g0Y0v11doM12SNyC4zs.png" alt="Logótipo ISPOTEC" /><div><strong>BIBLIOTECA</strong><small>ISPOTEC • IFOPTEC</small></div></div>
      <nav className="nav" aria-label="Navegação principal">
        <button className="active"><Home /><span>Visão geral</span></button><button><BookOpen /><span>Catálogo de livros</span></button><button><ClipboardList /><span>Empréstimos</span></button><button><Users /><span>Utilizadores</span></button><button><FileText /><span>Relatórios</span></button>
      </nav>
      <div className="sideBottom"><Settings /> <span>Configurações</span><br /><br />Sistema de Gestão de Bibliotecas<br />Versão inicial • 2026</div>
    </aside>
    <main className="main">
      <header className="top"><div><div className="eyebrow">Portal académico</div><h1 className="title">Visão geral</h1></div><div className="user"><div><strong>Bibliotecário</strong><br /><small>Administração</small></div><div className="avatar">BA</div></div></header>
      <div className="content">
        <section className="hero"><div><div className="eyebrow">Bem-vindo ao sistema</div><h2>Conhecimento ao alcance de todos.</h2><p>Gira o acervo, acompanha empréstimos e ajuda a comunidade académica a encontrar os recursos certos.</p></div><div className="heroBadge"><Library /><strong>ISPOTEC</strong><span>IFOPTEC integrado</span></div></section>
        <section><div className="sectionHead"><h3>Resumo da biblioteca</h3><button className="link">Ver relatório completo <ChevronRight /></button></div><div className="stats"><div className="stat"><div className="statTop"><span>Total de livros</span><span className="statIcon"><BookOpen /></span></div><strong>2.486</strong><small>+12 este mês</small></div><div className="stat"><div className="statTop"><span>Leitores ativos</span><span className="statIcon"><Users /></span></div><strong>684</strong><small>+8,4% este mês</small></div><div className="stat"><div className="statTop"><span>Empréstimos</span><span className="statIcon"><ClipboardList /></span></div><strong>127</strong><small>34 para devolver hoje</small></div><div className="stat"><div className="statTop"><span>Acervo digital</span><span className="statIcon"><FileText /></span></div><strong>318</strong><small>PDFs disponíveis</small></div></div></section>
        <div className="grid"><section className="panel"><div className="sectionHead"><h3>Livros mais recentes</h3><button className="link">Abrir catálogo <ChevronRight /></button></div>{books.map(([title, author, status]) => <div className="book" key={title}><div className="cover"><BookOpen /></div><div><h4>{title}</h4><p>{author}</p></div><span className="pill" style={status === 'Emprestado' ? {background:'#fff3df',color:'#a66b16'} : undefined}>{status}</span></div>)}</section><section className="panel"><div className="sectionHead"><h3>Atividade recente</h3><Clock3 /></div><div className="activity"><span className="dot" /><div><p><strong>Maria José</strong> devolveu um livro</p><small>Há 12 minutos • Redes de Computadores</small></div></div><div className="activity"><span className="dot" style={{background:'#5c9fe0'}} /><div><p><strong>Paulo António</strong> iniciou um empréstimo</p><small>Há 38 minutos • Fundamentos de Gestão</small></div></div><div className="activity"><span className="dot" style={{background:'#6bb58a'}} /><div><p>Novo livro adicionado ao acervo</p><small>Hoje, 09:14 • Introdução à Programação</small></div></div></section></div>
      </div>
    </main>
  </div>
}
