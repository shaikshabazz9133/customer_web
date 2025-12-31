import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../api/api";

export const fetchCustomer = createAsyncThunk(
  "customer/fetch",
  async (_, { rejectWithValue }) => {
    const token = sessionStorage.getItem("token");
    if (!token) return rejectWithValue("No token");

    const res = await fetch(`${API_BASE_URL}/customer/details`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Fetch failed");

    const json = await res.json();
    return json.data[0];
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/update",
  async (payload) => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${API_BASE_URL}/customer/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Update failed");

    return payload;
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    data: null,
    loading: false,
  },
  reducers: {
    clearCustomer: (state) => {
      state.data = null;
    },
    updateImage: (state, action) => {
      if (state.data) state.data.profile_pic = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.data = { ...state.data, ...action.payload };
      });
  },
});

export const { clearCustomer, updateImage } = customerSlice.actions;
export default customerSlice.reducer;
