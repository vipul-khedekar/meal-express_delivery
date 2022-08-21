export const actionType = {
  SET_USER: "SET_USER",
};

export function reducer(action, state) {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
}
