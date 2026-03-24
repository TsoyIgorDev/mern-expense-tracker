import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCurrentUser } from "../store/slices/userSlice";

export const useUserAuth = () => {
    const dispatch = useAppDispatch();
    const { user, token, authChecked } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (!token || user || authChecked) return;
        dispatch(fetchCurrentUser());
    }, [authChecked, dispatch, token, user]);
};
