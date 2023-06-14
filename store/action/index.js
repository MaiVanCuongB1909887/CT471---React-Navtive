export const login = token => ({
  type: 'LOGIN',
  payload: token,
});
export const logout = () => ({
  type: 'LOGOUT',
});
export const addtocart = item => ({
  type: 'ADD_ITEM',
  payload: item,
});
export const removecart = item => ({
  type: 'REMOVE_ITEM',
  payload: item,
});
