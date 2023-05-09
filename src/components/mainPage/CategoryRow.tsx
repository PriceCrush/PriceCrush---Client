import * as S from '@/components/stylecomponents/mainPage.style';
import { useListpageSearchRouter } from '@/hooks/useListpageSearchRouter';
import { productCategoriesType } from '@/types/productsTypes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface CategoryRowProps {
  categories: productCategoriesType;
}

/**
 * @property categories {[]} - 해당 행에 표시할 카테고리를 담은 배열
 * @returns
 */
const CategoryRow = ({ categories }: CategoryRowProps) => {
  const router = useRouter();

  const goToCategoryProductsList = useCallback(
    (categoryId: string) => {
      router.push({
        pathname: `/search`,
        query: {
          categoryId,
        },
      });
    },
    [router]
  );

  return (
    <S.CategoryRow>
      {categories.map((category, index) => {
        return (
          <S.CategoryBox
            key={index}
            onClick={() => goToCategoryProductsList(category.id)}
          >
            <div>
              <Image
                src={String(category.imgurl)}
                alt="상품 카테고리"
                fill
                priority={true}
                sizes="12.5vw"
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
