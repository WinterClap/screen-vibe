import type { NextApiRequest, NextApiResponse } from "next";
type CommonInfo = {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}[];

type ResultPerCountryInfo = Partial<
  {
    link: string;
  } & Record<"flatrate" | "rent" | "buy", CommonInfo>
>;

type CountryKeys =
  | "AR"
  | "AT"
  | "AU"
  | "BE"
  | "BR"
  | "CA"
  | "CH"
  | "CL"
  | "CO"
  | "CZ"
  | "DE"
  | "DK"
  | "EC"
  | "EE"
  | "ES"
  | "FI"
  | "FR"
  | "GB"
  | "GR"
  | "HU"
  | "ID"
  | "IE"
  | "IN"
  | "IT"
  | "JP"
  | "KR"
  | "LT"
  | "LV"
  | "MX"
  | "MY"
  | "NL"
  | "NO"
  | "NZ"
  | "PE"
  | "PH"
  | "PL"
  | "PT"
  | "RO"
  | "RU"
  | "SE"
  | "SG"
  | "TH"
  | "TR"
  | "US"
  | "VE"
  | "ZA";

export type TvWatchProvidersDetails = {
  id: number;
  results: Record<CountryKeys, ResultPerCountryInfo> | {};
};
export type TvWatchProvidersData =
  | TvWatchProvidersDetails
  | {
      status_message: string;
      status_code: number;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<TvWatchProvidersData>) {
  const api_key = process.env.TMDB_API_KEY as string;
  const tmbd_base_url = process.env.TMDB_BASE_URL;
  const tv_id = req.query.tv_id as string;

  console.log(
    `${tmbd_base_url}/tv/${tv_id}/watch/providers?` +
      new URLSearchParams({
        api_key,
      })
  );
  try {
    const tmbdResponse = await fetch(
      `${tmbd_base_url}/tv/${tv_id}/watch/providers?` +
        new URLSearchParams({
          api_key,
        })
    );
    const json = (await tmbdResponse.json()) as TvWatchProvidersData;
    console.log("watch providers: ", json);

    return res.status(tmbdResponse.status).json(json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status_code: 500, status_message: "Service unavailable" });
  }
}
