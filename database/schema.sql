CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS feiraco_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  phone_e164 VARCHAR(20) NOT NULL UNIQUE,
  city VARCHAR(100) NOT NULL,
  profile VARCHAR(120),
  interests TEXT[] NOT NULL DEFAULT '{}',
  consent BOOLEAN NOT NULL DEFAULT FALSE,
  consent_at TIMESTAMPTZ,
  status VARCHAR(30) NOT NULL DEFAULT 'registered',
  source VARCHAR(80) NOT NULL DEFAULT 'landing-page',
  utm_source VARCHAR(120),
  utm_medium VARCHAR(120),
  utm_campaign VARCHAR(120),
  utm_content VARCHAR(120),
  utm_term VARCHAR(120),
  referrer TEXT,
  landing_page_url TEXT,
  user_agent TEXT,
  ip_hash VARCHAR(128),
  attendance_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
  attended BOOLEAN NOT NULL DEFAULT FALSE,
  commercial_contact BOOLEAN NOT NULL DEFAULT FALSE,
  quote_requested BOOLEAN NOT NULL DEFAULT FALSE,
  sale_completed BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT
);

CREATE INDEX IF NOT EXISTS feiraco_leads_created_at_idx ON feiraco_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS feiraco_leads_status_idx ON feiraco_leads(status);
CREATE INDEX IF NOT EXISTS feiraco_leads_city_idx ON feiraco_leads(city);
CREATE INDEX IF NOT EXISTS feiraco_leads_utm_source_idx ON feiraco_leads(utm_source);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS feiraco_leads_set_updated_at ON feiraco_leads;
CREATE TRIGGER feiraco_leads_set_updated_at
BEFORE UPDATE ON feiraco_leads
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
