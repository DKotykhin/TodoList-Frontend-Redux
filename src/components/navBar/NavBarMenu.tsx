import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";

import { removeUser } from "store/userSlice";
import { useAppDispatch } from "store/hook";

const settings = ["Profile", "Change password", "Logout"];

const NavBarMenu = () => {    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSettingMenu = (event: string): void => {
        switch (event) {
            case "Profile":                
                navigate("/profile");
                break;
            case "Change password":
                navigate("/password");
                break;
            case "Logout":
                dispatch(removeUser());
                sessionStorage.removeItem("rememberMe");
                localStorage.removeItem("rememberMe");
                navigate("/login");
                break;
            default:
                navigate("/");
        }
    };

    return (
        <>
            {settings.map((setting) => (
                <Typography
                    key={setting}
                    sx={{
                        padding: "5px 15px",
                        cursor: "pointer",
                        color: "#808080",
                        ":hover": { color: "#2b2b2b" },
                    }}
                    onClick={() => handleSettingMenu(setting)}
                >
                    {setting}
                </Typography>
            ))}
        </>
    );
};
export default NavBarMenu;
