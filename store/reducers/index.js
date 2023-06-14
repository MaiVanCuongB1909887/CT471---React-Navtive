import {combineReducers} from 'redux';

const loginReducer = (state = {isLoggedIn: false}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {isLoggedIn: true, token: action.payload};
    case 'LOGOUT':
      return {isLoggedIn: false, token: null};
    default:
      return state;
  }
};

const cartReducer = (state = {items: []}, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {items: [...state.items, action.payload]};
    case 'REMOVE_ITEM':
      return {items: state.items.filter(item => item.id != action.payload.id)};
    default:
      return state;
  }
};

//add reducer here

const rootReducer = combineReducers({
  login: loginReducer,
  cart: cartReducer,
});

export default rootReducer;
