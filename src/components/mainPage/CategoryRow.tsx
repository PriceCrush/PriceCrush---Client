import * as S from '@/components/stylecomponents/mainPage.style';
import { productCategoriesType } from '@/types/productsTypes';
import Image from 'next/image';

interface CategoryRowProps {
  categories: productCategoriesType;
}

/**
 * @property categories {[]} - 해당 행에 표시할 카테고리를 담은 배열
 * @returns
 */
const CategoryRow = ({ categories }: CategoryRowProps) => {
  return (
    <S.CategoryRow>
      {categories.map((category, index) => {
        return (
          <S.CategoryBox key={index}>
            <div>
              <Image
                src={String(category.imgurl)}
                alt="상품 카테고리"
                fill
                priority={true}
              />
            </div>
            <p>{category.name}</p>
          </S.CategoryBox>
        );
      })}
    </S.CategoryRow>
  );
};
export default CategoryRow;
