type RootReducer = (
  state: {},
  action: {type: string}
) => {}

export function createStore(rootReducer: RootReducer, initialState: Record<string, any> = {}) {
  let state = rootReducer({ ...initialState }, { type: "__INIT__" });
  let listeners: any[] = [];
  return {
    dispatch(action: {type : string}) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
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
