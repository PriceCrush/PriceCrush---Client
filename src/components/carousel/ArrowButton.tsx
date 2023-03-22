import {
  ArrowBaseButton,
  ArrowBaseButtonProps,
  NextArrow,
  PrevArrow,
} from '../stylecomponents/carousel.style';
import { CSSProperties } from 'styled-components';
import { MouseEventHandler } from 'react';

interface ArrowButtonProps extends ArrowBaseButtonProps {
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ArrowButton = ({
  className,
  style,
  onClick,
  direction,
  color,
  size,
}: ArrowButtonProps) => {
  return (
    <ArrowBaseButton
      size={size}
      color={color}
      direction={direction}
      className={className}
      style={{ ...style }}
      type="button"
      onClick={onClick}
    >
      {direction === 'next' ? (
        <NextArrow size={size} color={color} />
      ) : (
        <PrevArrow size={size} color={color} />
      )}
    </ArrowBaseButton>
  );
};
export default ArrowButton;
