import { NextApiRequest, NextApiResponse } from "next";

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string | null;
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieDetailsData =
  | MovieDetails
  | {
      status_code: number;
      status_message: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<MovieDetailsData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const { language, id } = req.query as unknown as { language: string; id: any[] };
  console.log("SLUG: ", id);
  console.log(
    `${tmbd_base_url}/movie/${id.toString()}?` +
      new URLSearchParams({
        api_key,
        language,
      })
  );
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/movie/${id.toString()}?` +
        new URLSearchParams({
          api_key,
          language,
        })
    );
    const json = (await tmbdResponse.json()) as MovieDetailsData;
    console.log(json);
    return res.status(tmbdResponse.status).json(json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status_code: 500, status_message: "Service unavailable" });
  }
}
