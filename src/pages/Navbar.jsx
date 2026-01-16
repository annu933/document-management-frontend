import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    const isLogin = localStorage.getItem("token");
    console.log("isLogin", isLogin)
    return (
        <AppBar position="static">
            <Toolbar>
                {/* Left */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Allsoft Assignment
                </Typography>

                {/* Right */}
                {isLogin == null ?
                    "" :
                    (
                        <Button color="inherit" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}

            </Toolbar>
        </AppBar>
    );
}
