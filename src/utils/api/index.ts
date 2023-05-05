import type { MovieRatingData } from "../../../pages/api/movie/rating";
import type { TvRatingData } from "../../../pages/api/tv/rating";

export type RateMediaParams = {
  mediaId: number;
  session_id: string;
  value: number;
  mediaType: "movie" | "tv";
};

export const rateMedia = async ({ mediaId, session_id, mediaType, value }: RateMediaParams) => {
  if (!mediaId || !session_id || !value) return Promise.reject("Missing required fields");
  if (mediaType === "movie") {
    return new Promise<MovieRatingData | TvRatingData>(async (resolve, reject) => {
      try {
        const result = await fetch(
          "/api/movie/rating?" +
            new URLSearchParams({
              movie_id: mediaId.toString(),
              session_id,
            }),
          {
            method: "POST",
            body: JSON.stringify({
              value,
            }),
          }
        );
        const json = (await result.json()) as MovieRatingData | TvRatingData;
        resolve(json);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  return new Promise<MovieRatingData>(async (resolve, reject) => {
    try {
      const result = await fetch(
        "/api/tv/rating?" +
          new URLSearchParams({
            tv_id: mediaId.toString(),
            session_id,
          }),
        {
          method: "POST",
          body: JSON.stringify({
            value,
          }),
        }
      );
      const json = (await result.json()) as MovieRatingData;
      resolve(json);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
