import type { NextApiRequest, NextApiResponse } from "next";

export type MovieRatingData = {
  status_message: string;
  status_code: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<MovieRatingData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const { session_id, movie_id } = req.query as { session_id: string; movie_id: string };

  console.log(
    `${tmbd_base_url}/movie/${movie_id}/rating?` +
      new URLSearchParams({
        api_key,
        session_id,
      })
  );
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/movie/${movie_id}/rating?` +
        new URLSearchParams({
          api_key,
          session_id,
        }),
      { method: "POST", body: req.body, headers: { "Content-Type": "application/json;charset=utf-8" } }
    );
    const json = await tmbdResponse.json();
    console.log(json);
    return res.status(tmbdResponse.status).json(json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status_code: 500, status_message: "Service unavailable" });
  }
}
