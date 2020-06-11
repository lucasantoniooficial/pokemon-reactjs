//Packages
import React 							from 'react';
import {BrowserRouter, Route, Switch} 	from 'react-router-dom';

//routes
import routes from "../../Services/routes";

export default function App () {
  return (
	<BrowserRouter>
		<React.Suspense fallback={""}>
			<Switch>
				{routes.map((value) => {
					return(
						<Route path={value.path} exact={!!value.exact} component={value.component} key={value.path} />
					);
				})}
			</Switch>
		</React.Suspense>
	</BrowserRouter>
  );
}