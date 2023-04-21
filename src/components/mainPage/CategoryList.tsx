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
  const count = Math.ceil(categories.length / rows);

  const rowArray = Array.from(Array(rows).keys()).map((rowNumber) =>
    categories.slice(rowNumber * count, (rowNumber + 1) * count)
  );

  return (
    <>
      {rowArray.map((categoryRow, index) => (
        <CategoryRow key={index} categories={categoryRow} />
      ))}
    </>
  );
};
export default CategoryList;
