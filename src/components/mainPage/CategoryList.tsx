import { productCategoriesType } from '@/types/productsTypes';
import CategoryRow from './CategoryRow';

interface CategoryListProps {
  categories: productCategoriesType;
  rows: number;
}

/**
 * @property rows {number} - 몇 줄의 행으로 나타낼지 입력
 * @returns
 */
const CategoryList = ({ categories, rows }: CategoryListProps) => {
  console.log(categories);
  const arr = [
    '신발',
    '의류',
    '디지털',
    '그림',
    '미술',
    '2신발',
    '2의류',
    '2디지털',
    '2그림',
    '2미술',
  ];
  const count = Math.ceil(categories.length / rows);

  const rowArray = Array.from(Array(rows).keys()).map((rowNumber) =>
    categories.slice(rowNumber * count, (rowNumber + 1) * count)
  );

  return (
    <>
      {rowArray.map((categoryRow, index) => (
        <CategoryRow
          key={index}
          categories={categoryRow.map((category) => category.name)}
        />
      ))}
    </>
  );
};
export default CategoryList;
