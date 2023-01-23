import Image from "next/image";
import React from "react";
import { IMAGE_PIC_BASE_URL_W154 } from "../../../../utils/api/constants";
import BoxSkeleton from "./BoxSkeleton";
import {
  ProviderBoxContainer,
  ProviderBoxImageContainer,
  ProviderBoxSubheader,
  SubcategorySideBarHeader,
  SubcategorySideBarSection,
} from "./styles";
import type { ResultPerCountryInfo } from "../../../../../pages/api/movie/watch/providers";
import { Row } from "../../../common";

type Props = {
  result: ResultPerCountryInfo;
  isLoading: boolean;
};

const ProvidersBox = ({ isLoading, result }: Props) => {
  if (!result.flatrate && !result.buy && !result.rent) return null;
  const { flatrate: flatrateProviders, rent: rentProviders, buy: buyProviders } = result;

  return (
    <SubcategorySideBarSection>
      <SubcategorySideBarHeader>Watch providers</SubcategorySideBarHeader>
      {isLoading ? (
        <BoxSkeleton />
      ) : (
        <ProviderBoxContainer>
          {flatrateProviders && (
            <>
              <ProviderBoxSubheader>Included with subscription</ProviderBoxSubheader>
              <Row $flexWrap="wrap" $justifyContent="flex-start" $gap="0.25rem">
                {flatrateProviders.map((provider) => (
                  <ProviderBoxImageContainer key={provider.provider_id}>
                    <Image
                      fill
                      src={`${IMAGE_PIC_BASE_URL_W154}${provider.logo_path}`}
                      alt={`${provider.provider_name}-logo`}
                      title={provider.provider_name}
                    />
                  </ProviderBoxImageContainer>
                ))}
              </Row>
            </>
          )}
          {rentProviders && (
            <>
              <ProviderBoxSubheader>Available for rent</ProviderBoxSubheader>
              <Row $flexWrap="wrap" $justifyContent="flex-start" $gap="0.25rem">
                {rentProviders.map((provider) => (
                  <ProviderBoxImageContainer key={provider.provider_id}>
                    <Image
                      fill
                      src={`${IMAGE_PIC_BASE_URL_W154}${provider.logo_path}`}
                      alt={`${provider.provider_name}-logo`}
                      title={provider.provider_name}
                    />
                  </ProviderBoxImageContainer>
                ))}
              </Row>
            </>
          )}
          {buyProviders && (
            <>
              <ProviderBoxSubheader>Available for purchase</ProviderBoxSubheader>
              <Row $flexWrap="wrap" $justifyContent="flex-start" $gap="0.25rem">
                {buyProviders.map((provider) => (
                  <ProviderBoxImageContainer key={provider.provider_id}>
                    <Image
                      fill
                      src={`${IMAGE_PIC_BASE_URL_W154}${provider.logo_path}`}
                      alt={`${provider.provider_name}-logo`}
                      title={provider.provider_name}
                    />
                  </ProviderBoxImageContainer>
                ))}
              </Row>
            </>
          )}
        </ProviderBoxContainer>
      )}
    </SubcategorySideBarSection>
  );
};

export default ProvidersBox;
