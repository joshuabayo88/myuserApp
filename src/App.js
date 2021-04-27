import React from "react";
import Submitted from "./Submitted";
import Register from "./Register";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = ()=> {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Register} />
				<Route path="/submit">
				<Submitted/>
				</Route>
				<Route path="/login">
				<Login/>
				</Route>

			</Switch>
		</Router>
	);
}

export default App;
