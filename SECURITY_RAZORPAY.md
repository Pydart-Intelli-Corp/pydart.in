# Security Update: Handling Razorpay Keys

## Important Security Notice

We've updated the way we handle Razorpay API keys to improve security. API keys should never be hardcoded or committed to repositories as this creates a significant security risk.

## Setup Instructions

1. **Revoke Existing Keys**: If you've previously used hardcoded keys in this repository, please revoke them immediately from your Razorpay dashboard and generate new keys.

2. **Environment Variables Setup**:
   - Create a `.env.local` file based on `.env.example`
   - Add your Razorpay keys to this file:
     ```
     NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
     RAZORPAY_KEY_SECRET=your_razorpay_secret_key
     ```
   - Never commit `.env.local` file to Git

3. **Deployment Setup**:
   - Add these environment variables to your deployment platform (Vercel, Netlify, etc.)
   - For Azure/Firebase/other hosting, configure environment variables in their respective dashboards

## Security Best Practices

- Never expose `RAZORPAY_KEY_SECRET` to the client side
- Only `NEXT_PUBLIC_RAZORPAY_KEY_ID` is needed on the frontend
- Keep secrets in backend services when possible
- Regularly rotate your API keys
- Set up IP restrictions in Razorpay dashboard if possible

Remember: Exposed API keys can lead to unauthorized access and potential financial loss.
