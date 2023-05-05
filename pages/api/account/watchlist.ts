import type { NextApiRequest, NextApiResponse } from "next";

export type AccountMoviesWatchlistDetails = {
  page: number;
  results: {
    poster_path?: string | null;
    adult?: boolean;
    overview?: string;
    release_date?: string;
    genre_ids?: number[];
    id?: number;
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: string | null;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
  }[];
  total_pages?: number;
  total_results?: number;
};

export type AccountTvWatchlistDetails = {
  page: number;
  results: {
    poster_path?: string | null;
    overview?: string;
    first_air_date?: string;
    genre_ids?: number[];
    id?: number;
    original_name?: string;
    original_language?: string;
    original_country?: string[];
    name?: string;
    backdrop_path?: string | null;
    popularity?: number;
    vote_count?: number;
    vote_average?: number;
  }[];
  total_pages?: number;
  total_results?: number;
};

export type AccountWatchlistData =
  | {
      status_message: string;
      status_code: number;
    }
  | AccountMoviesWatchlistDetails
  | AccountTvWatchlistDetails;

export default async function handler(req: NextApiRequest, res: NextApiResponse<AccountWatchlistData>) {
  const { method } = req;
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;

  switch (method) {
    case "GET": {
      const { session_id, account_id, page, locale, sort_by, mediaType } = req.query as unknown as {
        session_id: string;
        account_id: string;
        page: number;
        sort_by: "created_at.desc" | "created_at.asc";
        locale: string;
        mediaType: "movies" | "tv";
      };

      if (!session_id) return Promise.reject(new Error("No session_id specified"));

      if (mediaType === "movies") {
        try {
          const tmbdResponse = await fetch(
            `${tmbd_base_url}/account/${account_id}/watchlist/movies?` +
              new URLSearchParams({
                api_key,
                session_id,
                page: page.toString(),
                language: locale,
                sort_by,
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

      try {
        const tmbdResponse = await fetch(
          `${tmbd_base_url}/account/${account_id}/watchlist/tv?` +
            new URLSearchParams({
              api_key,
              session_id,
              page: page.toString(),
              language: locale,
              sort_by,
            })
        );
        const json = await tmbdResponse.json();
        console.log(json);

        return res.status(tmbdResponse.status).json(json);
      } catch (error) {
        console.log(error);
        res.status(500).json({ status_code: 500, status_message: "Service unavailable" });
      }
      break;
    }
    case "POST": {
      const { account_id, session_id } = req.query as { account_id: string; session_id: string };

      try {
        const tmdbResponse = await fetch(
          `${tmbd_base_url}/account/${account_id}/watchlist?` +
            new URLSearchParams({
              api_key,
              session_id,
            }),
          {
            method: "POST",
            body: req.body,
            headers: { "Content-Type": "application/json" },
          }
        );
        const json = await tmdbResponse.json();
        console.log(json);

        return res.status(tmdbResponse.status).json(json);
      } catch (error) {
        console.log(error);
        res.status(500).json({ status_code: 500, status_message: "Service unavailable" });
      }

      break;
    }

    default:
      res.status(400).json({ status_code: 400, status_message: "invalid request" });
      break;
  }
}
