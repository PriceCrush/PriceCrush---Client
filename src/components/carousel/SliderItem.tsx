import styled from 'styled-components';
import COLOR from '@/colors/color';
import { SliderItemProps } from '@/types/sliderItemTypes';
import Image from 'next/image';

const Div = styled.div`
  width: 300px;
  height: 300px;
  text-align: center;
  background-color: ${COLOR.ORANGE};
  display: inline-block;
  margin: 0 auto;
  position: relative;
`;

const InfoBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSize.xl};
`;

const SliderItem = ({ thumbnail, centerIdx, curIdx }: SliderItemProps) => {
  return (
    <Div className={curIdx === centerIdx ? 'center' : 'side'}>
      <Image
        alt=""
        width={300}
        height={300}
        src={thumbnail!}
        loading="eager"
        priority
        sizes="300px"
        placeholder="blur"
        blurDataURL={thumbnail}
      />
      <InfoBox>{curIdx}</InfoBox>
    </Div>
  );
};
export default SliderItem;
