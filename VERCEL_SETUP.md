# Vercel & DNS Setup for specificindustries.com

## 1. Create Vercel Project

1. Go to https://vercel.com/new
2. Import this GitHub repository
3. Framework preset: Next.js (auto-detected)
4. Click Deploy

## 2. Add Domain

In your Vercel project dashboard:

1. Go to Settings → Domains
2. Add `specificindustries.com`
3. Add `*.specificindustries.com` (wildcard)

Vercel will show you the DNS records you need to configure.

## 3. Configure DNS

At your domain registrar (wherever you bought specificindustries.com), set up these DNS records:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | 76.76.21.21              |
| CNAME | *    | cname.vercel-dns.com     |

The A record points the apex domain (specificindustries.com) to Vercel.
The CNAME wildcard points all subdomains (*.specificindustries.com) to Vercel.

**Note:** The A record IP may change. Check the Vercel dashboard for the current value when configuring.

## 4. SSL

SSL certificates are provisioned automatically by Vercel for all domains, including wildcard subdomains. No action needed.

## 5. Verify

After DNS propagation (can take up to 48 hours, usually minutes):

- Visit https://specificindustries.com — should show the apex landing page
- Visit https://pigmilk.specificindustries.com — should show the Pig Milk site
- Visit https://random.specificindustries.com — should redirect to apex

## Hobby Plan Notes

- Serverless function timeout: 10 seconds
- Bandwidth: 100GB/month
- Hobby plan is for non-commercial use. Move to Pro plan before enabling real e-commerce.
