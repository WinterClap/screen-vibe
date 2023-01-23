// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type AccountDetails = {
  avatar: { gravatar: { hash: string }; tmdb: { avatar_path: string } | null };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};
export type AccountDetailsData =
  | AccountDetails
  | {
      status_message: string;
      status_code: number;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<AccountDetailsData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const session_id = req.query.session_id as string;

  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/account?` +
        new URLSearchParams({
          api_key,
          session_id,
        })
    );
    const json = await tmbdResponse.json();
    console.log(json);
    return res.status(tmbdResponse.status).json(json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status_code: 500, status_message: "Service unavailable" });
  }
}
