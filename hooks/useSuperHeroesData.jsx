import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

//! function which returns a promise
const fetchSuperheroes = () => {
  return axios.get('http://localhost:4000/superheroes');
};
const useSuperHeroesData = (onSuccessHandler, onErrorHandler) => {
  const {
    isLoading: superheroesDataLoading,
    refetch: getSuperheroesData,
    data: superheroesData,
    isError: superheroesError,
    error,
    isFetching: superheroesFetching,
  } = useQuery('super-heroes', fetchSuperheroes, {
    // cacheTime: 5000, //* default cacheTime : 300000
    // staleTime: 10000, //* default staleTime: 0
    // refetchInterval: 2000,

    onSuccess: onSuccessHandler,
    onError: onErrorHandler,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => hero.name);
    //   return superHeroNames;
    // },
  });

  return {
    superheroesData,
    getSuperheroesData,
    superheroesDataLoading,
    superheroesFetching,
    superheroesError,
  };
};

const addSuperHero = (hero) => {
  return axios.post('http://localhost:4000/superheroes', hero);
};

export const useAddSuperheroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      // data refers to the entire response of the post request
      /** Query Invalidation Start */
      console.log('Add success');
      // queryClient.invalidateQueries('super-heroes');
      /** Query Invalidation End */

      //! Step 1 : Update query data.
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        //! Step 2 : update the query data by appending the data response with the old query data
        console.log('data', data);
        console.log('oldQueryData', oldQueryData);

        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data],
        };
      });
    },
  });
};

export default useSuperHeroesData;
