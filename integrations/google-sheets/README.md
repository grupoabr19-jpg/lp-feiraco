# Sincronização de leads com o Google Sheets

Planilha de destino:

`https://docs.google.com/spreadsheets/d/1Qdi5ISO5LXt1M9PRk4m2holWZEBNlyeYaH1b_-jjDHA/edit`

## Configuração

1. Na VM, mantenha `LEADS_EXPORT_TOKEN` no `.env` da API com uma chave longa e
   aleatória.
2. Na planilha, abra **Extensões > Apps Script** e cole o conteúdo de `Code.gs`.
3. Em **Configurações do projeto > Propriedades do script**, adicione:
   - `FEIRACO_API_URL`: `https://api-lp.grupoabr.com.br`.
   - `LEADS_EXPORT_TOKEN`: a mesma chave configurada na VM.
4. No editor do Apps Script, execute `syncLeads` uma vez e autorize o acesso.
5. Execute `createScheduledTriggers` uma vez para atualizar a planilha
   automaticamente a cada cinco minutos.

O script preserva as linhas existentes e atualiza ou adiciona leads pelo ID,
sem criar duplicidades nem apagar o histórico da planilha.

## Looker Studio

Use a aba `Leads` como fonte e mantenha a primeira linha como cabeçalho. Para
relatórios compartilhados, evite expor os campos `Nome` e `WhatsApp`.
