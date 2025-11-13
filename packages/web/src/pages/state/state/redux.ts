import {
  configureStore,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

// 定义状态类型
interface CounterState {
  value: number;
  asyncData: number | null;
  loading: boolean;
  error: string | null;
}

// 初始状态
const initialState: CounterState = {
  value: 0,
  asyncData: null,
  loading: false,
  error: null,
};

// 创建异步 action
export const fetchRandomData = createAsyncThunk<
  number, // 返回值类型
  void, // 参数类型
  { rejectValue: string } // ThunkAPI 配置
>("counter/fetchRandomData", async (_, { rejectWithValue }) => {
  try {
    // 模拟异步请求
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return Math.floor(Math.random() * 100);
  } catch (error) {
    return rejectWithValue("获取数据失败");
  }
});

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRandomData.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.asyncData = action.payload;
        }
      )
      .addCase(fetchRandomData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "获取数据失败";
      });
  },
});

export const { incremented, decremented, reset } = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});

// 为 TypeScript 提供 RootState 类型
export type RootState = ReturnType<typeof store.getState>;
// 为 dispatch 提供类型
export type AppDispatch = typeof store.dispatch;
