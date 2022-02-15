import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./index";

import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
