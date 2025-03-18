# 📧 Email Automation with Google Sheets & Gmail  
This project automates email campaigns using **Google Sheets, Gmail, and Google Apps Script**, helping users send, track, and manage emails efficiently.  

---

## 🚀 Features  
✅ **Automated Email Sending** – Sends personalized emails via Gmail.  
✅ **Open Tracking** – Detects when recipients open emails using a tracking pixel.  
✅ **Reply Detection** – Updates Google Sheets when a recipient replies.  
✅ **Funnel Stage Management** – Tracks leads in Sent (L1), Opened (L2), and Replied (L3) stages.  
✅ **Google Sheets Dashboard** – Displays real-time campaign insights.  

---

## 🔍 How It Works  
1. **Google Sheets stores recipient details** (Name, Email, Status, Funnel Stage).  
2. **Google Apps Script sends emails** via Gmail with an embedded tracking pixel.  
3. **Tracking Pixel (PHP)** logs when an email is opened.  
4. **Reply Detection (Gmail Filter)** updates the sheet when a recipient responds.  
5. **Google Sheets automatically updates** all engagement data.  

---

## 📂 Project Files  
- **`Code.gs`** – Google Apps Script for sending emails & tracking responses.  
- **`track.php`** – PHP script for logging email opens.  
- **`README.md`** – Setup guide and documentation.  

---

## 🔧 Setup Instructions  
### **1️⃣ Google Sheets Setup**  
1. Create a **Google Sheet** named `"Campaign Data"` with columns:  
   - `A1: Client Name`  
   - `B1: Email Address`  
   - `C1: Email Status` (Sent, Opened, Replied)  
   - `D1: Funnel Stage` (L1, L2, L3)  

---

### **2️⃣ Google Apps Script Setup**  
1. Open **Google Sheets** → Click **Extensions** → **Apps Script**.  
2. Delete any existing code and **paste `Code.gs`** from this repository.  
3. Click **Run ▶ `sendEmails`** to test email sending.  
4. **Grant permissions** when prompted.  

---

### **3️⃣ Automate the Script (Triggers)**  
1. In **Apps Script**, go to **Triggers (Clock Icon)**.  
2. Add these triggers:  
   - `sendEmails` → **Time-driven** → **Every day at 9 AM**  
   - `updateOpenedEmails` → **Time-driven** → **Every 6 hours**  
   - `checkEmailReplies` → **Time-driven** → **Every 6 hours**  
3. Click **Save** ✅  

---

### **4️⃣ Email Open Tracking (Server Setup)**  
📌 **Host `track.php` on a server** (e.g., a free hosting service).  
1. Upload `track.php` to your server.  
2. Update `Code.gs` with your tracking pixel URL:  
   ```js
   var trackingURL = "http://localhost:8888/email-tracking/track.php?email=";//Replace with your actual server URL 



#OUTPUT
<img width="1694" alt="Excel" src="https://github.com/user-attachments/assets/83e1e09c-d9e2-4228-a01b-2e0fd751df55" />

<img width="1688" alt="Dashboard" src="https://github.com/user-attachments/assets/df47731c-a3a9-4436-8391-666c391ecdaa" />


