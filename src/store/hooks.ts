import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Custom hook for accessing the Redux dispatch function with proper typing
 * Use this instead of plain `useDispatch` throughout the app
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Custom hook for accessing the Redux store state with proper typing
 * Use this instead of plain `useSelector` throughout the app
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
