import * as S from '@/components/stylecomponents/mainPage.style';
import Image from 'next/image';

interface CategoryRowProps {
  categories: any[];
}

/**
 * @property categories {[]} - 해당 행에 표시할 카테고리를 담은 배열
 * @returns
 */
const CategoryRow = ({ categories }: CategoryRowProps) => {
  return (
    <S.CategoryRow>
      {categories.map((category) => (
        <S.CategoryBox key={category}>
          <div>
            <Image
              src="/sample-shoes.png"
              alt="sample"
              width={100}
              height={100}
            />
          </div>
          <p>{category}</p>
        </S.CategoryBox>
      ))}
    </S.CategoryRow>
  );
};
export default CategoryRow;
