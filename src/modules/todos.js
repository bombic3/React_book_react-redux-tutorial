import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값을 변경함
const INSERT = 'todos/INSERT'; // 새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE'; // todo를 체크/체크 해제함
const REMOVE = 'todos/REMOVE'; // todo를 제거함

export const changeInput = createAction(CHANGE_INPUT, input => input);

/*
export const changeInput = input => ({
  type: CHANGE_INPUT,
  input
});
*/

let id = 3; // insert가 호출될 때마다 1씩 더해짐
export const insert = createAction(INSERT, text => ({
  id: id++,
  text,
  done: false,
}));

export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

/*
export const insert = text => ({
  type: INSERT,
  todo: {
    id: id++,
    text,
    done: false
  }
});


export const toggle = id => ({
  type: TOGGLE,
  id
});

export const remove = id => ({
  type: REMOVE,
  id
});
*/

const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false
    }
  ]
};
/*
- handleActions로 리듀서 다시 작성하기
    - createAction으로 만든 액션 생성 함수는 파라미터로 받아 온 값을
    객체 안에 넣을 때 원하는 이름으로 넣는 것이 아니라 
    action.id, action.todo 와 같이 action.payload 값을 조회하여
    업데이트하도록 구현해야 함
*/
// 모든 추가 데이터 값을 action.payload로 사용하기 때문에 나중에 리듀서 코드를 다시 볼 때 헷갈릴 수 있음
// - 객체 비구조화 할당 문법으로 action 값의 payload 이름을 새로 설정해 주면 action.payload 가 정확히 어떤 값을 의미하는지 쉽게 파악 가능
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, {payload: input}) => ({ ...state, input }),
    [INSERT]: (state, {payload: todo}) => ({
      ...state,
      todos: state.todos.concat(todo),
    }),
    [TOGGLE]: (state, {payload: id}) => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    }),
    [REMOVE]: (state, {payload: id}) => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== id),
    }),
  },
  initialState,
);

/*
function todos (state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo)
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        )
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    default:
      return state;
  }
}
*/

export default todos;