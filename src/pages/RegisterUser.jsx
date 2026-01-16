import {
    Box,
    Button,
    Container,
    MenuItem,
    Stack,
    TextField,
    Typography,
    Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminUser() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User");
    const [success, setSuccess] = useState(false);

    const handleSubmit = () => {
        if (!username || !password) {
            alert("Username and password are required");
            return;
        }

        // Static UI-only behavior
        setSuccess(true);
        setUsername("");
        setPassword("");
        setRole("User");

        setTimeout(() => {
            navigate("/login")
        }, 2000)

    };

    return (
        <Container maxWidth="sm">
            <Box mt={4}>
                <Typography variant="h5" mb={3}>
                    Admin User Creation
                </Typography>

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        User created successfully (static demo)
                    </Alert>
                )}

                <Stack spacing={2}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />

                    <TextField
                        select
                        label="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                    </TextField>

                    <Button variant="contained" onClick={handleSubmit}>
                        Create User
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
