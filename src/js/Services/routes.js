import React from 'react';	

const routes = [
	{
		path: "/",
		exact: true,
		component: React.lazy(() => import("../views/Home")),
	}
];

export default routes;