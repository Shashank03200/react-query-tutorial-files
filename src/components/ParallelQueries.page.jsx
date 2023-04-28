import axios from 'axios';
import { useQuery } from 'react-query';

const fetchSuperheroes = () => {
  axios.get('http://localhost:4000/superheroes');
};
const fetchFriends = () => {
  axios.get('https://localhost:4000/friends');
};

export const ParallelQueriesPage = () => {
  const { data: superheroesData } = useQuery('super-heroes', fetchSuperheroes);
  const { data: friendsData } = useQuery('friends', fetchFriends);

  return (
    <div>
      <h1>Parallel Queries Page</h1>
    </div>
  );
};

export default ParallelQueriesPage;
