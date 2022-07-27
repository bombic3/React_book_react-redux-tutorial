import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = () => {
  const number = useSelector(state => state.counter.number);
  const dispatch = useDispatch();
  return (
    <div>
      <Counter
        number={number}
        onIncrease={() => dispatch(increase())}
        onDecrease={() => dispatch(decrease())}
      />
    </div>
  );
};

export default CounterContainer;