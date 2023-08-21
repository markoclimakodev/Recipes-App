import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoritesRecipes from './pages/FavoritesRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

import './App.css';
import { RecipesProvider } from './context/recipesContext';

function App() {
  return (
    <RecipesProvider>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route element={ <Layout /> }>
          <Route path="/meals" element={ <Meals /> } />
          <Route path="/drinks" element={ <Drinks /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/done-recipes" element={ <DoneRecipes /> } />
          <Route path="/favorite-recipes" element={ <FavoritesRecipes /> } />
        </Route>
      </Routes>
    </RecipesProvider>
  );
}

export default App;
