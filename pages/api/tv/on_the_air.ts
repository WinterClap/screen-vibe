import type { NextApiRequest, NextApiResponse } from "next";

export type OnTheAirTvDetails = {
  page: number;
  results: {
    poster_path: string | null;
    popularity?: number;
    id: number;
    backdrop_path: string | null;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country?: string[];
    genre_ids: number[];
    original_language?: string;
    vote_count: number;
    name: string;
    original_name: string;
  }[];
  total_results: number;
  total_pages: number;
};
export type OnTheAirTvData = OnTheAirTvDetails | { status_message: string; status_code: number };
export default async function handler(req: NextApiRequest, res: NextApiResponse<OnTheAirTvData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const { language, page, region } = req.query as unknown as { language: string; page: string; region: string };
  console.log(
    `${tmbd_base_url}/tv/on_the_air?` +
      new URLSearchParams({
        api_key,
        language,
        page,
        region,
      })
  );
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/tv/on_the_air?` +
        new URLSearchParams({
          api_key,
          language: `${language}-${region}`,
          page,
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
