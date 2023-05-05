import Image from "next/image";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { GiTumbleweed } from "react-icons/gi";
import { IoChevronDown } from "react-icons/io5";
import { AccountMoviesWatchlistDetails, AccountTvWatchlistDetails } from "../../../../../pages/api/account/watchlist";
import { IMAGE_PIC_BASE_URL_W300 } from "../../../../utils/api/constants";
import { Col, IconContainer, Row, StyledLink } from "../../../common";
import {
  AccordionContentContainer,
  AccordionContentPosterContainer,
  AccordionContentTitle,
  AccordionItemContainer,
  AccordionItemContent,
  AccordionItemContentContainer,
  AccordionItemHeader,
  AccordionItemHeaderText,
  AccordionItemSkeleton,
  AccordionItemSkeletonContainer,
  AccordionItemTextSkeleton,
  AccordionMediaOptionContainer,
  DefaultItemContent,
  DefaultItemContentPlaceholder,
  DimmedItemDescription,
  DimmedItemHeader,
  EmptyListPlaceholderContainer,
  RemoveButtonContainer,
} from "./styles";
import { HiOutlineTrash } from "react-icons/hi2";
import { useRouter } from "next/router";
import { LayoutGroup } from "framer-motion";
import { FaQuestion } from "react-icons/fa";

type Props = {
  isLoggedIn: boolean;
  label: string;
  id: string;
  openByDefault?: boolean;
  mediaOptions?: string[];
  seeMoreHref?: string;
  isError?: boolean;
  isLoading?: boolean;
  selectedIndex: number;
  onSelectedIndex?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, idx: number) => void;
  removeFromWatchlist?: ({ mediaId }: { mediaId: number }) => Promise<void>;
  removeFromFavorites?: ({ mediaId }: { mediaId: number }) => Promise<void>;
  data?: AccountMoviesWatchlistDetails | AccountTvWatchlistDetails;
};

const AccordionItem = ({
  isLoggedIn,
  openByDefault,
  label,
  seeMoreHref,
  isLoading,
  isError,
  mediaOptions,
  data,
  selectedIndex,
  id,
  onSelectedIndex,
  removeFromWatchlist,
  removeFromFavorites,
}: Props) => {
  const { push } = useRouter();
  const isEmpty = !data?.results.length;
  const [isOpen, setIsOpen] = React.useState<boolean>(openByDefault || false);

  const onAccordionItemClick = () => {
    setIsOpen((prev) => !prev);
  };

  const onPosterItemClick = (mediaId: number) => {
    console.log(`/category/${selectedIndex === 0 ? "movies" : "tv"}/${mediaId}`);
    // push(`/category/${selectedIndex === 0 ? "movies" : "tv"}/${mediaId}`);
  };

  const onRemoveItemClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, mediaId: number) => {
    removeFromWatchlist
      ? removeFromWatchlist({ mediaId })
      : removeFromFavorites
      ? removeFromFavorites({ mediaId })
      : null;
    console.log(mediaId);
    event.stopPropagation();
  };

  if (!isLoggedIn) {
    return (
      <AccordionItemContainer>
        <DefaultItemContent>
          <DimmedItemHeader>{label}</DimmedItemHeader>
          <DefaultItemContentPlaceholder />
          <DefaultItemContentPlaceholder />
          <DefaultItemContentPlaceholder />
        </DefaultItemContent>
      </AccordionItemContainer>
    );
  }

  return (
    <AccordionItemContainer>
      <AccordionItemHeader onClick={onAccordionItemClick}>
        <Col>
          <AccordionItemHeaderText>{label}</AccordionItemHeaderText>
          <Row $gap="0.25rem" cursor="pointer">
            {mediaOptions?.map((option, idx) => (
              <AccordionMediaOptionContainer
                $isOpen={isOpen}
                $selected={selectedIndex === idx}
                key={idx}
                onClick={(e) => onSelectedIndex?.(e, id, idx)}
              >
                {option}
              </AccordionMediaOptionContainer>
            ))}
          </Row>
        </Col>
        <Row $gap="0.25rem" cursor="pointer">
          {seeMoreHref && <StyledLink href={seeMoreHref}>See all</StyledLink>}
          <IconContainer
            animate={{
              rotate: isOpen ? "0deg" : "180deg",
            }}
            $pointerEvents="none"
            cursor="pointer"
          >
            <IoChevronDown size={22} />
          </IconContainer>
        </Row>
      </AccordionItemHeader>
      <AccordionItemContent
        $isOpen={isOpen}
        animate={{ height: isOpen ? "auto" : 0, transition: { ease: "easeInOut" } }}
        layout
      >
        {!isLoading && !isError ? (
          !isEmpty ? (
            <AccordionContentContainer layoutScroll>
              {data.results.map((result, idx) => (
                <AccordionItemContentContainer layout key={idx}>
                  <AccordionContentPosterContainer onClick={() => onPosterItemClick(result.id!)}>
                    {result.backdrop_path ? (
                      <Image
                        fill
                        style={{ objectFit: "cover" }}
                        src={`${IMAGE_PIC_BASE_URL_W300}${result.backdrop_path}`}
                        alt={("title" in result && result.title) || ("name" in result && result.name) || ""}
                      />
                    ) : (
                      <FaQuestion
                        size="100%"
                        title={result && "title" in result ? result.title : ("name" in result && result.name) || ""}
                      />
                    )}
                    <RemoveButtonContainer
                      onClick={(e) => onRemoveItemClick(e, result.id!)}
                      title="Remove this item from list"
                    >
                      <HiOutlineTrash size={24} />
                    </RemoveButtonContainer>
                  </AccordionContentPosterContainer>
                  <AccordionContentTitle>
                    {result && "title" in result ? result.title : ("name" in result && result.name) || ""}
                  </AccordionContentTitle>
                </AccordionItemContentContainer>
              ))}
            </AccordionContentContainer>
          ) : (
            <EmptyListPlaceholderContainer>
              <DimmedItemDescription>{"No items to show. Try adding one to this list!"}</DimmedItemDescription>
              <IconContainer $gap="0.5rem" $flexDirection="column" $justifyContent="center" $alignItems="center">
                <GiTumbleweed size={32} />
                <DimmedItemDescription>{"No items"}</DimmedItemDescription>
              </IconContainer>
            </EmptyListPlaceholderContainer>
          )
        ) : isLoading ? (
          <AccordionItemSkeletonContainer>
            <AccordionItemSkeleton />
            <Col $gap="3px" m="8px 0px 0px 0px" $alignItems="flex-start">
              <AccordionItemTextSkeleton />
              <AccordionItemTextSkeleton />
            </Col>
          </AccordionItemSkeletonContainer>
        ) : (
          <EmptyListPlaceholderContainer>
            <DimmedItemDescription>{"Error getting the latest data. Try again later!"}</DimmedItemDescription>
            <IconContainer $gap="0.5rem" $flexDirection="column" $justifyContent="center" $alignItems="center">
              <BiErrorCircle size={32} />
              <DimmedItemDescription>{"No items"}</DimmedItemDescription>
            </IconContainer>
          </EmptyListPlaceholderContainer>
        )}
      </AccordionItemContent>
    </AccordionItemContainer>
  );
};

export default AccordionItem;
