import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import api from "../api/api";

export default function Login() {
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleGenerateOtp = async () => {
        try {
            setLoading(true);
            const response = await api.post("/generateOTP", {
                mobile_number: mobile
            })
            setOtpSent(true);
            console.log("response", response)
        } catch (err) {
            console.log(err)
            alert("Failed to generate OTP");
        } finally {
            setLoading(false);
        }

    }

    const handleValidateOtp = async () => {
        try {
            setLoading(true)
            const res = await api.post("/validateOTP", {
                mobile_number: mobile,
                otp
            })
            console.log("res token", res)
            login(res.data.data.token);
            navigate("/list")
        } catch (err) {
            console.log(err)
            alert("Failed to validate otp")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container maxWidth="sm">
            <Box mt={8}>
                <Typography variant="h5" mb={3}>
                    OTP Login
                </Typography>

                <TextField
                    label="Mobile Number"
                    fullWidth
                    margin="normal"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />

                {otpSent && (
                    <TextField
                        label="OTP"
                        fullWidth
                        margin="normal"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                )}

                {!otpSent ? (
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleGenerateOtp}
                        disabled={loading || !mobile}
                    >
                        Generate OTP
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleValidateOtp}
                        disabled={loading || !otp}
                    >
                        Validate OTP
                    </Button>
                )}
            </Box>
        </Container>
    );
}