import React from "react";
import { IoStar, IoStarOutline, IoStarSharp } from "react-icons/io5";
import { Button, Col, Row } from "../../../common";
import InputNumber from "../../../Inputs/InputNumber";
import CircularLoader from "../../../Loaders/CircularLoader";
import {
  RatingContainer,
  RatingStarContainer,
  RatingStarsSetContainer,
  StarControllerBox,
  StarResponsiveController,
} from "./styles";

type Props = {
  onRateButtonClick: (rateValue: number) => void;
  sendingRating: boolean;
  totalStars?: number;
  precision?: number;
  minRate?: number;
  maxRate?: number;
};

const Rating = ({
  onRateButtonClick,
  totalStars = 5,
  precision = 0.25,
  minRate = 0.5,
  maxRate = 10,
  sendingRating,
}: Props) => {
  const STAR_FACTOR = maxRate / totalStars;
  const [activeStar, setActiveStar] = React.useState<number>(precision);
  const [hoverActiveStar, setHoverActiveStar] = React.useState<number>(-1);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const ratingContainerRef = React.useRef<HTMLDivElement | null>(null);

  const calculateRating = (e: React.MouseEvent) => {
    const { width, left } = ratingContainerRef.current!.getBoundingClientRect();
    let percent = (e.clientX - left) / width;
    const numberInStars = percent * totalStars;
    const nearestNumber = Math.round((numberInStars + precision / 2) / precision) * precision;

    return Number(nearestNumber.toFixed(precision.toString().split(".")[1]?.length || 0));
  };

  console.log("activeStar: ", activeStar);
  console.log("hover-activeStar: ", hoverActiveStar);

  const onInputRateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setActiveStar(minRate / STAR_FACTOR);
      return;
    }
    if (value > maxRate) {
      setActiveStar(maxRate / STAR_FACTOR);
      return;
    }
    if (value < 0) {
      setActiveStar(minRate / STAR_FACTOR);
      return;
    }
    setActiveStar(value / STAR_FACTOR);
  };

  const onInputRateBlur: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseFloat(e.target.value);
    if (isNaN(value)) {
      setActiveStar(minRate / STAR_FACTOR);
      return;
    }
    if (value > maxRate) {
      setActiveStar(maxRate / STAR_FACTOR);
      return;
    }
    if (value < minRate) {
      setActiveStar(minRate / STAR_FACTOR);
      return;
    }
  };

  const handleMouseMove: React.MouseEventHandler = (e) => {
    setIsHovered(true);
    setHoverActiveStar(calculateRating(e));
  };

  const handleClick: React.MouseEventHandler = (e) => {
    setIsHovered(false);
    setActiveStar(calculateRating(e));
  };

  const handleMouseLeave = () => {
    setHoverActiveStar(-1);
    setIsHovered(false);
  };

  return (
    <RatingContainer
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      key="rating-component"
    >
      <Col $gap="15px">
        <Row $gap="10px" $flexWrap="wrap">
          <RatingStarsSetContainer
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ratingContainerRef}
          >
            {[...new Array(totalStars)].map((_, idx) => {
              const activeState = isHovered ? hoverActiveStar : activeStar;
              const showEmptyIcon = activeState === -1 || activeState < idx + 1;
              const isActiveRating = activeState !== 1;
              const isRatingWithPrecision = activeState % 1 !== 0;
              const isRatingEqualToIndex = Math.ceil(activeState) === idx + 1;
              const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;
              return (
                <RatingStarContainer role="button" key={idx}>
                  <StarControllerBox $width={showRatingWithPrecision ? `${(activeState % 1) * 100}%` : "0%"}>
                    <IoStarSharp />
                  </StarControllerBox>
                  <StarResponsiveController>
                    {showEmptyIcon ? <IoStarOutline /> : <IoStarSharp />}
                  </StarResponsiveController>
                </RatingStarContainer>
              );
            })}
          </RatingStarsSetContainer>
          <InputNumber
            maxWidth="80px"
            max={maxRate}
            min={minRate}
            step={precision}
            onBlur={onInputRateBlur}
            onChange={onInputRateChange}
            value={activeStar * STAR_FACTOR}
          />
        </Row>
        <Button onClick={() => onRateButtonClick((activeStar * maxRate) / totalStars)} title={`Rate ${activeStar}/5`}>
          {<Row>{sendingRating ? <CircularLoader /> : "Rate!"}</Row>}
        </Button>
      </Col>
    </RatingContainer>
  );
};

export default Rating;
