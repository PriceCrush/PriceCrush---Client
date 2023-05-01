import ProductList from '@/components/listPage/ProductList';

// import SearchSlider from '@/components/listPage/SearchSlider';
import SliderNav from '@/components/listPage/SliderNav';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as S from '@/components/stylecomponents/searchAndCategoryItems/searchList.style';
import PaginationComponent from '@/components/listPage/PaginationComponent';
import Searchslider from '@/components/listPage/Searchslider';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoriesState } from '@/atoms/categoriesState';
import { searchAndCategoriesState } from '@/atoms/searchAndCategoriesState';
import { Api } from '@/utils/commonApi';
import { productFromServerState } from '@/atoms/productsFromServerState';

//이 타입은 추후 api가 들어올때 확정나기 때문에 우선보류
// type Category = {
//   tab: number;
//   category: string;
//   img: string;
// };

// const sampleCategory: Category[] = [
//   {
//     tab: 1,
//     category: '여성지갑',
//     img: 'https://img.soldout.co.kr/items/2022/01/18/4914e863-485c-4ec3-8902-cce9a23c42a5.png/soldout/resize/564x564/optimize',
//   },

//   {
//     tab: 2,
//     category: '게임',
//     img: 'https://img.soldout.co.kr/items/2022/04/04/08a4a275-47b2-4c50-8289-5221e589e411.png/soldout/resize/564x564/optimize',
//   },
//   {
//     tab: 3,
//     category: '테크',
//     img: 'https://img.soldout.co.kr/items/2022/10/04/aaf8cf47-44a3-4cbb-a551-bd41fe703c1c.png/soldout/resize/564x564/optimize',
//   },
//   {
//     tab: 5,
//     category: '시계',
//     img: 'https://img.soldout.co.kr/items/2022/12/27/c5569caf-d690-4d79-a07d-9704778b47b9.png/soldout/resize/564x564/optimize',
//   },
//   {
//     tab: 6,
//     category: '아우터',
//     img: 'https://img.soldout.co.kr/items/2023/02/10/304866b8-8f93-4cdd-a54f-54fdd2a8e659.png/soldout/resize/564x564/optimize',
//   },

//   {
//     tab: 7,
//     category: '가방',
//     img: 'https://img.soldout.co.kr/items/2022/06/03/67f2c5d1-c27f-40b6-b1fd-bdfd3127beab.png/soldout/resize/564x564/optimize',
//   },
//   {
//     tab: 8,
//     category: '악세사리',
//     img: 'https://img.soldout.co.kr/items/2022/05/13/a6a13dc8-9cc7-4c77-a440-9cbe554bcafb.png/soldout/resize/564x564/optimize',
//   },
//   {
//     tab: 9,
//     category: '기타',
//     img: 'https://img.soldout.co.kr/items/2022/02/22/a48705c3-2ca6-4255-87cc-90c98360c615.png/soldout/resize/564x564/optimize',
//   },
// ];

const ListPage = () => {
  const productCategories = useRecoilValue(categoriesState);
  const [categoryAndSearchTerm, setCategroyAndSearchTerm] = useRecoilState(
    searchAndCategoriesState
  );
  const [wholeProductFromServer, setWholeProductFromServer] = useRecoilState(
    productFromServerState
  );

  // nav바
  const router = useRouter();
  // PaginationComponent onChange를 위한 임시
  const handlePage = () => {
    console.log('');
  };

  /**
   * @description 카테고리 id를 추적해 Recoil의 searchAndCategoriesState에 저장
   */
  useEffect(() => {
    const { categoryId } = router.query;
    if (categoryId) {
      setCategroyAndSearchTerm((prev) => ({
        ...prev,
        categoryId: String(categoryId),
      }));
    }
  }, [router.query]);

  /**
   * @description 서버에서 전체 상품 데이터 요청, 현재 카테고리별 상품 데이터 요청 API 없어 전체 데이터를 핸들링
   */
  useEffect(() => {
    const getWholeProductData = async () => {
      const wholeProductData = await Api.get('/product');
      // TODO: 현재 CORS로인해 요청이 막힘 -> CORS 에러 해결 후 에러부분 수정할 것!!
      if (wholeProductData) {
        setWholeProductFromServer(wholeProductData);
      }
    };
    getWholeProductData();
  }, []);

  return (
    <S.ListPageWapper>
      <S.SliderSection>
        <SliderNav category={productCategories} />
        <Searchslider category={productCategories} />
      </S.SliderSection>
      <S.ProductSection></S.ProductSection>
      <S.PageButtonSection>
        <PaginationComponent
          activePage={5}
          onChange={handlePage}
          itemsCountPerPage={5}
          totalItemsCount={10}
          pageRangeDisplayed={5}
        />
      </S.PageButtonSection>
    </S.ListPageWapper>
  );
};

export default ListPage;
