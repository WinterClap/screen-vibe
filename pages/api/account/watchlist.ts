import type { NextApiRequest, NextApiResponse } from "next";

export type AccountWatchlistData = {
  status_message: string;
  status_code: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<AccountWatchlistData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const { session_id, account_id } = req.query as { session_id: string; account_id: string };

  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/account/${account_id}/watchlist?` +
        new URLSearchParams({
          api_key,
          session_id,
        }),
      {
        method: "POST",
        body: req.body,
        headers: { "Content-Type": "application/json;charset=utf-8" },
      }
    );
    const json = await tmbdResponse.json();
    console.log(json);
    return res.status(tmbdResponse.status).json(json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status_code: 500, status_message: "Service unavailable" });
  }
}
