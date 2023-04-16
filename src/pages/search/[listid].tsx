import ProductList from '@/components/listPage/ProductList';

// import SearchSlider from '@/components/listPage/SearchSlider';
import SliderNav from '@/components/listPage/SliderNav';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import PaginationComponent from '@/components/listPage/PaginationComponent';

//이 타입은 추후 api가 들어올때 확정나기 때문에 우선보류
type Category = {
  tab: number;
  category: string;
  img: string;
};

const sampleCategory: Category[] = [
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

const ListPage = () => {
  // nav바
  const router = useRouter();

  const { listid } = router.query;

  //nav바

  // 이 페이지에서 주소와 주소에 맞는 데이터 정제해서 보내줌

  return (
    <ListPageWapper>
      <SliderSection>
        {/* <SliderNav
          tab={String(listid)}
          category={sampleCategory}
          data={sampleCategory}
        /> */}
        {/* <SearchSlider category={sampleCategory} /> */}
      </SliderSection>
      <ProductSection>
        {/* <ProductList
          column={4}
          data={sampleCategory}
          category={sampleCategory}
        /> */}
      </ProductSection>
      <PageButtonSection>
        {/* <PaginationComponent
          activePage
          itemsCountPerPage={5}
          totalItemsCount={10}
          pageRangeDisplayed={5}
        /> */}
      </PageButtonSection>
    </ListPageWapper>
  );
};

const PageButtonSection = styled.section`
  grid-area: pagebutton;
`;

const SliderSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 50px;
`;
const ProductSection = styled.section`
  display: flex;
  position: relative;
  padding: 70px 40px 60px 40px;
  margin: 25px auto 0 auto;
  border-top: 1px solid ${({ theme }) => theme.color.GRAY};
  max-width: 1280px;
`;
//
const ListPageWapper = styled.div``;

export default ListPage;
