import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  login: null,
};

// Thunk for validating login
export const validatelogin = createAsyncThunk("logincheck/validate", async () => {
  const authToken = localStorage.getItem("authToken");
  const usertype=localStorage.getItem('usertype')
  const userid=parseInt(localStorage.getItem('userid'))

  try {
    if (!authToken) {
      return false;
    }

    const response = await fetch("http://127.0.0.1:8000/validatetoken/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
        usertype: usertype,
        userid:userid,
      },
    });

    if (response.ok) {
      const data = await response.json();
      
      return data.detail; // Return the response data
    } else {
      return false; // Return false on non-OK responses
    }
  } catch (error) {
    
    return false; // Return false on any error
  }
});

// Slice
export const loginSlice = createSlice({
  name: "logincheck",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validatelogin.fulfilled, (state, action) => {
        state.login = action.payload; // Update state with the result of validatelogin
      })
      .addCase(validatelogin.rejected, (state) => {
        state.login = false; // Handle errors by setting login to false
      });
  },
});

// Export reducer
export default loginSlice.reducer;
