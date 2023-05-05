import React from "react";
import {
  ResultBoxContainer,
  ResultBoxDimmedText,
  ResultBoxItemContainer,
  ResultBoxItemPosterContainer,
  ResultBoxItemSkeleton,
  ResultBoxText,
} from "./styles";
import { Col, IconContainer, Row } from "../../common";
import Image from "next/image";
import { useTheme } from "styled-components";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import useInteractionOptions from "../../../hooks/useInteractionOptions";
import { SearchMultiDetails } from "../../../../pages/api/search/multi";
import { IMAGE_PIC_BASE_URL_W300 } from "../../../utils/api/constants";
import CircularLoader from "../../Loaders/CircularLoader";
import { FaQuestion, FaUserCircle } from "react-icons/fa";
import { getPartitionedDate } from "../../Pages/Common/utils";
import { GiTumbleweed } from "react-icons/gi";

type Props = {
  query: string;
  data: SearchMultiDetails | undefined;
  isLoading: boolean | undefined;
  isError: boolean | undefined;
};

const ResultBox = ({ query, data, isError, isLoading }: Props) => {
  return (
    <ResultBoxContainer>
      {!data ? (
        <Row p="1rem" $justifyContent="flex-start">
          <ResultBoxDimmedText>Start typing to search...</ResultBoxDimmedText>
        </Row>
      ) : isLoading || isError ? (
        <Row w="100%" h="100%" $gap="0.8rem" $alignItems="flex-start" p="1rem">
          <ResultBoxItemSkeleton w="5rem" $h="4rem" />
          <Col w="100%" $gap="0.3rem" $justifyContent="flex-start" $alignItems="flex-start" h="100%">
            <ResultBoxItemSkeleton />
            <ResultBoxItemSkeleton w="80%" />
            <Row $alignSelf="flex-end" $gap="0.25rem" m="0.25rem 0 0 0">
              <ResultBoxItemSkeleton w="1.5rem" $h="1.2rem" />
              <ResultBoxItemSkeleton w="1.5rem" $h="1.2rem" />
            </Row>
          </Col>
        </Row>
      ) : data.results.length ? (
        data.results.slice(0, 4).map((result) => <ResultBoxItem key={result.id} result={result} />)
      ) : (
        <>
          {/* <ResultBoxDimmedText>{"No items to show. Try adding one to this list!"}</ResultBoxDimmedText> */}
          <IconContainer p="1rem" $gap="0.5rem" $flexDirection="column" $justifyContent="center" $alignItems="center">
            <GiTumbleweed size={32} />
            <ResultBoxDimmedText>{`No results for '${query}'`}</ResultBoxDimmedText>
          </IconContainer>
        </>
      )}
    </ResultBoxContainer>
  );
};

type ResultBoxItemProps = {
  result: SearchMultiDetails["results"][number];
};

const ResultBoxItem = ({ result }: ResultBoxItemProps) => {
  const preventDefault: React.MouseEventHandler<HTMLDivElement> = (e) => e.preventDefault();
  const theme = useTheme();
  const mediaTitle =
    result.media_type === "movie"
      ? result.title
      : result.media_type === "tv" || result.media_type === "person"
      ? result.name
      : "";
  const mediaImageUrl =
    result.media_type === "movie" || result.media_type === "tv" ? result.poster_path : result.profile_path;

  const mediaDate =
    result.media_type === "movie" ? result.release_date : result.media_type === "tv" ? result.first_air_date : null;

  const { isLoading, isLoadingTv, isError, isErrorTv, isWatchlisted, isFavorite, onFavoriteClick, onWatchLaterClick } =
    useInteractionOptions({
      mediaId: result.id,
      mediaType: result.media_type,
      mediaTitle: result.media_type === "movie" ? result.title : result.media_type === "tv" ? result.name : result.name,
    });

  const partitionedDate = getPartitionedDate(mediaDate);

  return (
    <ResultBoxItemContainer onMouseDown={preventDefault}>
      <ResultBoxItemPosterContainer className="poster-container" data-person={result.media_type === "person"}>
        {mediaImageUrl ? (
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={`${IMAGE_PIC_BASE_URL_W300}${mediaImageUrl}`}
            alt={mediaTitle}
            title={mediaTitle}
          />
        ) : result.media_type === "movie" || result.media_type === "tv" ? (
          <FaQuestion size="100%" title={mediaTitle} />
        ) : (
          <FaUserCircle size="100%" title={mediaTitle} />
        )}
      </ResultBoxItemPosterContainer>
      <Col w="100%" $gap="0.3rem" $justifyContent="flex-start" $alignItems="flex-start" h="100%" cursor="pointer">
        <ResultBoxText>{mediaTitle}</ResultBoxText>
        <ResultBoxDimmedText>
          {result.media_type.charAt(0).toUpperCase() + result.media_type.substring(1)}
        </ResultBoxDimmedText>
        {partitionedDate && <ResultBoxDimmedText>{partitionedDate.year}</ResultBoxDimmedText>}
        {result.media_type !== "person" && (!isLoading || !isLoadingTv) && (!isError || !isErrorTv) ? (
          <Row $alignSelf="flex-start" $gap="0.25rem" m="0.25rem 0 0 0">
            <IconContainer
              onClick={onWatchLaterClick}
              onMouseDown={preventDefault}
              cursor="pointer"
              role="button"
              whileTap={{ scale: 1 }}
              color={theme.text}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              whileHover={{ scale: 1.2 }}
              title={isWatchlisted ? "Remove from your watchlist" : "Add to your watchlist"}
            >
              {isWatchlisted ? <MdWatchLater size={16} /> : <MdOutlineWatchLater size={16} />}
            </IconContainer>
            <IconContainer
              onClick={onFavoriteClick}
              onMouseDown={preventDefault}
              cursor="pointer"
              role="button"
              whileTap={{ scale: 1 }}
              color={theme.text}
              animate={{ color: isFavorite ? theme.danger : theme.text }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              whileHover={{ scale: 1.2 }}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? <IoMdHeart size={16} /> : <IoMdHeartEmpty size={16} />}
            </IconContainer>
          </Row>
        ) : isLoading || isLoadingTv ? (
          <Row $alignItems="flex-end">
            <CircularLoader color={theme.text} />
          </Row>
        ) : null}
      </Col>
    </ResultBoxItemContainer>
  );
};

export default ResultBox;
