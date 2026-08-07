# Sincronização de leads com o Google Sheets

Planilha de destino:

`https://docs.google.com/spreadsheets/d/1Qdi5ISO5LXt1M9PRk4m2holWZEBNlyeYaH1b_-jjDHA/edit`

Aba de destino: `Leads`.

## Ativação

1. Na planilha, abra **Extensões > Apps Script**.
2. Substitua o conteúdo do editor pelo arquivo `Code.gs` desta pasta.
3. Em **Configurações do projeto > Propriedades do script**, configure:
   - `FEIRACO_API_URL`: `https://feiraco-api.onrender.com` (opcional; este já é o padrão do script).
   - `LEADS_EXPORT_TOKEN`: o mesmo token configurado na API do Render.
4. Execute `syncLeads` uma vez e autorize o acesso.
5. Execute `createScheduledTriggers` uma vez para atualizar a planilha a cada cinco minutos.

O script preserva as linhas existentes e atualiza ou adiciona leads pelo ID,
sem criar duplicidades nem apagar o histórico.
