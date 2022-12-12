export const getToken = ():string => {
    const localToken = localStorage.getItem("rememberMe");
    const sessionToken = sessionStorage.getItem("rememberMe");
    const token = localToken || sessionToken || '';
    return token;
};
