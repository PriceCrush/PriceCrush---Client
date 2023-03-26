import CategoryRow from './CategoryRow';

interface CategoryListProps {
  rows: number;
}

/**
 * @property rows {number} - 몇 줄의 행으로 나타낼지 입력
 * @returns
 */
const CategoryList = ({ rows }: CategoryListProps) => {
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
  const count = Math.ceil(arr.length / rows);

  return (
    <>
      {Array.from(Array(rows).keys()).map((rowNumber) => (
        <CategoryRow
          key={rowNumber}
          categories={arr.slice(rowNumber * count, (rowNumber + 1) * count)}
        />
      ))}
    </>
  );
};
export default CategoryList;
