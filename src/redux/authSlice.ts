import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit";

import { loginApi } from "@/src/services/authService";

export const loginUser =
  createAsyncThunk(
    "auth/login",
    async (
      request: {
        contactNumber: string;
        password: string;
      }
    ) => {

      const response =
        await loginApi(request);

      return response;
    }
  );

  interface AuthState {

  loading: boolean;

  token: string | null;

  profile: any;

  error: string | null;
}

const initialState: AuthState = {

  loading: false,

  token: null,

  profile: null,

  error: null,
};

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {

    logout(state) {

      state.token = null;

      state.profile = null;
    },
  },

  extraReducers: builder => {

    builder

      .addCase(
        loginUser.pending,
        state => {

          state.loading = true;
        }
      )

      .addCase(
        loginUser.fulfilled,
        (state, action) => {

          state.loading = false;

          state.profile = action.payload;

          state.token =
            action.payload.token;
        }
      )

      .addCase(
        loginUser.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.error.message || "";
        }
      );
  },
});

export const { logout } =
  authSlice.actions;

export default authSlice.reducer;