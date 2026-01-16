import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LaunchPage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box
                minHeight="80vh"
                display="flex"
                alignItems="center"
                justifyContent="center"

            >
                <Stack spacing={3} width="100%" textAlign="center">
                    <Typography variant="h4">
                        Document Management System
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        Please login or register to continue
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>

                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
