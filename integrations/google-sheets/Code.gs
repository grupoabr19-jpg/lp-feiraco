const SPREADSHEET_ID = '1Qdi5ISO5LXt1M9PRk4m2holWZEBNlyeYaH1b_-jjDHA';
const SHEET_NAME = 'Leads';
const DEFAULT_API_URL = 'https://feiraco-api.onrender.com';

function syncLeads() {
  const properties = PropertiesService.getScriptProperties();
  const apiUrl = properties.getProperty('FEIRACO_API_URL') || DEFAULT_API_URL;
  const token = properties.getProperty('LEADS_EXPORT_TOKEN');

  if (!token) {
    throw new Error('Configure LEADS_EXPORT_TOKEN nas propriedades do script.');
  }

  const response = UrlFetchApp.fetch(
    `${apiUrl.replace(/\/$/, '')}/api/v1/admin/leads/export`,
    {
      method: 'get',
      headers: { Authorization: `Bearer ${token}` },
      muteHttpExceptions: true,
    },
  );

  if (response.getResponseCode() !== 200) {
    throw new Error(`A API respondeu ${response.getResponseCode()}: ${response.getContentText()}`);
  }

  const payload = JSON.parse(response.getContentText());
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error(`A aba "${SHEET_NAME}" não foi encontrada.`);
  }

  const rows = payload.leads.map((lead) => [
    lead.public_id,
    toDate(lead.created_at),
    toDate(lead.updated_at),
    lead.name,
    lead.phone,
    lead.city,
    lead.profile || '',
    (lead.interests || []).join(', '),
    lead.status,
    lead.source,
    lead.utm_source || '',
    lead.utm_medium || '',
    lead.utm_campaign || '',
    lead.utm_content || '',
    lead.utm_term || '',
    lead.consent ? 'Sim' : 'Não',
    toDate(lead.consent_at),
    lead.attendance_confirmed ? 'Sim' : 'Não',
    lead.attended ? 'Sim' : 'Não',
    lead.commercial_contact ? 'Sim' : 'Não',
    lead.quote_requested ? 'Sim' : 'Não',
    lead.sale_completed ? 'Sim' : 'Não',
    lead.notes || '',
  ]);

  const existingRows = Math.max(sheet.getLastRow() - 1, 0);
  const mergedById = new Map();

  if (existingRows > 0) {
    sheet.getRange(2, 1, existingRows, 23).getValues().forEach((row) => {
      if (row[0]) mergedById.set(String(row[0]), row);
    });
  }

  rows.forEach((row) => mergedById.set(String(row[0]), row));

  const mergedRows = Array.from(mergedById.values());
  if (existingRows > 0) {
    sheet.getRange(2, 1, existingRows, 23).clearContent();
  }
  if (mergedRows.length > 0) {
    sheet.getRange(2, 1, mergedRows.length, 23).setValues(mergedRows);
  }

  properties.setProperty('LAST_SUCCESSFUL_SYNC', new Date().toISOString());
}

function createScheduledTriggers() {
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === 'syncLeads')
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  ScriptApp.newTrigger('syncLeads')
    .timeBased()
    .everyMinutes(5)
    .create();
}

function toDate(value) {
  return value ? new Date(value) : '';
}
