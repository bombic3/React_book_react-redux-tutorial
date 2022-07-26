import CounterContainer from './containers/CounterContainer';
import TodosContainer from './containers/TodosContainer';

const App = () => {
  return (
    <div>
      <CounterContainer />
      {/* <Counter number={0} /> */}
      <hr />
      <TodosContainer />
      {/* <Todos /> */}
    </div>
  );
};

export default App;