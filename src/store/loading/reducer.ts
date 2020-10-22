import { RootState } from "../index";

// got this idea from: https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
export default function loadingReducer(state: any = {}, action: any) {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    // Store whether a request is happening at the moment or not
    // e.g. will be true when receiving GET_TODOS_REQUEST
    // and false when receiving GET_TODOS_SUCCESS / GET_TODOS_FAILURE
    [requestName]: requestState === "REQUEST",
  };
}

// returns a selector function that will return true only if the passed actions are not loading
export const createLoadingSelector = (actions: Array<string>) => (
  state: RootState
) => {
  actions.reduce((result, action) => {
    if (state.loading[action]) return false;
    return result;
  }, true);
};
