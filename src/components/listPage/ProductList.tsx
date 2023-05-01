import Image from 'next/image';
import React from 'react';
import styled, { css } from 'styled-components';
import { ProductFromApi } from '@/types/productsTypes';

interface ProductListProps {
  column: number;
  data: ProductFromApi[];
}

type ProductListLayOutProps = {
  column: number;
};

//nav에서 누른거 연결
// ex-> 가방이면 가방 9개 나오도록

const ProductList = ({ column, data }: ProductListProps) => {
  //페이지 네이션을 누를경우 여기 부분만 바뀌도록
  // column에 따라 grid-template-colmn과 slice의 숫자가 바뀌도록

  //카테고리별 나오게하는거
  // 데이터 필터링 -> nav바에 따라서
  // RecoilValue로 index.tsx 에서 받아옴

  // useEffect(() => {
  //   console.log(filtedData);
  // }, [filtedData]);
  //데이터 -> 그냥 db에 있는걸로 하자

  if (data && data.length > 0) {
    return (
      <ProductListLayOut column={column}>
        {/* 0~8 이부분 수정이 가능하도록  */}
        {data.map((item, idx) => {
          return (
            <ProductListBox key={idx}>
              <ProductBox>
                {/* 차후 link는 디테일로 가도록  */}
                <ProductInner href={`/auction/${item.id}`}>
                  <Product>
                    <Image
                      src={item.productCategory.imgurl}
                      alt="sample"
                      width={230}
                      height={230}
                    />
                  </Product>

                  {/* <p>{item.tab}</p> */}
                  <NameText>{item.name}</NameText>

                  <PriceBox>
                    <p>현재 경매가 </p>
                    <PriceParagraph>{`${Number(
                      item.start_price
                    ).toLocaleString()}원`}</PriceParagraph>
                  </PriceBox>
                </ProductInner>
              </ProductBox>
            </ProductListBox>
          );
        })}
      </ProductListLayOut>
    );
  }

  return (
    <ProductEmptyBox>
      <p>해당 카테고리에 데이터가 없습니다.</p>
    </ProductEmptyBox>
  );
};

const PriceBox = styled.div`
  margin-top: 12px;
  p:first-child {
    color: #666;
  }
`;

const PriceParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.color.DEEP_ORANGE};
`;

//색깔을 추가하긴 했지만 사실상 모양이 당근마켓이고 가격부분만 경매처럼 바뀔꺼같다
const Product = styled.div`
  background-color: ${({ theme }) => theme.color.LIGHT_GRAY};
  border-radius: 10px;
`;

const ProductBox = styled.div`
  > a {
  }

  > p {
    /* font-size: ${({ theme }) => theme.fontSize.md}; */
    font-size: 2rem;
  }
`;

const ProductInner = styled.a`
  text-decoration: none;
  color: inherit;
  > img {
    width: 100%;
    height: auto !important;
  }
`;
const NameText = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
`;

//column바뀔때마다 grid의 모양 변화
const ProductListLayOut = styled.div<ProductListLayOutProps>`
  width: 100%;

  ${({ column }) =>
    css`
      display: grid;
      grid-column-gap: 20px;
      grid-row-gap: 40px;
      grid-template-rows: auto;
      grid-template-columns: repeat(${column}, minmax(0, 1fr));
    `}
`;
const ProductListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* background-color: ${({ theme }) => theme.color.GRAY}; */
  /* opacity: 0.5; */
`;

const ProductEmptyBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

export default ProductList;
