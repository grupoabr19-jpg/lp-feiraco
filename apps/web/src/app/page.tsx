import Image from 'next/image';
import { RegistrationForm } from '@/components/RegistrationForm';
import { MobileStickyCta } from '@/components/MobileStickyCta';
import { ProductInterestLink } from '@/components/ProductInterestLink';
import { ViewportVideo } from '@/components/ViewportVideo';
import { event } from '@/config/event';

const products = [
  ['Telhas', 'Coberturas para diferentes projetos e necessidades.', 'telhas'],
  ['Bobininhas', 'Matéria-prima versátil para diferentes processos e aplicações.', 'bobinas'],
  ['Tubos e metalons', 'Soluções versáteis para estruturas e serralheria.', 'tubos'],
  ['Perfis', 'Resistência e precisão para projetos estruturais.', 'perfis'],
];

const faqs = [
  ['Onde acontecerá o FeirAço?', `Na sede do ${event.location}: ${event.address}.`],
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
            <div className="edition-chip"><span>3º</span> FeirAço Grupo ABR</div>
            <h1>O Aço que estrutura seus projetos. <em>Oportunidades que aproximam negócios</em></h1>
            <p>No dia 12 de setembro, o Grupo ABR abre as portas para uma manhã de produtos, atendimento especializado e novas conexões.</p>
            <div className="event-data">
              <div><small>Quando</small><strong>{event.dateLabel}</strong></div>
              <div><small>Horário</small><strong>Das 8h às 12h</strong></div>
              <div><small>Onde</small><strong>{event.location}</strong><span className="event-address">{event.address}</span></div>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#inscricao">Garantir minha participação</a>
              <a className="button button-outline" href="#sobre">Conhecer o evento</a>
            </div>
          </div>
          <aside className="hero-edition-art" aria-label="Terceira edição do FeirAço">
            <Image
              src="/images/terceira-edicao.png"
              alt=""
              width={649}
              height={961}
              priority
            />
            <strong>Terceira edição</strong>
          </aside>
        </div>
      </section>

      <section className="registration-shell" id="inscricao">
        <div className="container"><RegistrationForm /></div>
      </section>

      <section className="section event-film" aria-labelledby="event-film-title">
        <div className="container event-film-grid">
          <div className="event-film-copy">
            <p className="eyebrow">FeirAço em movimento</p>
            <h2 id="event-film-title">Um encontro criado para conectar quem busca soluções em aço com quem realmente entende do assunto!</h2>
            <p>Veja um pouco da energia do FeirAço e prepare-se para uma manhã de produtos, atendimento e novas conexões com o Grupo ABR.</p>
            <a className="button button-primary" href="#inscricao">Quero participar</a>
          </div>
          <div className="event-film-frame">
            <ViewportVideo />
            <span className="event-film-badge"><strong>03</strong> edição</span>
          </div>
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="container split-layout">
          <div className="section-copy">
            <p className="eyebrow">Uma manhã para estar mais perto</p>
            <h2>O FeirAço conecta projetos, pessoas e oportunidades</h2>
            <p>É o encontro do Grupo ABR com profissionais, empresas e pessoas que constroem, produzem, transformam e movimentam nossa região.</p>
            <p>Uma oportunidade para conhecer soluções, conversar diretamente com nossa equipe e descobrir novos caminhos para sua obra ou negócio.</p>
          </div>
          <div className="photo-composition" aria-label="Fotografias do Grupo ABR e do FeirAço">
            <div className="photo-main">
              <Image
                src="/images/estrutura-oficial.webp"
                alt="Estoque de tubos e perfis na estrutura do Grupo ABR"
                fill
                sizes="(max-width: 980px) 100vw, 55vw"
              />
            </div>
            <div className="photo-detail">
              <Image
                src="/images/evento-anterior-oficial.webp"
                alt="Equipe do Grupo ABR atendendo visitantes em uma edição anterior do FeirAço"
                fill
                sizes="(max-width: 620px) 62vw, 26vw"
              />
            </div>
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
              ['02', 'Atendimento Humanizado', 'Profissionais preparados para entender sua necessidade e orientar suas escolhas.'],
              ['04', 'Relacionamento', 'Conheça a estrutura do Grupo ABR e abra espaço para novas possibilidades.'],
            ].map(([number, title, text]) => <article className="benefit-card" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section social-impact" aria-labelledby="social-impact-title">
        <div className="container social-impact-grid">
          <div className="social-impact-image">
            <Image
              src="/media/Abertura_do_texto_alimentos.jpg"
              alt="Mãos reunindo alimentos não perecíveis em uma caixa de doação"
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
            />
            <span><strong>1 kg</strong> de alimento</span>
          </div>
          <div className="social-impact-copy">
            <p className="eyebrow">Aço social Grupo ABR</p>
            <h2 id="social-impact-title">Um pequeno gesto pode colocar esperança à mesa</h2>
            <p>O FeirAço também é sobre construir uma comunidade mais forte. Por isso, convidamos cada participante a trazer <strong>1 kg de alimento não perecível</strong>.</p>
            <p>Cada doação será destinada a uma família ou entidade que precise. Quando muitas mãos se unem, um gesto simples se transforma em acolhimento, cuidado e dignidade.</p>
            <a className="button button-primary" href="#inscricao">Quero fazer parte dessa corrente</a>
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="section-heading-row"><div><p className="eyebrow">Portfólio Grupo ABR</p><h2>Um universo de aço para quem faz acontecer</h2></div><p>Encontre soluções para diferentes etapas, estruturas e necessidades.</p></div>
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
          <div><p className="eyebrow light">Feito para quem faz</p><h2>Se o aço está no seu projeto, o FeirAço é para você</h2><p>Não importa o tamanho da obra ou do negócio. Esta manhã foi pensada para aproximar soluções de necessidades reais.</p><a className="button button-primary" href="#inscricao">Quero participar</a></div>
          <div className="audience-list">{[
            ['01', 'Serralheiros'],
            ['02', 'Construtores'],
            ['03', 'Empreiteiros'],
            ['04', 'Produtores rurais'],
            ['05', 'Estruturistas'],
            ['06', 'Quem está construindo ou reformando'],
          ].map(([number, item]) => <span key={number}><b>{number}</b>{item}</span>)}</div>
        </div>
      </section>

      <section className="section institution">
        <div className="container split-layout reverse">
          <div className="institution-image">
            <Image
              src="/images/foto-aerea-oficial.webp"
              alt="Vista aérea da estrutura do Grupo ABR"
              fill
              sizes="(max-width: 980px) 100vw, 55vw"
            />
          </div>
          <div className="section-copy"><p className="eyebrow">Seu Parceiraço</p><h2>Tradição, estrutura e compromisso com quem faz</h2><p>Desde 2008, o Grupo ABR fornece soluções em aço, unindo produtos de qualidade, atendimento especializado e agilidade.</p><div className="fact-row"><strong>Desde 2008</strong><span>Estrutura industrial</span><span>Equipe especializada</span></div></div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid"><div><p className="eyebrow">Dúvidas frequentes</p><h2>Tudo o que você precisa saber antes de chegar</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="final-cta"><div className="container"><p className="eyebrow light">12 de setembro de 2026</p><h2>Nosso próximo grande negócio pode começar com um encontro</h2><a className="button button-primary" href="#inscricao">Garantir minha participação</a></div></section>

      <footer>
        <div className="container footer-grid">
          <div className="brand"><Image className="brand-logo footer-logo" src="/images/logo-grupo-abr-branca.png" width={473} height={274} alt="Grupo ABR — Seu Parceiraço" /></div>
          <p>3º FeirAço<br />12 de setembro de 2026, das 8h às 12h.</p>
          <div className="footer-contact">
            <a href="mailto:grupoabr@grupoabr.com.br">grupoabr@grupoabr.com.br</a>
            <span>(35) 3042-9920 | (35) 3431-3054</span>
            <a href="/privacidade">Privacidade e proteção de dados</a>
          </div>
        </div>
      </footer>
      <MobileStickyCta />
    </main>
  );
}
