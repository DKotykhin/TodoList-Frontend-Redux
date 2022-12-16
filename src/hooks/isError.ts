import { useAppSelector } from "store/hook";
import { selectUser } from "store/selectors";

export const useError = (): boolean => {
    const { fetching } = useAppSelector(selectUser);
    const isError = fetching === "error";
    return isError;
};