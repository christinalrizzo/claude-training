// ═══════════════════════════════════════════════════════════════
// Stalled Deal Pinger — Training Leaderboard
// Google Apps Script Web App
//
// DEPLOY INSTRUCTIONS:
// 1. Open your Google Sheet (ID: 1rSbzHi2DynM3N35LX-nCgRcACa0hieZFeiUsIeGkvqY)
// 2. Extensions → Apps Script
// 3. Delete any existing code and paste this entire file
// 4. Click Save (floppy disk icon)
// 5. Click Deploy → New deployment
// 6. Type: Web app
// 7. Execute as: Me
// 8. Who has access: Anyone
// 9. Click Deploy → copy the Web app URL
// 10. Paste the URL into the training HTML file where it says APPS_SCRIPT_URL
// ═══════════════════════════════════════════════════════════════

const SHEET_ID = '1rSbzHi2DynM3N35LX-nCgRcACa0hieZFeiUsIeGkvqY';

function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Email', 'Name', 'Progress', 'Checks', 'Total', 'LastActive']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  }
}

// ─── POST: save or update a user's progress ───
function doPost(e) {
  try {
    const sheet = getSheet();
    ensureHeaders(sheet);

    const data = JSON.parse(e.postData.contents);
    const name = data.email
      .split('@')[0]
      .split('.')
      .map(n => n.charAt(0).toUpperCase() + n.slice(1))
      .join(' ');
    const now = new Date().toLocaleString('en-US', {
      timeZone: 'America/Denver',
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    });

    // Find existing row for this email
    const values = sheet.getDataRange().getValues();
    let rowIndex = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === data.email) { rowIndex = i + 1; break; }
    }

    const row = [data.email, name, data.progress, data.checks, data.total, now];
    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 1, 1, 6).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── GET: return all rows for leaderboard display ───
function doGet(e) {
  try {
    const sheet = getSheet();
    const values = sheet.getDataRange().getValues();

    if (values.length <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const rows = values.slice(1).map(row => ({
      email:      row[0],
      name:       row[1],
      progress:   Number(row[2]) || 0,
      checks:     Number(row[3]) || 0,
      total:      Number(row[4]) || 0,
      lastActive: row[5]
    }));

    // Sort: 100% first, then by progress descending
    rows.sort((a, b) => b.progress - a.progress);

    return ContentService
      .createTextOutput(JSON.stringify(rows))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
