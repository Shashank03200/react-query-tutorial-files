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
  return axios.post('http://localhost:4000/superheroes2', hero);
};

export const useAddSuperheroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      //* This callback is called before the mutation function is called and passed the same arguments as passed in mutation function

      //* Cancel outgoing refetches to avoid overrides
      await queryClient.cancelQueries('super-heroes');
      const previousHeroData = queryClient.getQueryData('super-heroes');

      //* Update the data in query client
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          //! also need to insert id with new data in
          //TODO OPTIMISTIC UPDATES
          data: [
            ...oldQueryData.data,
            {
              id: oldQueryData?.data?.length + 1,
              ...newHero,
            },
          ],
        };
      });

      return {
        previousHeroData,
      };
    },
    onError: (_error, _home, context) => {
      queryClient.setQueryData('super-heroes', context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes');
    },
  });
};

export default useSuperHeroesData;
