import React from 'react';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';

const StyledPagination = styled.div<{ active: boolean }>`
  > ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    li {
      font-size: ${({ theme }) => theme.fontSize.md};
      list-style: none;
      margin: 0 5px;
      a {
        display: block;
        padding: 8px 15px;
        color: ${({ active }) => (active ? '#fff' : '#333')};
        background-color: ${({ active }) => (active ? '#333' : '#fff')};
        border: 1px solid #ccc;
        border-radius: 3px;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.3s ease;
        &:hover {
          background-color: #333;
          color: #fff;
        }
      }
    }
    //시작 , 끝 2번째까지 적용되도록 바꾸자
    li:first-child a,
    li:last-child a {
      border: none;
      font-size: ${({ theme }) => theme.fontSize.lg};

      padding: 8px;
    }
  }
`;
//react-js-pagination 사용

interface PaginationComponentProps {
  activePage: number;
  totalItemsCount: number;
  onChange: (pageNumber: number) => void;
  itemsCountPerPage?: number | undefined;
  pageRangeDisplayed: number;
}

const PaginationComponent = (props: PaginationComponentProps) => {
  const {
    activePage,
    itemsCountPerPage,
    totalItemsCount,
    onChange,
    pageRangeDisplayed,
  } = props;

  return (
    <StyledPagination active={false}>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        onChange={onChange}
        itemClass="page-item"
        linkClass="page-link"
        activeClass="active"
      />
    </StyledPagination>
  );
};

export default PaginationComponent;
