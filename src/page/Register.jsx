import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../store/action";
import "react-toastify/dist/ReactToastify.css";
import LinearProgress from '@mui/material/LinearProgress';
import Fade from '@mui/material/Fade';
import {validateEmail, validatePassword, PASSWORD_ERROR} from "../components/utils";
import {showToastErrorMessage} from "../components/notification";

const Register = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailValidationText, setEmailValidationText] = useState("");
    const [nameValidationText, setNameValidationText] = useState("");
    const [passwordValidationText, setPasswordValidationText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = props.users.find((user) => user.isloggedin);
        if (user) {
            navigate('/');
        }
    }, [props.users, navigate])
    const handleRegister = () => {
        if (!name || !validateEmail(email) || !validatePassword(password)) {
            showToastErrorMessage("Please provide valid name, email & password!");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            props.registerUser({name, email, password});
            setLoading(false);
        }, 500);
    };

    const handleNameChange = (name) => {
        setName(name);
        if (!name) {
            setNameValidationText("Please provide name!");
        } else {
            setNameValidationText("");
        }
    }

    const handleEmailChange = (email) => {
        setEmail(email);
        if (!validateEmail(email)) {
            setEmailValidationText("Please provide valid email!")
        } else {
            setEmailValidationText("");
        }
    }

    const handlePasswordChange = (password) => {
        setPassword(password);
        if (!validatePassword(password)) {
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
                    <Typography variant="h5">Register</Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    error={nameValidationText}
                                    name="name"
                                    helperText={nameValidationText}
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    error={emailValidationText}
                                    helperText={emailValidationText}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type={"email"}
                                    value={email}
                                    onChange={(e) => handleEmailChange(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={passwordValidationText}
                                    helperText={passwordValidationText}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => handlePasswordChange(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            disabled={!name || !password || !email || passwordValidationText || emailValidationText}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/login">Already have an account? Login</Link>
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
        registerUser: user => dispatch(registerUser(user))
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);