import type { NextApiRequest, NextApiResponse } from "next";

export type TvRecommendationsDetails = {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    name: string;
    original_language: string;
    original_name: string;
    overview: string;
    poster_path: string;
    media_type: "tv";
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
  }[];
  total_results: number;
  total_pages: number;
};
export type RecommendationsTvData =
  | TvRecommendationsDetails
  | {
      status_message: string;
      status_code: number;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<RecommendationsTvData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const { tv_id, language } = req.query as unknown as { tv_id: number; language: string };
  console.log(
    `${tmbd_base_url}/tv/${tv_id}/recommendations?` +
      new URLSearchParams({
        api_key,
        language,
      })
  );
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/tv/${tv_id}/recommendations?` +
        new URLSearchParams({
          api_key,
          language,
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
