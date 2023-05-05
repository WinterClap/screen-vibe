import type { NextApiRequest, NextApiResponse } from "next";

export type TvAccountStatesDetails = {
  id: number;
  favorite: boolean;
  rated:
    | {
        value: number;
      }
    | boolean;
  watchlist: boolean;
};
export type TvAccountStatesData =
  | TvAccountStatesDetails
  | {
      status_message: string;
      status_code: number;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<TvAccountStatesData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const { tv_id, session_id } = req.query as unknown as { tv_id: string; session_id: string };
  console.log(
    `${tmbd_base_url}/tv/${tv_id}/account_states?` +
      new URLSearchParams({
        api_key,
        session_id,
      })
  );
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/tv/${tv_id}/account_states?` +
        new URLSearchParams({
          api_key,
          session_id,
        })
    );
    const json = (await tmbdResponse.json()) as TvAccountStatesData;
    console.log(json);
    return res.status(tmbdResponse.status).json(json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status_code: 500, status_message: "Service unavailable" });
  }
}
