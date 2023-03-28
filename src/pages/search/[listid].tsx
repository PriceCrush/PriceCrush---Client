import Searchslider from '@/components/listPage/Searchslider';
import SliderNav from '@/components/listPage/sliderNav';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Category = {
  category: string;
  img: string;
};

const sampleCategoryImgs: Category[] = [
  {
    category: '여성지갑',
    img: 'https://img.soldout.co.kr/items/2022/01/18/4914e863-485c-4ec3-8902-cce9a23c42a5.png/soldout/resize/564x564/optimize',
  },
  {
    category: '게임',
    img: 'https://img.soldout.co.kr/items/2022/04/04/08a4a275-47b2-4c50-8289-5221e589e411.png/soldout/resize/564x564/optimize',
  },
  {
    category: '테크',
    img: 'https://img.soldout.co.kr/items/2022/10/04/aaf8cf47-44a3-4cbb-a551-bd41fe703c1c.png/soldout/resize/564x564/optimize',
  },
  {
    category: '신발',
    img: 'https://img.soldout.co.kr/items/2023/03/14/d6bb4a91-2a64-42d0-a202-6460d93821f6.png/soldout/resize/564x564/optimize',
  },
  {
    category: '시계',
    img: 'https://img.soldout.co.kr/items/2022/12/27/c5569caf-d690-4d79-a07d-9704778b47b9.png/soldout/resize/564x564/optimize',
  },
  {
    category: '아우터',
    img: 'https://img.soldout.co.kr/items/2023/02/10/304866b8-8f93-4cdd-a54f-54fdd2a8e659.png/soldout/resize/564x564/optimize',
  },

  {
    category: '가방',
    img: 'https://img.soldout.co.kr/items/2022/06/03/67f2c5d1-c27f-40b6-b1fd-bdfd3127beab.png/soldout/resize/564x564/optimize',
  },
  {
    category: '악세사리',
    img: 'https://img.soldout.co.kr/items/2022/05/13/a6a13dc8-9cc7-4c77-a440-9cbe554bcafb.png/soldout/resize/564x564/optimize',
  },
  {
    category: '기타',
    img: 'https://img.soldout.co.kr/items/2022/02/22/a48705c3-2ca6-4255-87cc-90c98360c615.png/soldout/resize/564x564/optimize',
  },
];

const listPage = () => {
  // nav바
  const router = useRouter();
  const { listid } = router.query;
  //nav바

  return (
    <Menu>
      <SliderContainer>
        <SliderNav tab={listid} />
        <Searchslider />
        {/* nav바 */}

        {/* 상품리스트 */}
      </SliderContainer>
      {/* <ProductSection>
        <ProductBox>

        </ProductBox>
      </ProductSection> */}
    </Menu>
  );
};

const SliderContainer = styled.div`
  margin-top: 50px;
`;
//
const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default listPage;
