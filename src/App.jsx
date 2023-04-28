import HomePage from './components/Home.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import SuperHeroesPage from './components/SuperHeroes.page';

import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';

import './App.css';
import RQSuperHeroPage from './components/RQSuperHero.page';
import ParallelQueriesPage from './components/ParallelQueries.page';
import DynamicParallelPage from './components/DynamicParallel.page';
import DependentPage from './components/DependentQueries.page';
import PaginatedQueries from './components/PaginatedQueries.page';
import InfiniteQueries from './components/InfiniteQueries.page';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/rq-infinite"
            element={<InfiniteQueries />}
          />
          <Route
            path="/rq-paginated"
            element={<PaginatedQueries />}
          />
          <Route
            path="/rq-dependent"
            element={<DependentPage email="vishwas@example.com" />}
          />
          <Route
            path="/rq-dynamic-parallel"
            element={<DynamicParallelPage heroIds={[1, 3]} />}
          />
          <Route
            path="/rq-parallel"
            element={<ParallelQueriesPage />}
          />
          <Route
            path="/rq-super-heroes/:heroId"
            element={<RQSuperHeroPage />}
          />
          <Route
            path="/super-heroes"
            element={<SuperHeroesPage />}></Route>
          <Route
            path="/rq-super-heroes"
            element={<RQSuperHeroesPage />}></Route>
          <Route
            path="/"
            element={<HomePage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
