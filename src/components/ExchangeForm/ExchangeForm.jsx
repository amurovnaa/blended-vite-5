import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';
import { useDispatch } from 'react-redux';
import { fetchExchangeResult } from '../../redux/currency/operations';

const ExchangeForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const value = e.target.elements.input.value.trim();
    const regex = /^(\d+(?:\.\d{1,2})?)\s([a-zA-Z]{3})\sin\s([a-zA-Z]{3})$/;

    const valueMatching = value.match(regex);
    if (!valueMatching) {
      return console.log('Invalid format. Use: "15 USD in UAH"');
    }

    const amount = parseFloat(valueMatching[1]);
    const from = valueMatching[2].toUpperCase();
    const to = valueMatching[3].toUpperCase();

    dispatch(fetchExchangeResult({ amount, from, to }));
    e.target.reset();
    console.log('form submitted');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        title="Request format 15 USD in UAH"
        placeholder="15 USD in UAH"
        name="input"
        className={styles.input}
      />
    </form>
  );
};

export default ExchangeForm;
