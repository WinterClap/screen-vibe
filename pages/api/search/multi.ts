import type { NextApiRequest, NextApiResponse } from "next";

export type SearchMultiResultMovie = {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  original_title: string;
  genre_ids: number[];
  id: number;
  media_type: "movie";
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
};
export type SearchMultiResultTv = {
  poster_path: string | null;
  popularity: number;
  id: number;
  overview: string;
  backdrop_path: string | null;
  vote_average: number;
  media_type: "tv";
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
};

export type SearchMultiResultPerson = {
  profile_path: string | null;
  adult: boolean;
  id: number;
  media_type: "person";
  known_for: SearchMultiResultMovie | SearchMultiResultTv;
  name: string;
  popularity: number;
};

export type SearchMultiDetails = {
  page: number;
  total_pages: number;
  total_results: number;
  results: SearchMultiResultMovie[] | SearchMultiResultTv[] | SearchMultiResultPerson[];
};

export type SearchMultiData =
  | {
      status_message: string;
      status_code: number;
    }
  | SearchMultiDetails;
export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchMultiData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const { query, language, page, region, include_adult } = req.query as {
    query: string;
    language: string;
    page: string;
    region: string;
    include_adult: string;
  };

  console.log(
    `${tmbd_base_url}/search/multi?` +
      new URLSearchParams({
        api_key,
        query,
        language,
        page,
        region,
        include_adult,
      })
  );
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/search/multi?` +
        new URLSearchParams({
          api_key,
          query,
          language,
          page,
          region,
          include_adult,
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
