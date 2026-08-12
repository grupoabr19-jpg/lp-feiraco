'use client';

import { FormEvent, useEffect, useState } from 'react';
import { event as eventConfig } from '@/config/event';

const profiles = [
  'Cliente final — construindo ou reformando',
  'Profissional — serralheiro',
  'Profissional — construtor ou empreiteiro',
  'Profissional — estruturista',
  'Profissional — revendedor',
  'Profissional — produtor rural',
  'Profissional — indústria',
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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? '';

  const [campaign, setCampaign] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const controller = new AbortController();
    void fetch(`${apiUrl}/api/v1/health`, {
      cache: 'no-store',
      signal: controller.signal,
    }).catch(() => undefined);

    return () => controller.abort();
  }, [apiUrl]);

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

  function addToGoogleCalendar() {
    const compactDate = eventConfig.dateISO.replaceAll('-', '');
    const compactStartTime = eventConfig.startTime.replace(':', '');
    const compactEndTime = eventConfig.endTime.replace(':', '');
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventConfig.name,
      dates: `${compactDate}T${compactStartTime}00/${compactDate}T${compactEndTime}00`,
      ctz: 'America/Sao_Paulo',
      details: `Evento presencial do Grupo ABR.\n\nMais informações: ${window.location.origin}`,
      location: `${eventConfig.location}, ${eventConfig.address}`,
    });
    const calendarUrl = `https://calendar.google.com/calendar/render?${params.toString()}`;
    const calendarWindow = window.open(calendarUrl, '_blank');

    if (calendarWindow) {
      calendarWindow.opener = null;
    } else {
      window.location.assign(calendarUrl);
    }
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
          profile: form.get('profile'),
          consent: form.get('consent') === 'on',
          honeypot: form.get('company'),
          source: 'landing-page',
          ...campaign,
          referrer: document.referrer || null,
          landingPageUrl: window.location.href,
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
        <p className="eyebrow">Credenciamento confirmado</p>
        <h3>Sua presença está confirmada</h3>
        <p>Salve a data: sábado, 12 de setembro, das 8h às 12h.</p>
        <p><strong>Local:</strong> {eventConfig.location}, {eventConfig.address}.</p>
        {message && <p className="form-note" role="status">{message}</p>}
        <div className="success-actions">
          {whatsappNumber
            ? <a className="button button-primary" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Olá! Acabei de me cadastrar para participar do 3º FeirAço Grupo ABR, no dia 12 de setembro. Gostaria de receber mais informações sobre o evento.')}`} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
            : <span className="form-note">O canal de WhatsApp será disponibilizado em breve.</span>}
          <button className="button button-ghost" type="button" onClick={addToGoogleCalendar}>Adicionar ao Google Calendar</button>
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
        <span className="field-label">Produtos de interesse</span>
        <div className="choice-grid">
          {interestsList.map((item) => (
            <button key={item} type="button" className={interests.includes(item) ? 'choice active' : 'choice'} onClick={() => toggleInterest(item)}>{item}</button>
          ))}
        </div>
        {message && <p className="form-error">{message}</p>}
        <div className="form-buttons">
          <button className="button button-primary" type="button" disabled={loading} onClick={submitQualification}>{loading ? 'Salvando...' : 'Concluir credenciamento'}</button>
          <button className="text-button" type="button" onClick={() => { sessionStorage.removeItem('feiraco:selected-interest'); setStep('success'); }}>Responder depois</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submitBasic} className="registration-form">
      <div className="form-heading">
        <p className="eyebrow">Credenciamento gratuito</p>
        <h2>Garanta sua participação no 3º FeirAço</h2>
        <p>Preencha seus dados e receba as informações do evento pelo WhatsApp.</p>
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
        <label>
          <span>Ocupação</span>
          <select name="profile" value={profile} onChange={(event) => setProfile(event.target.value)} required>
            <option value="">Selecione uma opção</option>
            {profiles.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <label className="honeypot" aria-hidden="true">Empresa<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent"><input type="checkbox" name="consent" required /><span>Concordo em receber informações do Grupo ABR pelo WhatsApp. Posso cancelar a qualquer momento. Consulte a <a href="/privacidade" target="_blank">Política de Privacidade</a>.</span></label>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button className="button button-primary button-wide" type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Fazer meu credenciamento'}</button>
      <small>Cadastro rápido. Leva menos de 30 segundos.</small>
    </form>
  );
}
