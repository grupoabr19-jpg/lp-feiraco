import Image from 'next/image';
import { RegistrationForm } from '@/components/RegistrationForm';
import { MobileStickyCta } from '@/components/MobileStickyCta';
import { ProductInterestLink } from '@/components/ProductInterestLink';
import { event } from '@/config/event';

const products = [
  ['Telhas', 'Coberturas para diferentes projetos e necessidades.', 'telhas'],
  ['Tubos e metalons', 'Soluções versáteis para estruturas e serralheria.', 'tubos'],
  ['Perfis estruturais', 'Resistência e precisão para projetos exigentes.', 'perfis'],
  ['Vergalhões', 'Base segura para obras e estruturas de concreto.', 'vergalhoes'],
  ['Chapas e bobinas', 'Matéria-prima para transformar boas ideias em produção.', 'chapas'],
  ['Malhas e treliças', 'Produtividade e padronização para a construção.', 'malhas'],
  ['Laminados', 'Soluções para aplicações industriais e comerciais.', 'laminados'],
  ['Vigas W e I', 'Desempenho estrutural para projetos de maior porte.', 'vigas'],
];

const faqs = [
  ['Preciso me cadastrar?', 'O cadastro é recomendado para receber localização, informações confirmadas e lembretes do evento.'],
  ['A participação é gratuita?', 'Esta informação será publicada assim que houver confirmação oficial da organização.'],
  ['Posso solicitar orçamento no evento?', 'Sim. A equipe estará preparada para entender sua necessidade e orientar sobre produtos e soluções.'],
  ['Quais produtos estarão disponíveis?', 'O portfólio e as oportunidades específicas serão divulgados nos canais oficiais do Grupo ABR.'],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Grupo ABR">
          <Image className="brand-logo" src="/images/logo-grupo-abr-branca.png" width={473} height={274} alt="Grupo ABR — Seu Parceiraço" priority />
        </a>
        <div className="header-date"><strong>12 SET</strong><span>8h às 12h</span></div>
        <a href="#inscricao" className="button button-small">Quero participar</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-grid container">
          <div className="hero-content">
            <div className="edition-chip"><span>3º</span> FeirAÇO Grupo ABR</div>
            <h1>O aço que movimenta seus projetos. <em>As oportunidades que aproximam negócios.</em></h1>
            <p>No dia 12 de setembro, o Grupo ABR abre as portas para uma manhã de produtos, atendimento especializado e novas conexões.</p>
            <div className="event-data">
              <div><small>Quando</small><strong>{event.dateLabel}</strong></div>
              <div><small>Horário</small><strong>Das 8h às 12h</strong></div>
              <div><small>Onde</small><strong>{event.location}</strong></div>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#inscricao">Garantir minha participação</a>
              <a className="button button-outline" href="#sobre">Conhecer o evento</a>
            </div>
          </div>
          <aside className="hero-card">
            <span className="hero-number">03</span>
            <p>Uma edição construída para aproximar quem fornece de quem faz acontecer.</p>
            <div className="steel-line" />
            <strong>Seu Parceiraço</strong>
          </aside>
        </div>
      </section>

      <section className="registration-shell" id="inscricao">
        <div className="container"><RegistrationForm /></div>
      </section>

      <section className="section event-film" aria-labelledby="event-film-title">
        <div className="container event-film-grid">
          <div className="event-film-copy">
            <p className="eyebrow">FeirAÇO em movimento</p>
            <h2 id="event-film-title">Um encontro feito para aproximar quem precisa de aço de quem entende do assunto.</h2>
            <p>Veja um pouco da energia do FeirAÇO e prepare-se para uma manhã de produtos, atendimento e novas conexões com o Grupo ABR.</p>
            <a className="button button-primary" href="#inscricao">Quero participar</a>
          </div>
          <div className="event-film-frame">
            <video
              src="/media/feiraco-1080x1350.mp4"
              controls
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Vídeo de apresentação do FeirAÇO Grupo ABR"
            >
              Seu navegador não oferece suporte à reprodução deste vídeo.
            </video>
            <span className="event-film-badge"><strong>03</strong> edição</span>
          </div>
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="container split-layout">
          <div className="section-copy">
            <p className="eyebrow">Uma manhã para estar mais perto</p>
            <h2>O FeirAÇO conecta projetos, pessoas e oportunidades.</h2>
            <p>É o encontro do Grupo ABR com profissionais, empresas e pessoas que constroem, produzem, transformam e movimentam nossa região.</p>
            <p>Uma oportunidade para conhecer soluções, conversar diretamente com nossa equipe e descobrir novos caminhos para sua obra ou negócio.</p>
          </div>
          <div className="photo-composition" aria-label="Espaço reservado para fotografias reais do evento">
            <div className="photo-main"><span>Imagem real da estrutura</span></div>
            <div className="photo-detail"><span>Evento anterior</span></div>
            <div className="date-stamp"><strong>12</strong><span>SET<br />2026</span></div>
          </div>
        </div>
      </section>

      <section className="section benefits">
        <div className="container">
          <p className="eyebrow">Por que participar</p>
          <h2 className="section-title">O que espera por você</h2>
          <div className="benefit-grid">
            {[
              ['01', 'Soluções em aço', 'Produtos e aplicações para construção, serralheria, indústria, comércio e agronegócio.'],
              ['02', 'Atendimento direto', 'Profissionais preparados para entender sua necessidade e orientar suas escolhas.'],
              ['03', 'Oportunidades do evento', 'Novidades, produtos e condições comerciais oficialmente preparadas para o FeirAÇO.'],
              ['04', 'Relacionamento', 'Conheça a estrutura do Grupo ABR e abra espaço para novas possibilidades.'],
            ].map(([number, title, text]) => <article className="benefit-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="section-heading-row"><div><p className="eyebrow">Portfólio Grupo ABR</p><h2>Um universo de aço para quem faz acontecer.</h2></div><p>Encontre soluções para diferentes etapas, estruturas e necessidades.</p></div>
          <div className="product-grid">
            {products.map(([name, description, slug]) => (
              <article className={`product-card product-${slug}`} key={name}>
                <div className="product-overlay" />
                <div><span>Grupo ABR</span><h3>{name}</h3><p>{description}</p><ProductInterestLink interest={name} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="audience-section">
        <div className="container audience-grid">
          <div><p className="eyebrow light">Feito para quem faz</p><h2>Se o aço está no seu projeto, o FeirAÇO é para você.</h2><p>Não importa o tamanho da obra ou do negócio. Esta manhã foi pensada para aproximar soluções de necessidades reais.</p><a className="button button-primary" href="#inscricao">Quero participar</a></div>
          <div className="audience-list">{['Serralheiros', 'Construtores', 'Empreiteiros', 'Indústrias', 'Revendedores', 'Produtores rurais', 'Empresas', 'Quem está construindo ou reformando'].map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</span>)}</div>
        </div>
      </section>

      <section className="section institution">
        <div className="container split-layout reverse">
          <div className="institution-image"><span>Fotografia aérea oficial</span></div>
          <div className="section-copy"><p className="eyebrow">Seu Parceiraço</p><h2>Tradição, estrutura e compromisso com quem faz.</h2><p>Desde 2008, o Grupo ABR fornece soluções em aço, unindo produtos de qualidade, atendimento especializado e agilidade.</p><div className="fact-row"><strong>Desde 2008</strong><span>Estrutura industrial</span><span>Equipe especializada</span></div></div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid"><div><p className="eyebrow">Dúvidas frequentes</p><h2>Tudo o que você precisa saber antes de chegar.</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="final-cta"><div className="container"><p className="eyebrow light">12 de setembro de 2026</p><h2>Nosso próximo grande negócio pode começar com um encontro.</h2><p>Garanta sua participação e receba as informações oficiais do 3º FeirAÇO.</p><a className="button button-primary" href="#inscricao">Garantir minha participação</a></div></section>

      <footer><div className="container footer-grid"><div className="brand"><Image className="brand-logo footer-logo" src="/images/logo-grupo-abr-branca.png" width={473} height={274} alt="Grupo ABR — Seu Parceiraço" /></div><p>3º FeirAÇO<br />12 de setembro de 2026, das 8h às 12h.</p><p>Uma realização<br /><strong>Grupo ABR</strong></p></div></footer>
      <MobileStickyCta />
    </main>
  );
}
