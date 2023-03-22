import * as S from '../stylecomponents/carousel.style';
import { CSSProperties } from 'styled-components';
import { MouseEventHandler } from 'react';

interface ArrowButtonProps extends S.ArrowBaseButtonProps {
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
    <S.ArrowBaseButton
      size={size}
      color={color}
      direction={direction}
      className={className}
      style={{ ...style }}
      type="button"
      onClick={onClick}
    >
      {direction === 'next' ? (
        <S.NextArrow size={size} color={color} />
      ) : (
        <S.PrevArrow size={size} color={color} />
      )}
    </S.ArrowBaseButton>
  );
};
export default ArrowButton;
