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
          <p>Você pode solicitar confirmação do tratamento, acesso, correção ou exclusão dos seus dados e retirar o consentimento. O canal oficial para essas solicitações será informado junto aos dados de contato definitivos da campanha.</p>

          <p><strong>Última atualização:</strong> 28 de julho de 2026.</p>
          <a className="button button-primary" href="/">Voltar para o evento</a>
        </article>
      </div>
    </main>
  );
}
