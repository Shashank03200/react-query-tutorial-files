import React, { useState } from 'react';

import useSuperHeroesData, { useAddSuperheroData } from '../../hooks/useSuperHeroesData';
import { Link } from 'react-router-dom';

const onSuccessHandler = (data) => {
  console.log('Perform side after the data fetching');
  console.log(data);
};
// useQuery retries three times before calling the onError sideffect
const onErrorHandler = (error) => {
  console.log('Perform side after the encountering error');
  console.log(error);
};

const RQSuperHeroes = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const {
    superheroesData,
    getSuperheroesData,
    superheroesDataLoading,
    superheroesFetching,
    superheroesError,
  } = useSuperHeroesData(onSuccessHandler, onErrorHandler);

  const { mutate: addSuperHeroMutation, isLoading: addSuperHeroLoading } = useAddSuperheroData();
  const heroAddHandler = () => {
    addSuperHeroMutation({ name, alterEgo });
  };
  if (superheroesDataLoading) {
    return <h2>Loading...</h2>;
  }

  if (superheroesError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>RQ Super Heroes page</h2>
        <button
          style={{ padding: '8px 10px' }}
          onClick={heroAddHandler}>
          Add hero
        </button>
      </div>

      <form
        action=""
        style={{
          display: 'grid',
          gridTemplateColumns: '0.4fr 0.6fr',
          gridAutoRows: 40,
          rowGap: '12px',
        }}>
        <label
          htmlFor="heroNameInput"
          style={{ paddingLeft: '20px' }}>
          Enter hero name
        </label>
        <input
          type="text"
          name="heroName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="heroNameInput"
        />{' '}
        <label
          htmlFor="heroAlterEgoInput"
          style={{ paddingLeft: '20px' }}>
          Enter hero alter ego
        </label>
        <input
          type="text"
          name="heroAlterEgo"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
          id="heroAlterEgoInput"
        />
      </form>

      <button>Fetch superheroes</button>
      {superheroesFetching ? (
        <p>Loading....</p>
      ) : (
        <div>
          {superheroesData?.data?.map((hero) => (
            <li key={hero.id}>
              <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
            </li>
          ))}
        </div>
      )}
    </>
  );
};

export default RQSuperHeroes;
