import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

const fetchSuperHeroData = ({ queryKey }) => {
  //! make sure to destructure the param query key
  //! queryKey mimics the array passed as key to query
  const heroId = queryKey[1];
  return axios.get('http://localhost:4000/superheroes/' + heroId);
};

const useSuperHeroData = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery(['super-hero', heroId], fetchSuperHeroData, {
    initialData: () => {
      const cachedHeroesData = queryClient.getQueryData('super-heroes')?.data;

      const hero = cachedHeroesData?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return {
          data: hero,
        };
      } else {
        return undefined;
      }
    },
  });
};

export default useSuperHeroData;
