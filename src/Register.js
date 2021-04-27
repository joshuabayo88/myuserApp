import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import firebase from "./firebase";
import { useHistory } from "react-router-dom";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://localhost:3000/">
				Joshtech Solutions
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	haveAccount: {
		marginLeft: "80px",
		position: "absolute",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
		animation: "$myEffect 700ms",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
		animation: "$myEffect 600ms",
	},
	"@keyframes myEffect": {
		"0%": {
			opacity: "0",
			transform: "translateY(200px)",
		},
		"100%": {
			opacity: "1",
			transform: "translateY(0)",
		},
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		color: "#fff",
		background: "#43484C",
		outline: "2px solid #fff",
		transition: "500ms",
		"&:hover": {
			boxShadow: "5px 10px 10px lightblue",
			// border: "2px solid #FAFAFA",
			// backgroundColor: "#3F51B5",
			backgroundImage: "linear-gradient(#09203f, #537895, #96deda)",
			// outline: "2px solid grey",
			// outlineOffset: "-3px",
			borderRadius: "1em",
		},
	},
	TextFocus: {
		transition: "200ms",
		"&:hover": {
			// boxShadow: "5px 10px 10px skyblue",
			// border: "2px solid #3F51B5",
			outline: "2px solid #3FA5F1",
			// outlineOffset: "1px",
		},
	},
	passwordCheck: {
		display: "flex",
		position: "relative",
		textAlign: "centre",
		color: "red",
		marginLeft: "100px",
		marginTop: "0px",
	},
}));

const Register = () => {
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [isNotValid, setIsNotValid] = useState("");
	const db = firebase.firestore();
	let history = useHistory();

	const handlechange = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => {
			return {
				...prevUser,
				[name]: value,
			};
		});
	};

	const handleSubmit = (e) => {
		if (user.password === user.confirmPassword) {
			const userDetails = db.collection("forUsers").add({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				password: user.password,
			});
			setUser({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
			history.push("/submit");
			console.log(userDetails);
			console.log(history);
		} else {
			console.log("Password doesn't Match");
			setIsNotValid(!isNotValid);
			// alert("Password Match Error");
		}

		e.preventDefault();
	};

	const classes = useStyles();
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<PeopleAltIcon style={{ width: "50px", height: "50px" }} />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} validate onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								value={user.firstName}
								onChange={handlechange}
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								className={classes.TextFocus}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								value={user.lastName}
								onChange={handlechange}
								autoComplete="lname"
								className={classes.TextFocus}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								value={user.email}
								onChange={handlechange}
								autoComplete="email"
								className={classes.TextFocus}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								value={user.password}
								onChange={handlechange}
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								className={classes.TextFocus}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="confirmPassword"
								value={user.confirmPassword}
								onChange={handlechange}
								label="Confirm Password"
								type="password"
								id="password"
								autoComplete="current-password"
								className={classes.TextFocus}
							/>
							{isNotValid && (
								<h5 className={classes.passwordCheck}>
									Password doesn't match
								</h5>
							)}
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="I want to receive inspiration, marketing promotions and updates via email."
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<div className={classes.haveAccount}>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="#" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</div>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};

export default Register;
