import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsChevronCompactDown } from "react-icons/bs";
import { MovieCreditsDetails } from "../../../../../pages/api/movie/credits";
import { IMAGE_PIC_BASE_URL_W185 } from "../../../../utils/api/constants";
import { Col, IconContainer } from "../../../common";
import CastBoxSkeleton from "./CastBoxSkeleton";
import {
  CastBoxContainer,
  CastBoxItem,
  CastBoxItemDescription,
  CastBoxItemTitle,
  CastBoxSkeletonContainer,
  CastBoxSkeletonItemContainer,
  SubcategoryMainHeader,
} from "./styles";
import { TvCreditsDetails } from "../../../../../pages/api/tv/credits";

type Props = {
  mediaType: "movie" | "tv";
  cast: MovieCreditsDetails["cast"] | TvCreditsDetails["cast"] | undefined;
  isLoading: boolean;
};

const CastBox = ({ isLoading, cast, mediaType }: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleExpand = () => {
    setIsOpen((prev) => !prev);
  };

  if (!cast?.length) return null;

  return (
    <CastBoxContainer>
      <SubcategoryMainHeader>Cast</SubcategoryMainHeader>
      {isLoading ? (
        <CastBoxSkeleton />
      ) : (
        <>
          <CastBoxSkeletonContainer
            aria-expanded={isOpen}
            $shouldShowVignete={!isOpen}
            initial={{ height: 200 }}
            animate={{ height: isOpen ? "auto" : 200, transition: { duration: 1.5, ease: "easeInOut" } }}
          >
            {cast?.map((item) => (
              <CastBoxSkeletonItemContainer key={item.credit_id}>
                <CastBoxItem>
                  {item.profile_path ? (
                    <Image
                      title={`${item.name}`}
                      fill
                      src={`${IMAGE_PIC_BASE_URL_W185}${item.profile_path}`}
                      alt={`${item.name}-image`}
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    <FaUserCircle size="100%" title={`${item.name}`} />
                  )}
                </CastBoxItem>
                <Col $alignItems="flex-start" w="100%" $gap="2px 0">
                  <CastBoxItemTitle>{item.name}</CastBoxItemTitle>
                  <CastBoxItemDescription>{item.character}</CastBoxItemDescription>
                </Col>
              </CastBoxSkeletonItemContainer>
            ))}
          </CastBoxSkeletonContainer>
          <IconContainer
            aria-roledescription="Expand cast section"
            onClick={handleExpand}
            tabIndex={0}
            role="button"
            cursor="pointer"
            display="block"
            w="fit-content"
            m="0 auto"
            animate={{ rotate: isOpen ? 180 : 0 }}
          >
            <BsChevronCompactDown size={40} />
          </IconContainer>
        </>
      )}
    </CastBoxContainer>
  );
};

export default CastBox;
