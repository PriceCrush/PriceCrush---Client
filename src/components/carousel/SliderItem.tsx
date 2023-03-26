import * as S from '@/components/stylecomponents/carousel.style';
import { Product } from './MainPageCarousel';

const SliderItem = ({
  product,
  centerIdx,
  curIdx,
}: {
  product: Product;
  centerIdx: number;
  curIdx: number;
}) => {
  return (
    <S.SliderItemContainer className={curIdx === centerIdx ? 'center' : 'side'}>
      <S.SliderImageWrapper>
        <img src={product.images.main} alt={product.productName} />
      </S.SliderImageWrapper>
      <S.DetailBox>
        <p>{product.ownerName}</p>
        <p>{product.productName}</p>
        <p>{`${Number(product.currentPrice).toLocaleString()} 원`}</p>
      </S.DetailBox>
    </S.SliderItemContainer>
  );
};
export default SliderItem;
