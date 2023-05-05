import type { NextApiRequest, NextApiResponse } from "next";
export type TvCreditsDetails = {
  id: number;
  cast: {
    profile_path: string | null;
    adult: boolean;
    gender: number | null;
    credit_id: string;
    character: string;
    order: number;
    popularity: number;
    id: number;
    original_name: string;
    name: string;
    known_for_department: string;
  }[];
  crew: {
    profile_path: string | null;
    adult: boolean;
    gender: number | null;
    credit_id: string;
    character: string;
    job: string;
    popularity: number;
    id: number;
    original_name: string;
    name: string;
    known_for_department: string;
    department: string;
  }[];
};
export type TvCreditsData =
  | TvCreditsDetails
  | {
      status_message: string;
      status_code: number;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<TvCreditsData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const { tv_id, locale } = req.query as unknown as { tv_id: string; locale: string };
  console.log(
    `${tmbd_base_url}/tv/${tv_id}/credits?` +
      new URLSearchParams({
        api_key,
        language: locale,
      })
  );
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/tv/${tv_id}/credits?` +
        new URLSearchParams({
          api_key,
          language: locale,
        })
    );
    const json = (await tmbdResponse.json()) as TvCreditsData;
    console.log(json);
    return res.status(tmbdResponse.status).json(json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status_code: 500, status_message: "Service unavailable" });
  }
}
