import { unstable_renderSubtreeIntoContainer } from "react-dom";

// stateが未定義の場合があるので、初期化しておく

// action = {
//   type: 'CREATE_EVENT',
//   title: 'テスト',
//   body: 'テスト'
// }

// # before
// state = []

// # after
// state = [
//   {
//     id: 1,
//     title: 'テスト',
//     body: 'テスト'
//   }
// ]

// # before
// state = [
//   {id: 1, title: 'タイトル', body: 'ボディー'},
//   {id: 2, title: 'タイトル', body: 'ボディー'},
//   {id: 3, title: 'タイトル', body: 'ボディー'}
// ]

// # after
// state = [
//   {id: 1, title: 'タイトル', body: 'ボディー'},
//   {id: 2, title: 'タイトル', body: 'ボディー'},
//   {id: 3, title: 'タイトル', body: 'ボディー'},
//   {id: 3, title: 'テスト', body: 'テスト'}
// ]

const events = (state = [], action) => {
  switch (action.type) {
    case "CREATE_EVENT":
      const event = { title: action.title, body: action.body };
      const length = state.length;
      let id = length === 0 ? 1 : state[length - 1].id + 1;

      // {id: id}はショートハンドで{id}とかける
      return [...state, { id, ...event }];
    case " DELETE_EVENT":
      return state;
    case " DELETE_ALL_EVENT":
      return [];
    default:
      return state;
  }
};

export default events;
