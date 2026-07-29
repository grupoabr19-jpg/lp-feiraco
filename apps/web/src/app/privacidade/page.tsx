import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | 3º FeirAÇO Grupo ABR',
  description: 'Como os dados da inscrição do 3º FeirAÇO Grupo ABR são tratados.',
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="container">
        <article className="legal-card">
          <p className="eyebrow">Privacidade e transparência</p>
          <h1>Política de Privacidade</h1>
          <p>Esta política descreve o tratamento dos dados enviados na inscrição para o 3º FeirAÇO Grupo ABR.</p>

          <h2>Dados coletados</h2>
          <p>Coletamos nome, WhatsApp, cidade, consentimento, perfil e interesses opcionais, além de dados técnicos e de campanha necessários para segurança e medição da inscrição.</p>

          <h2>Finalidades</h2>
          <p>Os dados são utilizados para registrar a participação, enviar informações e lembretes do evento, preparar o atendimento e entender a origem das inscrições. O endereço IP não é armazenado em formato puro.</p>

          <h2>Compartilhamento e conservação</h2>
          <p>Os dados são tratados pelo Grupo ABR e por fornecedores técnicos necessários à operação da campanha. Eles serão mantidos pelo período compatível com essas finalidades e com as obrigações legais aplicáveis.</p>

          <h2>Seus direitos</h2>
          <p>Você pode solicitar confirmação do tratamento, acesso, correção ou exclusão dos seus dados e retirar o consentimento. Entre em contato pelo e-mail <a href="mailto:grupoabr@grupoabr.com.br">grupoabr@grupoabr.com.br</a> ou pelos telefones <a href="tel:+553530429920">(35) 3042-9920</a> e <a href="tel:+553534313054">(35) 3431-3054</a>.</p>

          <h2>Documentos oficiais</h2>
          <ul>
            <li><a href="https://grupoabr.com.br/wp-content/uploads/2022/05/Politica-de-privacidade.pdf" target="_blank" rel="noreferrer">Política de Privacidade e Proteção de Dados</a></li>
            <li><a href="https://grupoabr.com.br/wp-content/uploads/2022/05/Politica-de-cookies.pdf" target="_blank" rel="noreferrer">Política de Cookies</a></li>
            <li><a href="https://grupoabr.com.br/wp-content/uploads/2022/05/Politica-de-tratamento-de-dados-pessoais.pdf" target="_blank" rel="noreferrer">Política de Tratamento de Dados Pessoais</a></li>
          </ul>

          <p><strong>Última atualização desta página:</strong> 29 de julho de 2026.</p>
          <a className="button button-primary" href="/">Voltar para o evento</a>
        </article>
      </div>
    </main>
  );
}
