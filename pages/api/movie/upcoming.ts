import type { NextApiRequest, NextApiResponse } from "next";

export type UpcomingMovieDetails = {
  page: number;
  results: {
    poster_path: string | null;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
  }[];
  total_results: number;
  total_pages: number;
};
export type UpcomingMovieData =
  | UpcomingMovieDetails
  | {
      status_message: string;
      status_code: number;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<UpcomingMovieData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const { language, page, region } = req.query as unknown as { language: string; page: string; region: string };
  console.log(
    `${tmbd_base_url}/movie/upcoming?` +
      new URLSearchParams({
        api_key,
        language,
        page,
        region,
      })
  );
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/movie/upcoming?` +
        new URLSearchParams({
          api_key,
          language,
          page,
          region,
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
