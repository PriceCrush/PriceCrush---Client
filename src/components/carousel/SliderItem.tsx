import * as S from '@/components/stylecomponents/carousel.style';
import { ProductFromApi } from '@/types/productsTypes';
import Image from 'next/image';

import { useRouter } from 'next/router';

const SliderItem = ({
  product,
  centerIdx,
  curIdx,
  infiniteMode,
}: {
  product: ProductFromApi;
  centerIdx: number;
  curIdx: number;
  infiniteMode: boolean;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/auction/${product.id}`);
  };

  return (
    <S.SliderItemContainer
      className={infiniteMode && curIdx === centerIdx ? 'center' : 'side'}
      onClick={handleClick}
    >
      <S.SliderImageWrapper>
        <Image
          src={product.productCategory.imgurl}
          alt={product.name}
          fill
          sizes="300px"
        />
      </S.SliderImageWrapper>
      <S.DetailBox>
        <p>{product.name}</p>
        <p>{`${Number(product.start_price).toLocaleString()} 원`}</p>
      </S.DetailBox>
    </S.SliderItemContainer>
  );
};
export default SliderItem;
