// reducers.js
const initialState = {
  dataArray: [],
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        dataArray: [...state.dataArray, action.payload],
      };
    default:
      return state;
  }
};
