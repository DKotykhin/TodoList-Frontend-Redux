import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "store/reduxHooks";
import { selectAuthError, selectAuthSuccess } from "store/selectors";
import { fetchUserByToken } from "store/userSlice";

import { getToken } from "api/getToken";

export const useAuth = (): { isSuccess: boolean; isError: boolean } => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isSuccess = Boolean(useAppSelector(selectAuthSuccess));
    const isError = Boolean(useAppSelector(selectAuthError));

    useEffect(() => {
        if (!getToken()) {
            navigate("/login");
        } else if (!isSuccess) {
            dispatch(fetchUserByToken());
        }
    }, [isSuccess, dispatch, navigate]);

    return { isSuccess, isError };
};
