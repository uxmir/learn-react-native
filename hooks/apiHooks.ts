import {TypedUseSelectorHook, useDispatch,useSelector}from 'react-redux'
import { appDispatch,RootState } from '../store/store';
export const useAppDispatch=()=>useDispatch<appDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector