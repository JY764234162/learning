import { transformToReactRoutes } from "./shared";
import { authRoutes } from "./../../../router/constantRoutes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@/store";
import { router } from "@/router/routers";

const initialState: { allRoutes: ElegantConstRoute[]; constantRoutes: ElegantConstRoute[]; authRoutes: ElegantConstRoute[] } = {
  constantRoutes: [],
  authRoutes: [],
  allRoutes: [],
};

export const routesSlice = createSlice({
  name: "routes",
  initialState,
  reducers: {
    setAllRoute(state, { payload }: PayloadAction<ElegantConstRoute[]>) {
      state.allRoutes = payload;
    },
  },
  selectors: {
    getAllRoute: (state) => state.allRoutes,
  },
});

//路由
export const initConstantRoute = (): AppThunk => async (dispatch) => {
  const routes = transformToReactRoutes(authRoutes);
  await router.patchRoutes("layout", routes);
  await dispatch(routesSlice.actions.setAllRoute(authRoutes));
};
