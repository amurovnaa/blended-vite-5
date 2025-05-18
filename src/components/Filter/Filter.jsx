import { useDispatch } from 'react-redux';
import styles from './Filter.module.css';
import { changeFilter } from '../../redux/filter/slice';

const Filter = () => {
  const dispatch = useDispatch();

  const onSearch = filter => {
    dispatch(changeFilter(filter));
  };
  return (
    <input
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      onChange={e => onSearch(e.target.value)}
    />
  );
};

export default Filter;
