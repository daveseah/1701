/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

	AppShell is the root React component for the UI shell. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

	var DBGOUT = true;

///////////////////////////////////////////////////////////////////////////////
/** LIBRARY MODULES **********************************************************/

	const React = require('react');
	const ReactRouter = require('react-router');
	const ReactRouterDOM = require('react-router-dom');
	const ReactRouterBootstrap = require('react-router-bootstrap');
	const ReactBootstrap = require('react-bootstrap');
	const AppLoader = require('1701/app/AppLoader');

	const { Router, Route, Switch, Redirect } = ReactRouter;
	const { BrowserRouter, Link } = ReactRouterDOM;
	const { Nav, NavItem, Navbar } = ReactBootstrap;
	const { LinkContainer } = ReactRouterBootstrap;
	const { Alert } = ReactBootstrap;

	const css = require('./AppShell.css');


///////////////////////////////////////////////////////////////////////////////
/** APP DEFINITIONS **********************************************************/

	// declare application instances for use in <Switch>
	class Welcome extends AppLoader {}
	class DemoGame extends AppLoader {}

	// emit warning for unmatched routes
	function NoMatch ( props ) {
		let hash = props.location.pathname.substring(1);
		return (
			<Alert bsStyle="warning">No Match for route <tt>#{hash}</tt></Alert>
		);
	}

///////////////////////////////////////////////////////////////////////////////
/** APPSHELL DEFINITION ******************************************************/

	class AppShell extends React.Component {
		constructor( props ) {
			super( props );
		}
		componentDidMount() {
			if (DBGOUT) console.log('AppShell has rendered');
		}
		render() {
			return (
				<div>
					<Navbar fluid style={{marginBottom:0}}>
						<Navbar.Header>
							<Navbar.Brand>
								1701
							</Navbar.Brand>
						</Navbar.Header>
						<Nav id='system-nav'>
							<LinkContainer to="/welcome" eventKey={1}>
								<NavItem>Welcome</NavItem>
							</LinkContainer>
							<LinkContainer to="/demo" eventKey={2}>
								<NavItem>DemoGame</NavItem>
							</LinkContainer>
						</Nav>
					</Navbar>
					<Switch>
						<Route path='/welcome' component={Welcome}/>
						<Route path='/demo' component={DemoGame}/>
						<Redirect exact from='/' to='/welcome'/>
						<Route component={NoMatch}/>
					</Switch>
				</div>
			);
		}
	}

///////////////////////////////////////////////////////////////////////////////
/** RETURN JSX CLASS *********************************************************/
	module.exports = AppShell;