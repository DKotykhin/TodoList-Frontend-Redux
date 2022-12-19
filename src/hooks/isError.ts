import { useAppSelector } from "store/hook";
import { selectAuthError } from "store/selectors";

export const useError = (): boolean => {
    return Boolean(useAppSelector(selectAuthError));
};
