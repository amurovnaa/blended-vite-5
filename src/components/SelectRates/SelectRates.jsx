import Select from 'react-select';
import symbols from './symbols.json';
import styles from './SelectRates.module.css';
import './ReactSelect.css';
import { setBaseCurrency } from '../../redux/currency/slice';
import { useDispatch } from 'react-redux';

const SelectRates = ({ baseCurrency }) => {
  const dispatch = useDispatch();

  const handleChangeCurrency = selectedOption => {
    dispatch(setBaseCurrency(selectedOption.value));
  };
  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        options={symbols}
        isSearchable
        onChange={handleChangeCurrency}
      />
    </div>
  );
};

export default SelectRates;
