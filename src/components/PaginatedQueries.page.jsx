import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const fetchColors = ({ queryKey }) => {
  const pageNumber = queryKey[1];

  return axios.get(`http://localhost:4000/colors?_limit=${4}&_page=${pageNumber}`);
};

const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, isError, error, data } = useQuery(['colors', pageNumber], fetchColors, {
    keepPreviousData: true,
    //! Keeping this flag keepPreviousData true will maintain the previous data while fetching new page data and not display loading state
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
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id} {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={() => setPageNumber((page) => page - 1)}>Prev Page</button>
        <button
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}>
          Next Page
        </button>
      </div>
    </>
  );
};

export default PaginatedQueries;
