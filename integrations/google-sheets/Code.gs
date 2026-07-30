const SPREADSHEET_ID = '1wDpQCail3W3f8rFwq1zFNw4XgZ7-gnDXOwacHrDX-TY';
const SHEET_NAME = 'Leads';

function syncLeads() {
  const properties = PropertiesService.getScriptProperties();
  const apiUrl = properties.getProperty('FEIRACO_API_URL');
  const token = properties.getProperty('LEADS_EXPORT_TOKEN');

  if (!apiUrl || !token) {
    throw new Error('Configure FEIRACO_API_URL e LEADS_EXPORT_TOKEN nas propriedades do script.');
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
  if (existingRows > 0) {
    sheet.getRange(2, 1, existingRows, 23).clearContent();
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, 23).setValues(rows);
  }

  properties.setProperty('LAST_SUCCESSFUL_SYNC', new Date().toISOString());
}

function createScheduledTriggers() {
  ScriptApp.getProjectTriggers()
    .filter((trigger) => trigger.getHandlerFunction() === 'syncLeads')
    .forEach((trigger) => ScriptApp.deleteTrigger(trigger));

  [8, 12, 15, 17].forEach((hour) => {
    ScriptApp.newTrigger('syncLeads')
      .timeBased()
      .atHour(hour)
      .nearMinute(0)
      .everyDays(1)
      .inTimezone('America/Sao_Paulo')
      .create();
  });
}

function toDate(value) {
  return value ? new Date(value) : '';
}
