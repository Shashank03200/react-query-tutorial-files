import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';

const fetchColors = ({ pageParam = 1 }) => {
  //TODO useInfiniteQuery
  //* injects some additional value in api function
  //* additional pargeParam paramter which is similar to current page number
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueries = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(['colors'], fetchColors, {
    //! Keeping this flag keepPreviousData true will maintain the previous data while fetching new page data and not display loading state
    getNextPageParam: (lastPage, pages) => {
      // pages refers to an array of api responses where each response to fetching two colors at a time
      // we have to determine how to determine how to increase the pageParam value
      // 8 colors => 2 colors per page => 4 pages iin total

      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        // reached last page / end
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map((color) => {
                return (
                  <h2 key={color.id}>
                    {color.id} - {color.label}
                  </h2>
                );
              })}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button
          onClick={fetchNextPage}
          disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
};

export default InfiniteQueries;
