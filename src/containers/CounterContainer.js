import { connect } from 'react-redux';
import Counter from '../components/Counter';
import { decrease, increase } from '../modules/counter';

const CounterContainer = ({number, increase, decrease}) => {
  return (
    <div>
      <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    </div>
  );
};
// - connect 함수 사용할 때 일반적으로 위 코드와 같이 mapStateToProps와 mapDispatchToProps를 미리 선언해 놓고 사용
// - 하지만 connect 함수 내부에 익명 함수 형태로 선언해도 문제가 되지 않음
//     → 어떻게 보면 코드가 더 깔끔
//     → 취향에 따라 작성
// 포넌트에서 액션을 디스패치하기 위해 각 액션 생성 함수를 호출하고 dispatch로 감싸는 작업이 번거롭다면 리덕스에서 제공하는 bindActionCreators 유틸 함수 사용

// 두 번째 파라미터를 아예 객체 형태로 넣어 주면 connect 함수가 내부적으로 bindActionCreators작업을 대신해줌
export default connect(
  state => ({
    number: state.counter.number,
  }),
  // dispatch =>
  //   bindActionCreators(
  {
    increase,
    decrease,
    // increase: () => dispatch(increase()),
    // decrease: () => dispatch(decrease()),
  },
    //   dispatch,
    // ),
)(CounterContainer);
/*
const mapStateToProps = state => ({
  number: state.counter.number,
});
const mapDispatchToProps = dispatch => ({
  // 임시 함수
  increase: () => {
    // console.log('increase');
    dispatch(increase());
  },
  decrease: () => {
    // console.log('decrease');
    dispatch(decrease());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CounterContainer);
*/
