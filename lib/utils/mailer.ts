import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === "true",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

interface SendMailOptions {
    to: string;
    subject: string;
    html: string;
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
    const mailOptions = {
        from: process.env.MAIL_FROM || "Innodemy <innodemy360@gmail.com>",
        to,
        subject,
        html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
}

/**
 * Send enrollment approval confirmation email
 */
export async function sendEnrollmentApprovalEmail({
    userName,
    userEmail,
    courseTitle,
    amount,
    paymentMethod,
    transactionId,
}: {
    userName: string;
    userEmail: string;
    courseTitle: string;
    amount: number;
    paymentMethod: string;
    transactionId: string;
}) {
    const paymentMethodLabel =
        paymentMethod === "bkash"
            ? "bKash"
            : paymentMethod === "nagad"
              ? "Nagad"
              : paymentMethod === "citybank"
                ? "City Bank"
                : paymentMethod;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enrollment Approved</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f4f8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #226481 0%, #1a4f65 100%); padding: 40px 40px 30px; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 32px;">✅</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
                Payment Approved!
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 15px;">
                Your enrollment has been confirmed
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 32px 40px 0;">
              <p style="margin: 0; color: #1a1a2e; font-size: 16px; line-height: 1.6;">
                Hi <strong>${userName}</strong>,
              </p>
              <p style="margin: 12px 0 0; color: #4a4a6a; font-size: 15px; line-height: 1.7;">
                Great news! Your payment has been verified and your enrollment is now <strong style="color: #16a34a;">approved</strong>. You now have full access to the course.
              </p>
            </td>
          </tr>

          <!-- Course Card -->
          <tr>
            <td style="padding: 24px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%); border-radius: 12px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 4px; color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">
                      Your Course
                    </p>
                    <h2 style="margin: 0 0 16px; color: #1a1a2e; font-size: 20px; font-weight: 700; line-height: 1.3;">
                      📚 ${courseTitle}
                    </h2>
                    
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e2e8f0;">
                          <span style="color: #64748b; font-size: 13px;">Payment Method</span>
                        </td>
                        <td style="padding: 8px 0; border-top: 1px solid #e2e8f0; text-align: right;">
                          <strong style="color: #1a1a2e; font-size: 13px;">${paymentMethodLabel}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e2e8f0;">
                          <span style="color: #64748b; font-size: 13px;">Transaction ID</span>
                        </td>
                        <td style="padding: 8px 0; border-top: 1px solid #e2e8f0; text-align: right;">
                          <strong style="color: #1a1a2e; font-size: 13px;">${transactionId}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e2e8f0;">
                          <span style="color: #64748b; font-size: 13px;">Amount Paid</span>
                        </td>
                        <td style="padding: 8px 0; border-top: 1px solid #e2e8f0; text-align: right;">
                          <strong style="color: #16a34a; font-size: 15px;">৳${amount.toLocaleString()}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #e2e8f0;">
                          <span style="color: #64748b; font-size: 13px;">Status</span>
                        </td>
                        <td style="padding: 8px 0; border-top: 1px solid #e2e8f0; text-align: right;">
                          <span style="display: inline-block; background-color: #dcfce7; color: #16a34a; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px;">
                            ✓ Approved
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding: 8px 40px 16px; text-align: center;">
              <p style="margin: 0 0 20px; color: #4a4a6a; font-size: 15px; line-height: 1.6;">
                Log in to your Innodemy account to start learning right away!
              </p>
              <a href="https://innodemy.com" 
                 style="display: inline-block; background: linear-gradient(135deg, #226481 0%, #1a4f65 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 8px; font-size: 16px; font-weight: 600; letter-spacing: 0.3px; box-shadow: 0 4px 12px rgba(34,100,129,0.3);">
                🚀 Access Your Course
              </a>
            </td>
          </tr>

          <!-- Help Section -->
          <tr>
            <td style="padding: 24px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #fffbeb; border-radius: 8px; border: 1px solid #fde68a;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.6;">
                      💡 <strong>Need help?</strong> If you have any questions about accessing your course or need support, don't hesitate to reach out to us.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">
                <strong>Innodemy</strong> — Learn. Grow. Succeed.
              </p>
              <p style="margin: 0 0 4px; color: #94a3b8; font-size: 12px;">
                📧 Contact@innodemy.com &nbsp;|&nbsp; 📞 +880 1704 258972
              </p>
              <p style="margin: 8px 0 0; color: #94a3b8; font-size: 11px;">
                © ${new Date().getFullYear()} Innodemy. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    return sendMail({
        to: userEmail,
        subject: `✅ Enrollment Approved — ${courseTitle} | Innodemy`,
        html,
    });
}
