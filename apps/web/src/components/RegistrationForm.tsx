'use client';

import { FormEvent, useEffect, useState } from 'react';
import { event as eventConfig } from '@/config/event';
import { TurnstileField } from './TurnstileField';

const profiles = [
  'Estou construindo ou reformando',
  'Serralheiro ou profissional autônomo',
  'Construtora ou empreiteira',
  'Indústria',
  'Loja ou revenda',
  'Produtor rural',
  'Outro',
];

const interestsList = [
  'Telhas', 'Bobinas', 'Tubos e metalons', 'Perfis',
  'Quero conhecer as oportunidades',
];

type Step = 'basic' | 'qualification' | 'success';

export function RegistrationForm() {
  const [step, setStep] = useState<Step>('basic');
  const [leadId, setLeadId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [turnstileToken, setTurnstileToken] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? '';

  const [campaign, setCampaign] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setCampaign({
      utmSource: params.get('utm_source'),
      utmMedium: params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign'),
      utmContent: params.get('utm_content'),
      utmTerm: params.get('utm_term'),
    });
  }, []);

  useEffect(() => {
    const savedInterest = sessionStorage.getItem('feiraco:selected-interest');
    if (savedInterest && interestsList.includes(savedInterest)) setInterests([savedInterest]);

    function selectInterest(event: Event) {
      const interest = (event as CustomEvent<string>).detail;
      if (interestsList.includes(interest)) {
        setInterests((current) => current.includes(interest) ? current : [...current, interest]);
      }
    }

    window.addEventListener('feiraco:select-interest', selectInterest);
    return () => window.removeEventListener('feiraco:select-interest', selectInterest);
  }, []);

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  async function shareEvent() {
    const shareData = {
      title: eventConfig.name,
      text: `Vou participar do ${eventConfig.name} no dia ${eventConfig.dateLabel}.`,
      url: window.location.origin,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // O usuário pode cancelar o compartilhamento sem que isso seja um erro.
      }
      return;
    }
    await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
    setMessage('Convite copiado. Agora é só enviar para quem você quiser.');
  }

  function downloadCalendar() {
    const content = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Grupo ABR//FeirACO//PT-BR',
      'BEGIN:VEVENT',
      `DTSTART;TZID=America/Sao_Paulo:${eventConfig.dateISO.replaceAll('-', '')}T${eventConfig.startTime.replace(':', '')}00`,
      `DTEND;TZID=America/Sao_Paulo:${eventConfig.dateISO.replaceAll('-', '')}T${eventConfig.endTime.replace(':', '')}00`,
      `SUMMARY:${eventConfig.name}`,
      'DESCRIPTION:Evento presencial do Grupo ABR. A localização será comunicada após a confirmação oficial.',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = '3-feiraco-grupo-abr.ics';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function submitBasic(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch(`${apiUrl}/api/v1/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          phone: form.get('phone'),
          city: form.get('city'),
          consent: form.get('consent') === 'on',
          honeypot: form.get('company'),
          source: 'landing-page',
          ...campaign,
          referrer: document.referrer || null,
          landingPageUrl: window.location.href,
          turnstileToken: turnstileToken || undefined,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message ?? 'Não foi possível concluir o cadastro.');
      setLeadId(result.leadId);
      setStep('qualification');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível concluir o cadastro.');
    } finally {
      setLoading(false);
    }
  }

  async function submitQualification() {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${apiUrl}/api/v1/leads/${leadId}/qualification`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: profile || undefined, interests }),
      });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message ?? 'Não foi possível salvar as preferências.');
      }
      setStep('success');
      sessionStorage.removeItem('feiraco:selected-interest');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível salvar as preferências.');
    } finally {
      setLoading(false);
    }
  }

  function toggleInterest(value: string) {
    setInterests((current) => current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]);
  }

  if (step === 'success') {
    return (
      <div className="form-success" aria-live="polite">
        <span className="success-mark">✓</span>
        <p className="eyebrow">Inscrição registrada</p>
        <h3>Sua presença já entrou no radar</h3>
        <p>Salve a data: sábado, 12 de setembro, das 8h às 12h.</p>
        <p><strong>Local:</strong> {eventConfig.location}, {eventConfig.address}.</p>
        {message && <p className="form-note" role="status">{message}</p>}
        <div className="success-actions">
          {whatsappNumber
            ? <a className="button button-primary" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Acabei de me cadastrar para participar do 3º FeirAço Grupo ABR, no dia 12 de setembro. Gostaria de receber mais informações sobre o evento.')}`} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
            : <span className="form-note">O canal de WhatsApp será disponibilizado em breve.</span>}
          <button className="button button-ghost" type="button" onClick={downloadCalendar}>Adicionar ao calendário</button>
          <button className="button button-ghost" type="button" onClick={shareEvent}>Convidar alguém</button>
          <a className="text-button" href="#sobre">Voltar ao site</a>
        </div>
      </div>
    );
  }

  if (step === 'qualification') {
    return (
      <div className="qualification" aria-live="polite">
        <p className="eyebrow">Etapa opcional</p>
        <h3>O que você procura no FeirAço?</h3>
        <p>Essas respostas ajudam nossa equipe a preparar um atendimento mais relevante.</p>
        <label className="field-label" htmlFor="profile">Qual é o seu perfil?</label>
        <select id="profile" value={profile} onChange={(event) => setProfile(event.target.value)}>
          <option value="">Selecione uma opção</option>
          {profiles.map((item) => <option key={item}>{item}</option>)}
        </select>
        <span className="field-label">Produtos de interesse</span>
        <div className="choice-grid">
          {interestsList.map((item) => (
            <button key={item} type="button" className={interests.includes(item) ? 'choice active' : 'choice'} onClick={() => toggleInterest(item)}>{item}</button>
          ))}
        </div>
        {message && <p className="form-error">{message}</p>}
        <div className="form-buttons">
          <button className="button button-primary" type="button" disabled={loading} onClick={submitQualification}>{loading ? 'Salvando...' : 'Concluir inscrição'}</button>
          <button className="text-button" type="button" onClick={() => { sessionStorage.removeItem('feiraco:selected-interest'); setStep('success'); }}>Responder depois</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submitBasic} className="registration-form">
      <div className="form-heading">
        <p className="eyebrow">Inscrição gratuita</p>
        <h2>Garanta seu acesso ao 3º FeirAço</h2>
        <p>Receba novidades, localização e lembretes diretamente no WhatsApp.</p>
      </div>
      <div className="fields-grid">
        <label>
          <span>Nome</span>
          <input name="name" autoComplete="name" placeholder="Como podemos chamar você?" required minLength={2} />
        </label>
        <label>
          <span>WhatsApp</span>
          <input name="phone" autoComplete="tel" inputMode="tel" placeholder="(00) 00000-0000" required minLength={14} maxLength={15} onInput={(event) => { event.currentTarget.value = formatPhone(event.currentTarget.value); }} />
        </label>
        <label>
          <span>Cidade</span>
          <input name="city" autoComplete="address-level2" placeholder="Em qual cidade você está?" required minLength={2} />
        </label>
      </div>
      <label className="honeypot" aria-hidden="true">Empresa<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <TurnstileField onToken={setTurnstileToken} />
      <label className="consent"><input type="checkbox" name="consent" required /><span>Concordo em receber informações do Grupo ABR pelo WhatsApp. Posso cancelar a qualquer momento. Consulte a <a href="/privacidade" target="_blank">Política de Privacidade</a>.</span></label>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button className="button button-primary button-wide" type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Quero participar do FeirAço'}</button>
      <small>Cadastro rápido. Leva menos de 30 segundos.</small>
    </form>
  );
}
