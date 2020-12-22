import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  border: 1px solid #bfbfbf;
  margin: 2rem 0;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid #bfbfbf;
    text-decoration: none;
    &[aria-current],
    &.current {
      color: var(--red);
      font-weight: bold;
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPages;
  const hasPreviousPage = previousPage >= 1;
  return (
    <PaginationStyles>
      <Link disabled={!hasPreviousPage} to={`${base}/${previousPage}`}>
        &#8592; Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`${base}/${i > 0 ? i + 1 : ''}`}
          key={`page${i}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next &#8594;
      </Link>
    </PaginationStyles>
  );
}
