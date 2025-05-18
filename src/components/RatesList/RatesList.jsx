import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';

import styles from './RatesList.module.css';

const RatesList = ({ rates, baseCurrency }) => {
  return (
    <Grid>
      {rates.map(({ key, value }, index) => (
        <GridItem key={key}>
          <p className={styles.text}>
            {index + 1}. {key} = {value} {baseCurrency}
          </p>
        </GridItem>
      ))}
    </Grid>
  );
};
export default RatesList;
