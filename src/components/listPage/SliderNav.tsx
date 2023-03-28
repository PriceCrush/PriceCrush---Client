import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Category = {
  tab: number;
  category: string;
  img: string;
};
const samples: Category[] = [
  {
    tab: 1,
    category: '여성지갑',
    img: 'https://img.soldout.co.kr/items/2022/01/18/4914e863-485c-4ec3-8902-cce9a23c42a5.png/soldout/resize/564x564/optimize',
  },
  {
    tab: 2,
    category: '게임',
    img: 'https://img.soldout.co.kr/items/2022/04/04/08a4a275-47b2-4c50-8289-5221e589e411.png/soldout/resize/564x564/optimize',
  },
  {
    tab: 3,
    category: '테크',
    img: 'https://img.soldout.co.kr/items/2022/10/04/aaf8cf47-44a3-4cbb-a551-bd41fe703c1c.png/soldout/resize/564x564/optimize',
  },
  {
    tab: 4,
    category: '신발',
    img: 'https://img.soldout.co.kr/items/2023/03/14/d6bb4a91-2a64-42d0-a202-6460d93821f6.png/soldout/resize/564x564/optimize',
  },
  {
    tab: 5,
    category: '시계',
    img: 'https://img.soldout.co.kr/items/2022/12/27/c5569caf-d690-4d79-a07d-9704778b47b9.png/soldout/resize/564x564/optimize',
  },
  {
    tab: 6,
    category: '아우터',
    img: 'https://img.soldout.co.kr/items/2023/02/10/304866b8-8f93-4cdd-a54f-54fdd2a8e659.png/soldout/resize/564x564/optimize',
  },

  {
    tab: 7,
    category: '가방',
    img: 'https://img.soldout.co.kr/items/2022/06/03/67f2c5d1-c27f-40b6-b1fd-bdfd3127beab.png/soldout/resize/564x564/optimize',
  },
  {
    tab: 8,
    category: '악세사리',
    img: 'https://img.soldout.co.kr/items/2022/05/13/a6a13dc8-9cc7-4c77-a440-9cbe554bcafb.png/soldout/resize/564x564/optimize',
  },
  {
    tab: 9,
    category: '기타',
    img: 'https://img.soldout.co.kr/items/2022/02/22/a48705c3-2ca6-4255-87cc-90c98360c615.png/soldout/resize/564x564/optimize',
  },
];

type TabItemProps = {
  active: boolean;
  tab: number | string | undefined;
};

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

const SliderNav = (props: any) => {
  // listid에서  router로 params를 받음
  const { tab } = props;

  // 이거 해결해야함
  // tab === "all"일경우
  //{tab === "all"? true : false}

  // 해당되는 페이지에 true값 반환
  const checkCurrentPage = (id: number) => {
    let check = false;
    if (Number(tab) === id) {
      check = true;
    }
    return check;
  };

  return (
    <SliderNavLayOut>
      <ul>
        <TabItem active={true} tab={tab}>
          <TabLink href={`/search/all`}>
            <span>전체</span>
          </TabLink>
        </TabItem>

        {samples.map((sample, idx) => (
          // 해당페이지 param과 sample에있는 tab비교 => 향후 이건 생각을 해야할듯?
          <TabItem active={checkCurrentPage(sample.tab)} key={idx} tab={tab}>
            <TabLink href={`/search/${sample.tab}`}>
              <span> {sample.category}</span>
            </TabLink>
          </TabItem>
        ))}
      </ul>
      {/* <ul>
        <li>
          <Link href={`/search/여성가방`}>
            <span>여성가방</span>
          </Link>
        </li>
      </ul> */}
    </SliderNavLayOut>
  );
};

//폰트
const SliderNavLayOut = styled.div`
  > ul {
    max-width: 1280px;
    display: flex;
  }
`;

// const TabItem = styled.li<{ active: boolean }>`

// `;

const TabLink = styled.a`
  color: #222;
  cursor: pointer;
  display: flex;
  height: 30px;
  text-decoration: none;
`;

export default SliderNav;
