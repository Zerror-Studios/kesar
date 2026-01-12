import { sheets_v4 } from '@googleapis/sheets';
import nodemailer from 'nodemailer';
import { GoogleAuth } from "google-auth-library";
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = new sheets_v4.Sheets({ auth });


const spreadsheetId = process.env.NEXT_PUBLIC_QUATATION_SPREADSHEET_ID;



export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, products } = req.body;

    if (!email || !name || !phone || !products || products.length === 0) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      // Current date in Kolkata timezone
      const kolkataTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      const [datePart] = kolkataTime.split(',');
      const formattedDate = datePart.trim();


      // Get existing rows
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A:E', // Adjust columns as needed
      });

      const rows = response.data.values || [];

      // Find if email exists
      const emailRow = rows.find(row => row[2] === email);

      if (emailRow) {
        const rowIndex = rows.indexOf(emailRow) + 1;
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `Sheet1!A${rowIndex}:E${rowIndex}`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [[
              formattedDate,
              name,
              email,
              phone,
              products.join(', '), // store products as comma-separated
            ]],
          },
        });
      } else {
        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'Sheet1!A:D',
          valueInputOption: 'RAW',
          requestBody: {
            values: [[
              formattedDate,
              name,
              email,
              phone,
              products.join(', '),
            ]],
          },
        });
      }

      // Send email
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NEXT_PUBLIC_MAIL_EMAIL_ADDRESS,
          pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.NEXT_PUBLIC_MAIL_EMAIL_ADDRESS,
        to: [process.env.NEXT_PUBLIC_RECIPENT_EMAIL_ADDRESS_QUATATION],
        subject: `New Request Quotation – Kesar Petroproducts Ltd.`,
        html: `
       <div class="container" style="font-family: Arial, sans-serif; color: #333; padding: 20px 0;">
<h2 class="color-primary" style="color: #000; font-size: 18px; margin-bottom: 5px;">
  New Request Quotation – Kesar Petroproducts Ltd.
</h2>
<hr style="margin-bottom: 15px;" />
<p style="font-size: 14px; line-height: 1.5;">
  A Request for Quotation has been submitted on your website by the following company:
</p>

  <ul>
    <li><strong>Date:</strong> ${formattedDate}</li>
    <li><strong>Name:</strong> ${name}</li>
    <li><strong>Email:</strong> ${email}</li>
    <li><strong>Phone:</strong> ${phone}</li>
    <li><strong>Products Requested:</strong> ${products.join(', ')}</li>
  </ul>
  <hr />
<p>Regards,</p>
<p><b>Automated Request Form</b></p>
<p style="font-size: 0.8rem; color: #555;">This is a computer-generated email. Please do not reply.</p>

</div>

        `,
      };

      await transport.sendMail(mailOptions);

      res.status(200).json({ message: 'Form submitted successfully' });

    } catch (error) {
      console.error('Submission error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
