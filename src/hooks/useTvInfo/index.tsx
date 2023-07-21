import { useQuery } from "react-query";
import { getTvDetails } from "../../utils/api/movie";
import type { GeneralSliceState } from "../../slices/generalSlice";
import { TV_DETAILS_BASE_KEY } from "../../queryKeys";

type HookArgs = {
  tv_id: number;
  language: GeneralSliceState["locale"];
};

const useTvInfo = ({ tv_id, language }: HookArgs) => {
  const {
    data: tvDetailsData,
    isLoading: tvDetailsIsLoading,
    isError: tvDetailsIsError,
  } = useQuery({
    queryKey: [TV_DETAILS_BASE_KEY, tv_id],
    queryFn: () => getTvDetails({ tv_id, language }),
    enabled: !!language && !!tv_id,
    retry: false,
  });

  return { tvDetailsData, tvDetailsIsError, tvDetailsIsLoading };
};

export default useTvInfo;
