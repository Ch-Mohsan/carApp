import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com"
    }
    ]
};
const userSlice = createSlice({
  name: "users",
    initialState,
    reducers: {},
    addUser: (state, action) => {
      state.users.push({
        id: state.users.length + 1,
        ...action.payload
      });
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    }
});
const { addUser, removeUser, updateUser } = userSlice.actions;
export { addUser, removeUser, updateUser };
export const selectAllUsers = (state) => state.users.users;
export default userSlice.reducer;