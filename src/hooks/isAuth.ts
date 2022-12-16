import { useAppSelector } from "store/hook";
import { selectUser } from "store/selectors";

export const useAuth = (): boolean => {
    const { fetching } = useAppSelector(selectUser);
    const isLoaded = fetching === "loaded";
    return isLoaded;
};
