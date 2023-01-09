// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type AuthenticationTokenNewData =
  | {
      success: true;
      expires_at: string;
      request_token: string;
    }
  | {
      success: false;
      message: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthenticationTokenNewData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/authentication/token/new?` +
        new URLSearchParams({
          api_key,
        })
    );
    const json = await tmbdResponse.json();
    if (json.success) {
      return res.status(200).json(json);
    }
    return res.status(404).json(json);
  } catch (error) {
    res.status(500).json({ success: false, message: "Service unavailable" });
  }
}
