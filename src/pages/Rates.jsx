import { Wave } from 'react-animated-text';

import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBaseCurrency,
  selectFilteredRates,
  selectIsError,
  selectIsLoading,
} from '../redux/currency/selectors';
import { useEffect } from 'react';
import { fetchRatesCurrency } from '../redux/currency/operations';
import Loader from '../components/Loader/Loader';
import RatesList from '../components/RatesList/RatesList';
import Filter from '../components/Filter/Filter';
const Rates = () => {
  const dispatch = useDispatch();
  const filteredRates = useSelector(selectFilteredRates);
  const isError = useSelector(selectIsError);
  const baseCurrency = useSelector(selectBaseCurrency);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (baseCurrency) {
      dispatch(fetchRatesCurrency({ baseCurrency }));
    }
  }, [baseCurrency, dispatch]);
  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {isLoading && <Loader />}
        <Filter />
        {filteredRates.length > 0 && (
          <RatesList rates={filteredRates} baseCurrency={baseCurrency} />
        )}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
