# Salesforce + Claude — Pelago Health Training

Training modules and resources for the Salesforce + Claude integration at Pelago Health.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Hub page — links to all training modules and resources |
| `sfdc-training.html` | Full training module covering all roles (Client Services, Sales, RevOps, etc.) |
| `Stalled-Deal-Pinger-Training.html` | Focused module on connecting Salesforce and using the Stalled Deal Pinger |
| `Salesforce-MCP-Setup-Walkthrough.html` | Step-by-step connection setup guide |
| `SFDC-MCP-Options-Comparison.html` | Background on the integration approach |

## Leaderboard Setup

The Stalled Deal Pinger training module includes a live leaderboard backed by Google Sheets. To activate it:

1. Open the Google Sheet → **Extensions → Apps Script**
2. Paste the contents of `leaderboard-apps-script.gs`
3. **Deploy → New deployment** → Type: Web app → Execute as: Me → Who has access: Anyone
4. Copy the web app URL and paste it into `Stalled-Deal-Pinger-Training.html` where it says `APPS_SCRIPT_URL`

The Sheet ID (`1rSbzHi2DynM3N35LX-nCgRcACa0hieZFeiUsIeGkvqY`) is already wired into both the HTML and the Apps Script.

## Support

Questions? Contact [christina.rizzo@pelagohealth.com](mailto:christina.rizzo@pelagohealth.com)
