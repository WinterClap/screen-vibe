// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type AuthenticationSessionNewData =
  | {
      success: true;
      session_id: string;
    }
  | {
      status_message: string;
      status_code: number;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthenticationSessionNewData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  console.log(req.body);
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/authentication/session/new?` +
        new URLSearchParams({
          api_key,
        }),
      { body: JSON.stringify(req.body), method: "POST", headers: { "Content-Type": "application/json" } }
    );
    const json = await tmbdResponse.json();
    console.log(json);
    if (json.success) {
      return res.status(200).json(json);
    }
    return res.status(404).json(json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status_code: 500, status_message: "Service unavailable" });
  }
}
