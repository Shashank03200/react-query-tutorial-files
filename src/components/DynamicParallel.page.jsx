import { useQueries } from 'react-query';
import axios from 'axios';

const fetchSuperhero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperhero(id),
      };
    })
  );

  console.log(queryResults);

  return <div>Dynamic Parallel Page</div>;
};

export default DynamicParallelPage;
