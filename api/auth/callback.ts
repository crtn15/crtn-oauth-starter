
import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const code = req.query.code as string;

  try {
    const response = await axios.post('https://api.coinbase.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        client_id: process.env.COINBASE_CLIENT_ID,
        client_secret: process.env.COINBASE_CLIENT_SECRET,
        redirect_uri: process.env.COINBASE_REDIRECT_URI,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log("Access Token:", response.data.access_token);
    res.status(200).send("Authorization successful. Token received and logged.");
  } catch (error: any) {
    console.error("Error during token exchange:", error.response?.data || error.message);
    res.status(500).send("Token exchange failed.");
  }
}
