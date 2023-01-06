import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "store/hook";
import { selectAuthSuccess } from "store/selectors";
import { fetchUserByToken } from "store/userSlice";

import { getToken } from "api/getToken";

export const useAuth = (): boolean => {
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const auth = Boolean(useAppSelector(selectAuthSuccess));

    useEffect(() => {
        if (!getToken()) {
            navigate("/login");
        } else if (!auth) {
            dispatch(fetchUserByToken());
        }
    }, [auth, dispatch, navigate]);

    return auth;
};
