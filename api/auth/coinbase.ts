
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.COINBASE_CLIENT_ID;
  const redirectUri = process.env.COINBASE_REDIRECT_URI;
  const scope = "wallet:accounts:read";
  const responseType = "code";

  const authUrl = \`https://www.coinbase.com/oauth/authorize?client_id=\${clientId}&redirect_uri=\${redirectUri}&response_type=\${responseType}&scope=\${scope}\`;

  res.redirect(authUrl);
}
