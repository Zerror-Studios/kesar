import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const spreadsheetId = '1qPGljSSuCEL_rbpts__NeFDfSas8kQjBm0TsMlVPU4c';

async function authenticate() {
  const auth = new JWT({
    email: "zerror-service-email@spartan-thunder-476511-r2.iam.gserviceaccount.com",
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCFq7veMKeJdcCn\nAbaXjT/Yn5JcOBTh4WR1bhCCUGaLOObem9kZ4AbCfeLRbow97WRNnGKwv+6Dm0xs\nmCZgJXpH6GAR1dkUYQfPLcXLnbWE7/bT5nHNlA/Zz2p9k6rcp2c8X9JgsSFyXsnd\nioBlNPA3vzQAjBtO5LFy7tKXk4Lyxwjh3MMtskHJBoiOMo8OJq6r2AnpDD3MBN/K\nJOhpcYD918FY15RJyOPWe6g4aZJqavOFE4U3bMIzDWiBgqsvuzZE9RTK9cWrS0pn\nI6P8HOqzV0wGhorTyiZBPOjcjCBT5hByT+wtBejD3x7IKM98ipIV7AKv0bN6MTHX\nFVsUiIt5AgMBAAECggEANLBHKqMh/rhX+lxeBSnLj08CyW/fp1OJHhKG1l7rtJf2\nxKtIrX7VG0e0ppm9FNHkdgUdD49v7BdETg/BHKfZJcvuRkl1OievBNaFfyeIe8B8\nmfTdScvBXbj4wEv7DuO7eRxKGAvp46OCTV2BE6OExmyLCmYvg274lRWXE+E0vg3t\nVaXmVhXjIQ8ykclEf1mT8rdbp2a7ZdaXChfq2eywADKXbsgzmzXhsfjScML6pVbt\nBzkoUyiewDOfkY3IE5jASwJWbt6l+EPzMRwrvJtJXDUFWqpQ+e0henPGJtL8EvX/\na5fWa8aCJVJ3eOAu0LHJIRmO9gVXzaZ75Opl9qf/0wKBgQC7Xjz8UV8fBV2isNX+\n/dAu0alxoywspEbMLc20ZsKvggyY3v2n7Rt7A5ENbTuQn5PB03Fb+WlLA16+9G8G\nSvAOosBspVXvRBFyKBVEOMy5qgfrD9SlantD7jQrl04KzlNJBcHbSnN9lPCHvPCQ\nfde1P6PRE6USQ56+pGl9NyUrCwKBgQC2ojqUvbDT5qxqKIpZXUsQtrTFwyD8BDrp\n/y7xwPlpXYXIKXcJmO4nBJwkpBIZ8yOOkaMd788w9LREyNNaCi5FT70E2looLm68\nGzVFt3sAyN8aVAuermoZDnMSlGg8vHWLshIuUlKecIPmqYzZzNmzoKCevjyn7BxH\nHUNK6K5WCwKBgAJmD3PPet9Dy1IU33h3OV4QExJAW4VqyPk+MN75Xc6vZIfkeuzW\nbT6i6g1484VDdbnKgi4CQGXUcjcRnAZBmVcmoD4D09jPT0Xd23/XFk/eLGHG/xrr\nBQ72krZoJnie8ZQCvduX1WirKnUiZxYCdmt8mBVKIhfcw8B/DFatCQ3HAoGBAJs6\noh4AaMaCvrLwSD8Si5XmJRod8vAhTE3NBoKWqabDxczOaY3vvSPOyERga75AqU0p\nPgJY7LrIklwQcYuLMa7ZymfQi2axqI8bdRkPjW2qTe6b1tCFoEoxvN7i4wIUkLgu\nn0Nd1zkxmvq3y67nbXY+paanPPjhN1u+ZI7L3DnnAoGAH1ZGXtmPWHKpsIgLIWpu\nVL0aJ3N2KxbV4kQ0sYoBThSxS1mrd93jIksk5xA3E2h+XdEjcsNHnlxwFjG+snIt\n4p4Gj2J6miAkoaXxAgCCW7s/8FD47bG6dKMIRX2vBUJqcWRG37Lql+KlFjIR8y8Y\nRd6D7dBgoifWynOd/eQpoLE=\n-----END PRIVATE KEY-----\n",
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

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

      const sheets = await authenticate();

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
        to: ["sanjay@kesarpetroproducts.in"],
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
