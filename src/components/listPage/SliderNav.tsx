import { selectedCategory } from '@/atoms/searchAndCategoriesState';
import { productCategoryType } from '@/types/productsTypes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

// 1. 타입
type SliderNavProps = {
  category: productCategoryType[];
};

type TabItemProps = {
  active: boolean;
};

// 2. styledComponent
const StyledTabItem = styled.li<{ active: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  /* padding-right: 27px; */
  font-weight: ${({ active }) => (active ? '700' : '400')};

  font-size: ${({ theme }) => theme.fontSize.xl};
  cursor: pointer;

  > a {
    border-bottom: ${({ active }) => (active ? '2px solid #222' : 'none')};
  }
`;

function TabItem({ active, children }: React.PropsWithChildren<TabItemProps>) {
  return <StyledTabItem active={active}>{children}</StyledTabItem>;
}

/**
 * @description 렌더 함수
 * @returns
 */
const SliderNav = ({ category }: SliderNavProps) => {
  const currentCategory = useRecoilValue(selectedCategory);
  const router = useRouter();
  const { searchTerm } = router.query;

  return (
    <SliderNavLayOut>
      <ul>
        <TabItem active={currentCategory === 'all'}>
          <TabLink
            href={{
              pathname: `search`,
              query: {
                categoryId: 'all',
                searchTerm,
              },
            }}
          >
            <span>전체</span>
          </TabLink>
        </TabItem>

        {category.map((item, index) => (
          <TabItem active={currentCategory === item.id} key={index}>
            <TabLink
              href={{
                pathname: '/search',
                query: {
                  categoryId: item.id,
                  searchTerm,
                },
              }}
            >
              <span>{item.name}</span>
            </TabLink>
          </TabItem>
        ))}
      </ul>
    </SliderNavLayOut>
  );
};

//폰트
const SliderNavLayOut = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.GRAY};
  > ul {
    max-width: 1280px;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

const TabLink = styled(Link)`
  color: #222;
  cursor: pointer;
  display: flex;
  height: 30px;
  text-decoration: none;
`;

export default SliderNav;
