import { RootState } from "../index";

// got this idea from: https://medium.com/stashaway-engineering/react-redux-tips-better-way-to-handle-loading-flags-in-your-reducers-afda42a804c6
export default function loadingReducer(state: any = {}, action: any) {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  console.log("in loading reducer: ", requestName, "and", requestState);
  return {
    ...state,

    // stores request name (e.g. "GET_USER") and then the state (e.g. "SUCCESS")
    // if the state is failure and an error message exists, the error message will be stored instead
    [requestName]:
      requestState === "FAILURE" && action.message
        ? action.message
        : requestState,
  };
}

// returns a selector function that will return true only if the passed actions are not loading
export const createLoadingSelector =
  (actions: Array<string>) =>
  (state: RootState): boolean => {
    return actions.reduce((result: boolean, action) => {
      if (state.loading[action] === "REQUEST") return true;
      return result;
    }, false);
  };

export const createErrorSelector =
  (actions: Array<string>) =>
  (state: RootState): boolean => {
    return actions.reduce((result: boolean, action) => {
      if (state.loading[action] === "FAILURE") return true;
      return result;
    }, false);
  };

export const createStatusSelector =
  (action: string) =>
  (state: RootState): string => {
    return state.loading[action];
  };
