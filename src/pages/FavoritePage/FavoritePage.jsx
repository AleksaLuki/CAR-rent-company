import css from './FavoritePage.module.css';
import FavoriteCard from '../../components/FavoriteCard/FavoriteCard';

const FavoritePage = () => {
  const favoriteLocalStorage = localStorage.getItem('favorite');
  const favorite = JSON.parse(favoriteLocalStorage);

  return (
    <main className={css.container}>
      <FavoriteCard favorite={favorite} />
    </main>
  );
};

export default FavoritePage;
