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


const spreadsheetId = process.env.NEXT_PUBLIC_SUBSCRIBE_SPREADSHEET_ID;



export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        try {
            // Current date in Kolkata timezone
            const kolkataTime = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            const [datePart] = kolkataTime.split(',');
            const formattedDate = datePart.trim();

            // const sheets = await authenticate();

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
                            email,
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
                            email,
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
                to: [process.env.NEXT_PUBLIC_RECIPENT_EMAIL_ADDRESS_SUBSCRIBE],
                subject: `New Request Quotation – Kesar Petroproducts Ltd.`,
                html: `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px 0;">
    <h2 style="color: #000; font-size: 18px; margin-bottom: 5px;">
      New Newsletter Subscription – Kesar Petroproducts Ltd.
    </h2>
    <hr>
    <p style="font-size: 14px;">
      A user has subscribed to your newsletter on your website:
    </p>
    <ul>
      <li><strong>Date:</strong> ${formattedDate}</li>
      <li><strong>Email:</strong> ${email}</li>
    </ul>
    <hr />
    <p>Regards,</p>
    <p><b>Automated Subscription System</b></p>
    <p style="font-size: 0.8rem; color: #555;">
      This is an automated email. Please do not reply.
    </p>
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
