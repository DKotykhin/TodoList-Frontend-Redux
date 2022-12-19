import { useAppSelector } from "store/hook";
import { selectAuthSuccess } from "store/selectors";

export const useAuth = (): boolean => {
    return Boolean(useAppSelector(selectAuthSuccess));
};
