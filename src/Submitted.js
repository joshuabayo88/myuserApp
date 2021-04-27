import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";

const Submitted = () => {
	const history = useHistory();

	const loginPage = (e) => {
		history.push("/login");
		console.log(e);
	};
	return (
		<>
			<CssBaseline />
			<Container maxWidth="" className="submit-page">
				<Typography variant="h2" className="welcome">
					Welcome
				</Typography>

				<Button
					variant="contained"
					color="secondary"
					startIcon={<HomeIcon />}
					className="button-submit-page"
					onClick={loginPage}
				>
					Login
				</Button>
			</Container>
		</>
	);
};
export default Submitted;
