import { Suspense, lazy, useEffect } from 'react';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import { Navigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectBaseCurrency } from './redux/currency/selectors';
import { fetchCurrency } from './redux/currency/operations';
import { setBaseCurrency } from './redux/currency/slice';

const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));

export const App = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector(selectBaseCurrency);

  useEffect(() => {
    const success = pos => {
      const { latitude, longitude } = pos.coords;
      dispatch(fetchCurrency({ latitude, longitude }));
    };
    const error = err => {
      dispatch(setBaseCurrency('USD'));
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    if (!baseCurrency && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [dispatch, baseCurrency]);

  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};
