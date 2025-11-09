import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Use Resend's onboarding domain for testing (no verification needed)
// To use your own domain, verify it in Resend dashboard first
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const FROM_NAME = process.env.FROM_NAME || "Innodemy";

// Development mode - log OTPs to console instead of sending emails
// Only enable dev mode if EMAIL_DEV_MODE is explicitly set to "true"
const IS_DEV_MODE = process.env.EMAIL_DEV_MODE === "true";

/**
 * Send email verification OTP to user
 */
export async function sendVerificationEmail(
    email: string,
    code: string,
    name: string
): Promise<void> {
    try {
        console.log(
            `Sending verification email to ${email} from ${FROM_EMAIL}`
        );
        console.log("🔍 Email Config:", {
            NODE_ENV: process.env.NODE_ENV,
            EMAIL_DEV_MODE: process.env.EMAIL_DEV_MODE,
            IS_DEV_MODE,
            RESEND_API_KEY: process.env.RESEND_API_KEY
                ? "***" + process.env.RESEND_API_KEY.slice(-4)
                : "NOT SET",
        });

        // In development mode, just log the OTP to console
        if (IS_DEV_MODE) {
            console.log("\n" + "=".repeat(60));
            console.log("📧 DEVELOPMENT MODE - Email Not Sent");
            console.log("=".repeat(60));
            console.log(`To: ${email}`);
            console.log(`Name: ${name}`);
            console.log(`Subject: Verify Your Email - Innodemy`);
            console.log("\n🔐 YOUR VERIFICATION CODE:");
            console.log(`\n    ${code}\n`);
            console.log("=".repeat(60) + "\n");
            return;
        }

        const result = await resend.emails.send({
            from: `${FROM_NAME} <${FROM_EMAIL}>`,
            to: email,
            subject: "Verify Your Email - Innodemy",
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .logo {
                font-size: 32px;
                font-weight: bold;
                color: #226481;
                margin-bottom: 10px;
              }
              .title {
                font-size: 24px;
                font-weight: 600;
                color: #333;
                margin-bottom: 20px;
              }
              .content {
                font-size: 16px;
                color: #555;
                margin-bottom: 30px;
              }
              .otp-container {
                background-color: #f5f5f5;
                border: 2px dashed #226481;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                margin: 30px 0;
              }
              .otp-label {
                font-size: 14px;
                color: #666;
                margin-bottom: 10px;
              }
              .otp-code {
                font-size: 36px;
                font-weight: bold;
                color: #226481;
                letter-spacing: 8px;
                font-family: 'Courier New', monospace;
              }
              .expiry-notice {
                background-color: #fff3cd;
                border-left: 4px solid #e9ae30;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .expiry-notice p {
                margin: 0;
                font-size: 14px;
                color: #856404;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                text-align: center;
                font-size: 14px;
                color: #999;
              }
              .security-note {
                background-color: #f8f9fa;
                border-radius: 4px;
                padding: 15px;
                margin-top: 20px;
                font-size: 14px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Innodemy</div>
              </div>

              <h1 class="title">Welcome to Innodemy, ${name}!</h1>

              <div class="content">
                <p>Thank you for registering with Innodemy. To complete your registration and verify your email address, please use the verification code below:</p>
              </div>

              <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${code}</div>
              </div>

              <div class="expiry-notice">
                <p><strong>⏱️ Important:</strong> This code will expire in 10 minutes and can be used up to 3 times.</p>
              </div>

              <div class="content">
                <p>If you didn't request this verification code, please ignore this email or contact our support team if you have concerns.</p>
              </div>

              <div class="security-note">
                <p><strong>🔒 Security Tip:</strong> Never share this code with anyone. Innodemy will never ask for your verification code.</p>
              </div>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Innodemy. All rights reserved.</p>
                <p>Contact: Contact@innodemy.com | Phone: +880 1704 258972</p>
              </div>
            </div>
          </body>
        </html>
      `,
        });

        console.log(
            `Verification email sent successfully to ${email}. Email ID:`,
            result.data?.id
        );
    } catch (error) {
        console.error("Failed to send verification email:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        throw new Error("Failed to send verification email");
    }
}

/**
 * Send password reset OTP to user
 */
export async function sendPasswordResetEmail(
    email: string,
    code: string,
    name: string
): Promise<void> {
    try {
        console.log(
            `Sending password reset email to ${email} from ${FROM_EMAIL}`
        );

        // In development mode, just log the OTP to console
        if (IS_DEV_MODE) {
            console.log("\n" + "=".repeat(60));
            console.log("📧 DEVELOPMENT MODE - Email Not Sent");
            console.log("=".repeat(60));
            console.log(`To: ${email}`);
            console.log(`Name: ${name}`);
            console.log(`Subject: Reset Your Password - Innodemy`);
            console.log("\n🔐 YOUR PASSWORD RESET CODE:");
            console.log(`\n    ${code}\n`);
            console.log("=".repeat(60) + "\n");
            return;
        }

        const result = await resend.emails.send({
            from: `${FROM_NAME} <${FROM_EMAIL}>`,
            to: email,
            subject: "Reset Your Password - Innodemy",
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
              }
              .logo {
                font-size: 32px;
                font-weight: bold;
                color: #226481;
                margin-bottom: 10px;
              }
              .title {
                font-size: 24px;
                font-weight: 600;
                color: #333;
                margin-bottom: 20px;
              }
              .content {
                font-size: 16px;
                color: #555;
                margin-bottom: 30px;
              }
              .otp-container {
                background-color: #f5f5f5;
                border: 2px dashed #dc3545;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                margin: 30px 0;
              }
              .otp-label {
                font-size: 14px;
                color: #666;
                margin-bottom: 10px;
              }
              .otp-code {
                font-size: 36px;
                font-weight: bold;
                color: #dc3545;
                letter-spacing: 8px;
                font-family: 'Courier New', monospace;
              }
              .expiry-notice {
                background-color: #fff3cd;
                border-left: 4px solid #e9ae30;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .expiry-notice p {
                margin: 0;
                font-size: 14px;
                color: #856404;
              }
              .warning-box {
                background-color: #f8d7da;
                border-left: 4px solid #dc3545;
                padding: 15px;
                margin: 20px 0;
                border-radius: 4px;
              }
              .warning-box p {
                margin: 0;
                font-size: 14px;
                color: #721c24;
              }
              .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                text-align: center;
                font-size: 14px;
                color: #999;
              }
              .security-note {
                background-color: #f8f9fa;
                border-radius: 4px;
                padding: 15px;
                margin-top: 20px;
                font-size: 14px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">Innodemy</div>
              </div>

              <h1 class="title">Password Reset Request</h1>

              <div class="content">
                <p>Hello ${name},</p>
                <p>We received a request to reset your password. Use the code below to reset your password:</p>
              </div>

              <div class="otp-container">
                <div class="otp-label">Your Password Reset Code</div>
                <div class="otp-code">${code}</div>
              </div>

              <div class="expiry-notice">
                <p><strong>⏱️ Important:</strong> This code will expire in 10 minutes and can be used up to 3 times.</p>
              </div>

              <div class="warning-box">
                <p><strong>⚠️ Security Alert:</strong> If you didn't request a password reset, please ignore this email and consider changing your password immediately to secure your account.</p>
              </div>

              <div class="content">
                <p>After entering this code, you'll be able to create a new password for your account.</p>
              </div>

              <div class="security-note">
                <p><strong>🔒 Security Tip:</strong> Never share this code with anyone. Innodemy will never ask for your reset code.</p>
              </div>

              <div class="footer">
                <p>© ${new Date().getFullYear()} Innodemy. All rights reserved.</p>
                <p>Contact: Contact@innodemy.com | Phone: +880 1704 258972</p>
              </div>
            </div>
          </body>
        </html>
      `,
        });

        console.log(
            `Password reset email sent successfully to ${email}. Email ID:`,
            result.data?.id
        );
    } catch (error) {
        console.error("Failed to send password reset email:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        throw new Error("Failed to send password reset email");
    }
}

/**
 * Resend verification email with new OTP code
 */
export async function resendVerificationEmail(
    email: string,
    code: string,
    name: string
): Promise<void> {
    return sendVerificationEmail(email, code, name);
}
