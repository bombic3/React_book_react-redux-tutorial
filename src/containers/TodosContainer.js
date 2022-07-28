import React from 'react';
import { useSelector } from 'react-redux';
import Todos from '../components/Todos';
import useActions from '../lib/useActions';
import { changeInput, insert, toggle, remove } from '../modules/todos';

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos
  }));

  // - useActions는 두 가지 파라미터 필요
    // - 첫 번째 파라미터 : 액션 생성 함수로 이루어진 배열
    // - 두 번째 파라미터 : deps 배열
    //     - 이 배열 안에 들어 있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 만들게 됨
  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove], // 액션 생성 함수로 이루어진 배열
    [] // deps 배열
  );

  /*
  const dispatch = useDispatch();
  const onChangeInput = useCallback(input => dispatch(changeInput(input)), [
    dispatch
  ]);
  const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);
  */
  
  return (
    <div>
      <Todos
        input={input}
        todos={todos}
        onChangeInput={onChangeInput}
        onInsert={onInsert}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    </div>
  );
};

export default React.memo(TodosContainer);

/*
### connect 함수와의 주요 차이점

- 앞으로 컨테이너 컴포넌트를 만들 때 connect 함수를 사용해도 좋고
- useSelector와 useDisptch를 사용해도 좋다
- 리덕스 관련 Hook이 있다고 해서 기존 connect 함수가 사라지는 것은 아니므로, 더ㅓ 편한 것을 사용하면 된다

### – ⭐️⭐️⭐️Hooks사용할 때와 connect 함수 사용할 때의 차이점⭐️⭐️⭐️

- connect함수 사용하여 컨테이너 컴포넌트를 만들었을 경우
    - 해당 컨테이너 컴포넌트의 부모 컴포넌트가 리렌더링 될 때 해당 컨테이너 컴포넌트의 props가 바뀌지 않았다면 리렌더링이 자동으로 방지되어 성이 최적화 됨
- useSelector를 사용하여 리덕스 상태를 조회했을 경우
    - 최적화 작업이 자동으로 이루어지지 않음
    - 성능 최적화를 위해서는 React.memo를 컨테이너 컴포넌트에 사용해 줘야 함

*/

// → 이 예시에서는 TodosContainer의 부모 컴포넌트인 App 컴포넌트가 리렌더링 되는 일이 없으므로 불필요한 성능 최적화임