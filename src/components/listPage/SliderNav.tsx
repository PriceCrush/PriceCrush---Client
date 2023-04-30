import {
  searchAndCategoriesState,
  selectedCategory,
} from '@/atoms/searchAndCategoriesState';
import { productCategoryType } from '@/types/productsTypes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
  padding-right: 27px;
  font-weight: ${({ active }) => (active ? '700' : '400')};

  font-size: ${({ theme }) => theme.fontSize.lg};
  cursor: pointer;
  // 여기 부분은 너무 긴밀해지니까 수정해야할듯?
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
  const [categoryAndSearchTerm, setCategroyAndSearchTerm] = useRecoilState(
    searchAndCategoriesState
  );
  const currentCategory = useRecoilValue(selectedCategory);

  // listid에서  router로 params를 받음
  // const { tab, data } = props;
  //all일경우 전체부분이 굵은 글씨가 되도록 해야함

  //3. function
  // const checkCurrentPage = (id: number) => {
  //   let check = false;
  //   if (Number(tab) === id) {
  //     check = true;
  //   }
  //   return check;
  // };

  // nav클릭 -> 데이터 전송 -> 받은 데이터 -> 화면출력
  // 2번째를 axios를 이용해서 정보를 보내고
  //

  return (
    <SliderNavLayOut>
      <ul>
        <TabItem active={currentCategory === 'all'}>
          <TabLink
            href={{
              pathname: `search`,
              query: {
                categoryId: 'all',
              },
            }}
          >
            <span>전체</span>
          </TabLink>
        </TabItem>
        {/* {data.map((sample, idx) => (
          // 해당페이지 param과 sample에있는 tab비교 => 향후 이건 생각을 해야할듯?
          <TabItem active={checkCurrentPage(sample.tab)} key={idx} tab={tab}>
            <TabLink href={`/search/${sample.tab}`}>
              <span> {sample.category}</span>
            </TabLink>
          </TabItem>
        ))} */}
        {category.map((item, index) => (
          <TabItem active={currentCategory === item.id} key={index}>
            <TabLink
              href={{
                pathname: '/search',
                query: {
                  categoryId: item.id,
                },
              }}
            >
              {item.name}
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
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.GRAY};
  > ul {
    max-width: 1280px;
    display: flex;
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
