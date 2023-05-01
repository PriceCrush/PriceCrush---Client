import ProductList from '@/components/listPage/ProductList';
import SliderNav from '@/components/listPage/SliderNav';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import * as S from '@/components/stylecomponents/searchAndCategoryItems/searchList.style';
import PaginationComponent from '@/components/listPage/PaginationComponent';
import Searchslider from '@/components/listPage/Searchslider';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoriesState } from '@/atoms/categoriesState';
import {
  searchAndCategoriesState,
  selectedCategory,
} from '@/atoms/searchAndCategoriesState';
import { Api } from '@/utils/commonApi';
import {
  filteredProductsByCategoryState,
  productFromServerState,
} from '@/atoms/productsFromServerState';
import { GetServerSideProps } from 'next';
import { ProductFromApi } from '@/types/productsTypes';

export const getServerSideProps: GetServerSideProps<{
  data: ProductFromApi[];
}> = async () => {
  const wholeProductData = await Api.get('/product');
  return {
    props: {
      data: wholeProductData,
    },
  };
};

interface ListPageProps {
  data: ProductFromApi[];
}

const ListPage = ({ data }: ListPageProps) => {
  const productCategories = useRecoilValue(categoriesState);
  const [categoryAndSearchTerm, setCategroyAndSearchTerm] = useRecoilState(
    searchAndCategoriesState
  );
  const [wholeProductFromServer, setWholeProductFromServer] = useRecoilState(
    productFromServerState
  );
  const currentCategory = useRecoilValue(selectedCategory);
  const filteredProducts = useRecoilValue(
    filteredProductsByCategoryState(currentCategory)
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
    setWholeProductFromServer(data);
  }, [wholeProductFromServer, data, setWholeProductFromServer]);

  return (
    <S.ListPageWapper>
      <S.SliderSection>
        <SliderNav category={productCategories} />
        <Searchslider category={productCategories} />
      </S.SliderSection>
      <S.ProductSection>
        <ProductList column={4} data={filteredProducts} />
      </S.ProductSection>
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
