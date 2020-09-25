import React, { useState } from "react";

const App = (props) => {
  // 状態, 設定
  // const [count, setCount] = useState(0);

  // const increment = () => setCount(count + 1);
  // const decrement = () => setCount(count - 1);

  // const increment2 = () => setCount((previousCount) => previousCount + 1);
  // const decrement2 = () => setCount((previousCount) => previousCount - 1);

  // const reset = () => setCount(0);
  // const double = () => setCount(count * 2);
  // const divide3 = () =>
  //   setCount((previousCount) =>
  //     previousCount % 3 === 0 ? previousCount / 3 : previousCount
  //   );
  const [state, setState] = useState(props);
  const { name, price } = state;
  // const [name, setName] = useState(props.name);
  // const [price, setPrice] = useState(props.price);

  // const reset = () => {
  //   // setPrice(props.price);
  //   // setName(props.name);
  //   setState(props);
  // };

  return (
    <>
      <p>
        現在の{name}は、{price}円です。
      </p>
      <button onClick={() => setState({ ...state, price: price + 1 })}>
        +1
      </button>
      <button onClick={() => setState({ ...state, price: price - 1 })}>
        -1
      </button>
      <button onClick={() => setState(props)}>Reset</button>
      <input
        value={state.name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
      />

      {/* <div>count: {count}</div>
      <div>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
      </div>
      <div>
        <button onClick={increment2}>+1</button>
        <button onClick={decrement2}>-1</button>
      </div>
      <div>
        <button onClick={reset}>Reset</button>
        <button onClick={double}>x2</button>
        <button onClick={divide3}>3の倍数の時だけ3で割る</button>
      </div> */}
    </>
  );
};

App.defaultProps = {
  name: "サンプル",
  price: 1000,
};

export default App;
