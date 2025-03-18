//  Send Emails with Tracking Pixel
function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Campaign Data");
  if (!sheet) {
    Logger.log("Error: Sheet 'Campaign Data' not found!");
    return;
  }

  var data = sheet.getDataRange().getValues();
  var trackingURL = "http://localhost:8888/email-tracking/track.php?email="; // Updated with your local server URL
  
  for (var i = 1; i < data.length; i++) {
    var email = data[i][1];  // Email Address (Column B)
    var status = data[i][2]; // Email Status (Column C)

    if (status === "" || status === "Pending") {
      var subject = "Follow-up: Our Offer for You";
      var message = "Hello " + data[i][0] + ",<br><br>";
      message += "I wanted to follow up on my previous email. Let me know if you're interested!<br><br>";
      message += `<img src="${trackingURL}${encodeURIComponent(email)}" width="1" height="1">`; // Tracking pixel

      try {
        MailApp.sendEmail({
          to: email,
          subject: subject,
          htmlBody: message
        });

        sheet.getRange(i + 1, 3).setValue("Sent"); // Update Email Status (C)
        sheet.getRange(i + 1, 4).setValue("L1");   // Update Funnel Stage (D)
      } catch (error) {
        Logger.log("Failed to send email to: " + email);
      }
    }
  }
}

//  Update Google Sheets When Emails Are Opened
function updateOpenedEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Campaign Data");
  if (!sheet) {
    Logger.log("Error: Sheet 'Campaign Data' not found!");
    return;
  }

  var logFileURL = "http://localhost:8888/email-tracking/opened_emails.log"; // Updated with your local server URL
  var response = UrlFetchApp.fetch(logFileURL);
  var openedEmails = response.getContentText().split("\n");

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var email = data[i][1];

    if (openedEmails.includes(email) && data[i][2] !== "Replied") {
      sheet.getRange(i + 1, 3).setValue("Opened"); // Update Email Status to "Opened"
      sheet.getRange(i + 1, 4).setValue("L2");     // Move to Funnel Stage L2
    }
  }
}

//  Update Google Sheets When Replies Are Detected
function checkEmailReplies() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Campaign Data");
  if (!sheet) {
    Logger.log("Error: Sheet 'Campaign Data' not found!");
    return;
  }

  var data = sheet.getDataRange().getValues();
  var threads = GmailApp.search('label:Replied');
  var messages = GmailApp.getMessagesForThreads(threads);

  for (var i = 0; i < messages.length; i++) {
    var email = messages[i][0].getFrom().match(/<(.+?)>/)[1];

    for (var j = 1; j < data.length; j++) {
      if (data[j][1] === email) {
        sheet.getRange(j + 1, 3).setValue("Replied"); // Update Email Status
        sheet.getRange(j + 1, 4).setValue("L3");      // Move to Funnel Stage L3
      }
    }
  }
}
