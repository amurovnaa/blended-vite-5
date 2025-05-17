import { NavLink } from 'react-router-dom';
import { MdCurrencyExchange } from 'react-icons/md';
import styles from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectBaseCurrency } from '../../redux/currency/selectors';
import { fetchCurrency } from '../../redux/currency/operations';
import { setBaseCurrency } from '../../redux/currency/slice';

const Header = () => {
  const addActive = ({ isActive }) => (isActive ? styles.active : styles.link);
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectBaseCurrency);

  useEffect(() => {
    if (!baseCurrency && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchCurrency({ latitude, longitude }));
          console.log('location');
        },
        error => {
          dispatch(setBaseCurrency('USD'));
          console.log(
            `${error}, User denied location, setting default currency`,
          );
        },
      );
    }
  }, [dispatch, baseCurrency]);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <MdCurrencyExchange className={styles.logo} />
          <nav>
            <ul className={styles.nav}>
              <li>
                <NavLink to="/" className={addActive}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/rates" className={addActive}>
                  Rates
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        {baseCurrency && (
          <p className={styles.link}>Your base currency: {baseCurrency}</p>
        )}
      </header>
      {console.log('Header:', { baseCurrency })}
    </>
  );
};

export default Header;
