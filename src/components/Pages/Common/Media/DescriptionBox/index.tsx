import React from "react";
import { DescriptionContainer, DescriptionItem, DescriptionItemContent, DescriptionItemLabel } from "../styles";

type Props = {
  revenue?: number;
  voteAvg?: number;
  budget?: number;
  release?: string;
  numberOfSeasons?: number;
  mediaType: "movie" | "tv";
};

const DescriptionBox = ({ release, budget, revenue, voteAvg, mediaType, numberOfSeasons }: Props) => {
  const currencyFormatter = Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
    currencyDisplay: "code",
  });
  const dateF = release && new Date(release);

  return (
    <DescriptionContainer>
      {!!dateF && (
        <DescriptionItem>
          <DescriptionItemLabel>{mediaType === "movie" ? "Release" : "First air date"}</DescriptionItemLabel>
          <DescriptionItemContent>27 April, 2023</DescriptionItemContent>
        </DescriptionItem>
      )}
      {!!budget && (
        <DescriptionItem>
          <DescriptionItemLabel>Budget</DescriptionItemLabel>
          <DescriptionItemContent>{currencyFormatter.format(budget)}</DescriptionItemContent>
        </DescriptionItem>
      )}
      {!!revenue && (
        <DescriptionItem>
          <DescriptionItemLabel>Revenue</DescriptionItemLabel>
          <DescriptionItemContent>{currencyFormatter.format(revenue)}</DescriptionItemContent>
        </DescriptionItem>
      )}
      {!!numberOfSeasons && (
        <DescriptionItem>
          <DescriptionItemLabel>Number of Seasons</DescriptionItemLabel>
          <DescriptionItemContent>{numberOfSeasons}</DescriptionItemContent>
        </DescriptionItem>
      )}
      {!!voteAvg && (
        <DescriptionItem>
          <DescriptionItemLabel>Vote average</DescriptionItemLabel>
          <DescriptionItemContent>{voteAvg}/10</DescriptionItemContent>
        </DescriptionItem>
      )}
    </DescriptionContainer>
  );
};

export default DescriptionBox;
