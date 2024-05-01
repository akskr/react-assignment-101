import { LockOutlined } from "@mui/icons-material";
import {
    Container,
    CssBaseline,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
} from "@mui/material";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import Fade from "@mui/material/Fade";
import LinearProgress from "@mui/material/LinearProgress";
import { loginUser } from "../store/action";
import { useNavigate } from 'react-router-dom';
import {validateEmail, validatePassword, PASSWORD_ERROR} from "../components/utils";
import {showToastErrorMessage} from "../components/notification";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailValidationText, setEmailValidationText] = useState("");
    const [passwordValidationText, setPasswordValidationText] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const user = props.users.find((user) => user.isloggedin);
        if (user) {
            navigate('/');
        }
    }, [props.users, navigate])

    const handleLogin = () => {
        if (!validateEmail(email) || !validatePassword(password)) {
            showToastErrorMessage("Please provide valid email & password!");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            props.loginUser({email, password});
            const user = props.users.find((user) => user.email === email);
            if (user && user.isloggedin) {
                navigate('/');
            }
            setLoading(false);
        }, 500);
    };

    const handleEmailChange = (_email) => {
        setEmail(_email);
        if (!validateEmail(_email)) {
            setEmailValidationText("Please provide valid email!")
        } else {
            setEmailValidationText("");
        }
    }

    const handlePasswordChange = (_password) => {
        setPassword(_password);
        if (!validatePassword(_password)) {
            setPasswordValidationText(PASSWORD_ERROR)
        } else {
            setPasswordValidationText("");
        }
    }

    return (
        <>
            <Fade
                in={loading}
                unmountOnExit
            >
                <LinearProgress />
            </Fade>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5">Login</Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            error={emailValidationText}
                            helperText={emailValidationText}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            type={"email"}
                            name="email"
                            autoFocus
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                        />

                        <TextField
                            margin="normal"
                            error={passwordValidationText}
                            helperText={passwordValidationText}
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => handlePasswordChange(e.target.value)}
                        />

                        <Button
                            disabled={!password || !email || passwordValidationText || emailValidationText}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Grid container justifyContent={"flex-end"}>
                            <Grid item>
                                <Link to="/register">Don't have an account? Register</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: user => dispatch(loginUser(user))
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);