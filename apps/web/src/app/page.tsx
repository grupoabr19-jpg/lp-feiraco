import Image from 'next/image';
import { RegistrationForm } from '@/components/RegistrationForm';
import { MobileStickyCta } from '@/components/MobileStickyCta';
import { ProductInterestLink } from '@/components/ProductInterestLink';
import { ViewportVideo } from '@/components/ViewportVideo';
import { event } from '@/config/event';

const products = [
  ['Telhas', 'Coberturas para diferentes projetos.', 'telhas'],
  ['Bobininhas', 'Matéria-prima para diferentes aplicações.', 'bobinas'],
  ['Tubos e metalons', 'Soluções para estruturas e serralheria.', 'tubos'],
  ['Perfis', 'Resistência para projetos estruturais.', 'perfis'],
];

const faqs = [
  ['Onde acontecerá o FeirAço?', `Na sede do ${event.location}: ${event.address}.`],
  ['Preciso me credenciar?', 'O credenciamento antecipado é recomendado. Ele agiliza sua chegada e permite receber informações e lembretes do evento pelo WhatsApp.'],
  ['A participação é gratuita?', 'Sim. A entrada é gratuita e convidamos cada participante a doar 1 kg de alimento não perecível para a ação social do evento.'],
  ['Posso solicitar orçamento no evento?', 'Sim. Nossa equipe estará disponível para entender sua necessidade e orientar sobre produtos e ofertas.'],
  [
    'Oportunidades especiais em materiais de estoque',
    'O FeirAço terá materiais de estoque com preços diferenciados. Alguns podem apresentar marcas ou pequenas alterações estéticas de armazenamento e movimentação. Condições, características e disponibilidade serão informadas no local.',
  ],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Grupo ABR">
          <Image className="brand-logo" src="/images/logo-grupo-abr-branca.png" width={473} height={274} alt="Grupo ABR — Seu Parceiraço" priority />
        </a>
        <div className="header-date"><strong>12 SET</strong><span>8h às 12h</span></div>
        <a href="#inscricao" className="button button-small">Credenciamento gratuito</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-grid container">
          <div className="hero-content">
            <div className="edition-chip"><span>3º</span> FeirAço Grupo ABR</div>
            <h1>Ofertas exclusivas e válidas <em>somente para participantes do evento</em></h1>
            <p>No dia 12 de setembro, o Grupo ABR abre as portas para uma manhã de ofertas exclusivas.</p>
            <div className="event-data">
              <div><small>Quando</small><strong>{event.dateLabel}</strong></div>
              <div><small>Horário</small><strong>Das 8h às 12h</strong></div>
              <div><small>Onde</small><strong>{event.location}</strong><span className="event-address">{event.address}</span></div>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href="#inscricao">Fazer meu credenciamento</a>
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
            <p className="eyebrow">O sucesso continua</p>
            <h2 id="event-film-title">Duas edições de sucesso. A terceira será ainda melhor.</h2>
            <p>As duas primeiras edições reuniram clientes, parceiros e nossa equipe em torno de bons negócios. Agora, o 3º FeirAço chega com mais ofertas exclusivas e novas oportunidades para quem participar.</p>
            <a className="button button-primary" href="#inscricao">Fazer meu credenciamento</a>
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
            <p className="eyebrow">O 3º FeirAço</p>
            <h2>Uma manhã para aproveitar ofertas e fazer bons negócios</h2>
            <p>Conheça materiais disponíveis, tire dúvidas com nossa equipe e encontre condições válidas somente durante o evento.</p>
            <p>Faça seu credenciamento e venha preparado para aproveitar.</p>
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
          <h2 className="section-title">Motivos para se credenciar</h2>
          <div className="benefit-grid">
            {[
              ['01', 'Ofertas exclusivas', 'Condições especiais em materiais disponíveis no evento.'],
              ['02', 'Atendimento direto', 'Converse com quem entende de aço e encontre a melhor opção.'],
              ['03', 'Novas oportunidades', 'Conheça produtos e negocie diretamente com o Grupo ABR.'],
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
            <h2 id="social-impact-title">Sua participação também faz a diferença</h2>
            <p>Ao participar, traga <strong>1 kg de alimento não perecível</strong>. As doações serão destinadas a famílias ou entidades que precisam.</p>
            <a className="button button-primary" href="#inscricao">Credenciar e participar</a>
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="section-heading-row"><div><p className="eyebrow">Produtos em destaque</p><h2>Encontre o aço que seu projeto precisa</h2></div><p>Confira algumas das linhas que você encontrará no Grupo ABR.</p></div>
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
          <div><p className="eyebrow light">Feito para quem faz</p><h2>Trabalha com aço ou está construindo? Este evento é para você.</h2><p>Credencie-se gratuitamente e aproveite as ofertas do 3º FeirAço.</p><a className="button button-primary" href="#inscricao">Fazer meu credenciamento</a></div>
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
          <div className="section-copy"><p className="eyebrow">Quem realiza</p><h2>A confiança de quem entende de aço desde 2008</h2><p>O Grupo ABR une estrutura, variedade e uma equipe preparada para atender seu projeto.</p><div className="fact-row"><strong>Desde 2008</strong><span>Estrutura industrial</span><span>Equipe especializada</span></div></div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-grid"><div><p className="eyebrow">Dúvidas frequentes</p><h2>Antes de fazer seu credenciamento</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>

      <section className="final-cta"><div className="container"><p className="eyebrow light">12 de setembro de 2026</p><h2>As ofertas são exclusivas para quem estiver no evento</h2><a className="button button-primary" href="#inscricao">Fazer meu credenciamento gratuito</a></div></section>

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
