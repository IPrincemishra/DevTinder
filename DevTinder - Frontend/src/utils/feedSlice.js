import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feed",
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        removeUserFromFeed: (state, action) => {
            const newArr = state.filter(user => user._id !== action.payload)
            return newArr
        }
        ,
        clearFeed: () => {
            return null;
        }
    }
})

export const { addFeed, removeUserFromFeed, clearFeed } = feedSlice.actions

export default feedSlice.reducer