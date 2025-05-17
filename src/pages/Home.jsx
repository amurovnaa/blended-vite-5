import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import ExchangeForm from '../components/ExchangeForm/ExchangeForm';
import { useSelector } from 'react-redux';
import {
  selectExchangeInfo,
  selectIsError,
  selectIsLoading,
} from '../redux/currency/selectors';
import ExchangeInfo from '../components/ExchangeInfo/ExchangeInfo';
import Loader from '../components/Loader/Loader';

const Home = () => {
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const exchangeInfo = useSelector(selectExchangeInfo);

  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />
        <ExchangeForm />

        {isLoading && <Loader />}
        {exchangeInfo && (
          <ExchangeInfo
            amount={exchangeInfo.amount}
            from={exchangeInfo.from}
            to={exchangeInfo.to}
            rate={exchangeInfo.rate}
            result={exchangeInfo.result}
          />
        )}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Home;
