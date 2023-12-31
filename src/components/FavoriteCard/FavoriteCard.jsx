import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose, AiFillHeart } from 'react-icons/ai';
import { axiosCarsFilter } from '../../axios/axios';
import css from '../CarCardList/CarCardList.module.css';

const rootElement = document.getElementById('root');
Modal.setAppElement(rootElement);

const FavoriteCard = () => {
  const [findCar, setFindCar] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [favorite, setFavorite] = useState(
    JSON.parse(window.localStorage.getItem('favorite')) ?? []
  );

  useEffect(() => {
    const favoriteStringify = JSON.stringify(favorite);
    localStorage.setItem('favorite', favoriteStringify);
  }, [favorite]);

  const handleFavoriteCar = carId => {
    if (favorite.length === 0) {
      const favoriteCar = favorite.find(car => car.id === carId);
      setFavorite(prevFavorite => [...prevFavorite, favoriteCar]);
      return;
    }
    const isFavorite = favorite.find(car => car.id === carId);
    if (isFavorite) {
      const index = favorite.indexOf(isFavorite);
      const newFavorite = [...favorite];
      newFavorite.splice(index, 1);
      setFavorite(newFavorite);
    } else {
      const favoriteCar = favorite.find(car => car.id === carId);
      setFavorite(prevFavorite => [...prevFavorite, favoriteCar]);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFindCar('');
  };

  const getCity = address => {
    const city = address.split(',');
    if (city.length >= 2) {
      return city[1];
    } else {
      return '';
    }
  };
  const getCountry = address => {
    const city = address.split(',');
    if (city.length >= 2) {
      return city[2];
    } else {
      return '';
    }
  };
  const getConditions = conditions => {
    const conditionArray = conditions.split('\n');
    return conditionArray;
  };

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 10,
    },
    content: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: 541,
      height: 752,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      marginTop: 40,
      padding: 0,
      paddingTop: 40,
      paddingBottom: 40,
      paddingLeft: 40,
      paddingRight: 40,
      transform: 'translate(-50%, -50%)',
      borderRadius: 24,
      background: '#FFF',
    },
  };
  const handleLearnMore = carId => {
    setModalIsOpen(true);
    const fetchData = async () => {
      try {
        const data = await axiosCarsFilter();
        const findCar = data.find(car => car.id === carId);
        setFindCar(findCar);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  };

  return (
    <>
      <ul className={css.listFavorite}>
        {favorite.map(favorite => (
          <li className={css.card} key={favorite.id}>
            <img className={css.image} src={favorite.img} alt="car" />
            <button
              className={css.buttonFavorite}
              type="button"
              onClick={() => handleFavoriteCar(favorite.id)}
            >
              <AiFillHeart className={css.heart} style={{ color: 'blue' }} />
            </button>
            <div className={css.textContainerFirst}>
              <div>
                <span className={css.textSubtitle}>{favorite.make}, </span>
                <span className={css.textSubtitle}>{favorite.year}</span>
              </div>
              <span className={css.textSubtitle}>{favorite.rentalPrice}</span>
            </div>
            <div className={css.textContainerSecond}>
              <span className={css.text}>{getCity(favorite.address)}</span>
              <div className={css.stick}></div>
              <span className={css.text}>{getCountry(favorite.address)}</span>
              <div className={css.stick}></div>
              <span className={css.text}>{favorite.rentalCompany}</span>
            </div>
            <div className={css.textContainerThird}>
              <span className={css.text}>{favorite.type}</span>
              <div className={css.stick}></div>
              <span className={css.text}>{favorite.model}</span>
              <div className={css.stick}></div>
              <span className={css.text}>{favorite.mileage}</span>
              <div className={css.stick}></div>
              <span className={css.text}>{favorite.accessories[0]}</span>
            </div>
            <button
              className={css.buttonLearnMore}
              type="button"
              onClick={() => handleLearnMore(favorite.id)}
            >
              Learn More
            </button>
          </li>
        ))}
      </ul>
      <Modal
        style={modalStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        {findCar && (
          <>
            <img className={css.imageModal} src={findCar.img} alt="car" />
            <button
              className={css.buttonClose}
              type="button"
              onClick={closeModal}
            >
              <AiOutlineClose />
            </button>
            <div className={css.modalSubtitleContainer}>
              <span className={css.modalSubtitleText}>{findCar.make}</span>
              <span className={css.modalSubtitleTextModel}>
                {findCar.model},
              </span>
              <span className={css.modalSubtitleText}>{findCar.year}</span>
            </div>
            <div className={css.modalContainerFirst}>
              <span className={css.modalTextFirst}>
                {getCity(findCar.address)}
              </span>
              <div className={css.stick}></div>
              <span className={css.modalTextFirst}>
                {getCountry(findCar.address)}
              </span>
              <div className={css.stick}></div>
              <span className={css.modalTextFirst}>Id:{findCar.id}</span>
              <div className={css.stick}></div>
              <span className={css.modalTextFirst}>Year:{findCar.year}</span>
              <div className={css.stick}></div>
              <span className={css.modalTextFirst}>Type:{findCar.suv}</span>
            </div>
            <div className={css.modalContainerFirst}>
              <span className={css.modalTextFirst}>
                Fuel Consumption: {findCar.fuelConsumption}
              </span>
              <div className={css.stick}></div>
              <span className={css.modalTextFirst}>
                Engine Size: {findCar.engineSize}{' '}
              </span>
              <div className={css.stick}></div>
            </div>
            <p className={css.modalDescription}>{findCar.description}</p>
            <p className={css.modalAccessoriesTitle}>
              Accessories and functionalities:
            </p>
            <div className={css.modalAccessory}>
              {findCar.accessories.map(accessory => (
                <>
                  <span key={accessory} className={css.modalTextFirst}>
                    {accessory}
                  </span>
                  <div className={css.stick}></div>
                </>
              ))}
            </div>
            <p className={css.modalAccessoriesTitle}>Rental Conditions: </p>
            <p>
              {getConditions(findCar.rentalConditions).map(car => (
                <span key={car} className={css.modalConditionsItem}>
                  {car}
                </span>
              ))}
            </p>
            <div className={css.modalAccessory}>
              <span className={css.modalConditionsItem}>
                Mileage:{' '}
                <span className={css.modalMileage}>
                  {findCar.mileage.toLocaleString('en-US')}
                </span>
              </span>
              <span className={css.modalConditionsItem}>
                Price:{' '}
                <span className={css.modalMileage}>{findCar.rentalPrice}</span>
              </span>
            </div>
            <a href="tel: +380730000000" className={css.buttonRentalCar}>
              Rental car
            </a>
          </>
        )}
      </Modal>
    </>
  );
};
export default FavoriteCard;
