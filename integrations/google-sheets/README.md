# Sincronização de leads com o Google Sheets

Planilha de destino:

`https://docs.google.com/spreadsheets/d/1wDpQCail3W3f8rFwq1zFNw4XgZ7-gnDXOwacHrDX-TY/edit`

## Configuração

1. No Render, configure `LEADS_EXPORT_TOKEN` no serviço `feiraco-api` com uma
   chave longa e aleatória e faça um novo deploy.
2. Na planilha, abra **Extensões > Apps Script** e cole o conteúdo de `Code.gs`.
3. Em **Configurações do projeto > Propriedades do script**, adicione:
   - `FEIRACO_API_URL`: URL pública do serviço `feiraco-api`, sem barra final.
   - `LEADS_EXPORT_TOKEN`: a mesma chave configurada no Render.
4. No editor do Apps Script, execute `syncLeads` uma vez e autorize o acesso.
5. Execute `createScheduledTriggers` uma vez para atualizar a planilha
   automaticamente a cada cinco minutos.

O script refaz a área de dados a cada sincronização. Assim, atualizações de um
lead já existente aparecem na planilha sem criar linhas duplicadas.

## Looker Studio

Use a aba `Leads` como fonte e mantenha a primeira linha como cabeçalho. Para
relatórios compartilhados, evite expor os campos `Nome` e `WhatsApp`.
