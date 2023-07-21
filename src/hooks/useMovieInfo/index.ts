import { useQuery } from "react-query";
import { getMovieDetails } from "../../utils/api/movie";
import type { GeneralSliceState } from "../../slices/generalSlice";
import { MOVIE_DETAILS_BASE_KEY } from "../../queryKeys";

type HookArgs = {
  movie_id: number;
  language: GeneralSliceState["locale"];
};

const useMovieInfo = ({ movie_id, language }: HookArgs) => {
  const {
    data: movieDetailsData,
    isLoading: movieDetailsIsLoading,
    isError: movieDetailsIsError,
  } = useQuery({
    queryKey: [MOVIE_DETAILS_BASE_KEY, movie_id],
    queryFn: () => getMovieDetails({ movie_id, language }),
    enabled: !!language && !!movie_id,
    retry: false,
  });

  return { movieDetailsData, movieDetailsIsLoading, movieDetailsIsError };
};

export default useMovieInfo;
