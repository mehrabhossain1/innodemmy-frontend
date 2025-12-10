# Email Setup Guide for Innodemy

## Current Issue

The verification emails are not being sent to all email addresses because:

1. **Resend Free Tier Limitation**: With the `onboarding@resend.dev` email, you can ONLY send emails to your verified email address (`mehrab.munna00@gmail.com`)
2. **Domain Verification Required**: To send emails to ANY email address, you need to verify a custom domain

## Error Message

```
You can only send testing emails to your own email address (mehrab.munna00@gmail.com).
To send emails to other recipients, please verify a domain at resend.com/domains,
and change the `from` address to an email using this domain.
```

## Solutions

### Solution 1: Development Mode (Quick Fix for Testing)

**Current Status**: ✅ ENABLED

I've already enabled development mode in your `.env` file:

```env
EMAIL_DEV_MODE=true
```

**How it works**:

-   Instead of sending actual emails, the OTP codes are logged to the console
-   Check your terminal/server logs when a user registers
-   You will see the OTP code printed like this:

```
============================================================
📧 DEVELOPMENT MODE - Email Not Sent
============================================================
To: user@example.com
Name: John Doe
Subject: Verify Your Email - Innodemy

🔐 YOUR VERIFICATION CODE:

    123456

============================================================
```

**When to use**:

-   ✅ During development
-   ✅ Testing with multiple email addresses
-   ✅ Before domain verification is set up

### Solution 2: Verify Custom Domain (Production Fix)

To send emails to ANY email address, you need to verify your own domain:

#### Step 1: Add Domain to Resend

1. Go to https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain (e.g., `innodemy.com`)

#### Step 2: Add DNS Records

Resend will provide DNS records. Add these to your domain's DNS settings:

**Example DNS Records** (yours will be different):

```
Type: TXT
Name: @ or resend._domainkey
Value: [provided by Resend]

Type: MX
Name: @
Value: [provided by Resend]
```

#### Step 3: Wait for Verification

-   DNS changes can take 24-48 hours
-   Resend will verify automatically
-   You will get a notification when verified

#### Step 4: Update Environment Variables

Once verified, update your `.env`:

```env
FROM_EMAIL=noreply@innodemy.com  # Use your verified domain
FROM_NAME=Innodemy
EMAIL_DEV_MODE=false  # Disable dev mode to send real emails
```

## Testing Email Setup

I've created a test script to verify email sending:

```bash
node test-email.js
```

Before running, update the recipient email in `test-email.js`:

```javascript
to: 'your-email@example.com',  // Change this
```

## Current Configuration

**File**: `.env`

```env
RESEND_API_KEY=re_8uYxnhJL_***vMBg
FROM_EMAIL=onboarding@resend.dev
FROM_NAME=Innodemy
EMAIL_DEV_MODE=true
```

## How Registration Works Now

1. User fills registration form
2. OTP is generated (6-digit code)
3. Since `EMAIL_DEV_MODE=true`:
    - OTP is logged to console (check terminal)
    - No actual email is sent
4. User enters OTP from console logs
5. Account is verified

## For Production

Before deploying to production:

1. ✅ Verify custom domain at Resend
2. ✅ Update `FROM_EMAIL` in `.env`
3. ✅ Set `EMAIL_DEV_MODE=false`
4. ✅ Test with real email addresses
5. ✅ Monitor Resend dashboard for delivery status

## Resend Dashboard

Monitor your emails at: https://resend.com/emails

You can see:

-   Sent emails
-   Delivery status
-   Bounce rates
-   Error logs

## Alternative: Gmail SMTP

If you prefer using Gmail instead of Resend:

1. Enable 2FA on your Gmail account
2. Generate an App Password
3. Update email service to use Nodemailer with Gmail SMTP

Would you like me to implement Gmail SMTP as an alternative?

## Support

If you need help:

-   Resend Docs: https://resend.com/docs
-   Resend Support: https://resend.com/support
