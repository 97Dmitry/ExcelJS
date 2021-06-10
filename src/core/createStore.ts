type RootReducer = (
  state: {},
  action: {type: string}
) => {}

export function createStore(rootReducer: RootReducer, initialState: {} = {}) {
  let state = rootReducer({ ...initialState }, { type: "__INIT__" });
  let listeners: object[] = [];
  return {
    dispatch(action: {type : string}) {
      state = rootReducer(state, action);
    },
    subscribe(fn: object) {
      listeners.push(fn);
      // return () => {
      //   listeners.filter((el) => el !== fn);
      // };
      return {
        unsubscribe: () => {
          listeners = listeners.filter((el) => el !== fn);
        },
      };
    },
    getState() {
      return state;
    },
  };
}
