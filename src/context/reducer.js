export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
};

export function reducer(action, state) {
  if (action.type === actionType.SET_USER) {
    return {
      ...state,
      user: action.user,
    };
  }

  if (action.type === actionType.SET_FOOD_ITEMS) {
    return {
      ...state,
      foodItems: action.foodItems,
    };
  }
  return state;
}
