import type { NextApiRequest, NextApiResponse } from "next";

export type GenreTvList = {
  genres: {
    id: number;
    name: string;
  }[];
};
export type GenreTvListData =
  | GenreTvList
  | {
      status_message: string;
      status_code: number;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<GenreTvListData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const locale = req.query.locale as string;

  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/genre/tv/list?` +
        new URLSearchParams({
          api_key,
          language: locale,
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
