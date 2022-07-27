import { createAction, handleActions } from 'redux-actions';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// - counter 모듈에 작성된 액션 생성 함수를 createAction이란 함수를 사용하여 만들어 주기
// - createAction을 사용하면 매번 객체를 직접 만들어 줄 필요 없이 더욱 간단하게 액션 생성 함수를 선언할 수 있음
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });

const initialState = {
  number: 0,
};

// - 리듀서 함수 handleActions 함수 사용
//     - handleActions 함수의 첫 번째 파라미터에는 각 액션에 대한 업데이트 함수 넣어주고
//     - 두 번째 파라미터에는 초기 상태 넣어줌
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);

/*
function counter (state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1
      };
    case DECREASE:
      return {
        number: state.number - 1
      };
    default:
      return state;
  }
}
*/

export default counter;