/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

	const React = require('react');
	const ReactRouter = require('react-router');
	const ReactRouterDOM = require('react-router-dom');
	const ReactRouterBootstrap = require('react-router-bootstrap');
	const ReactBootstrap = require('react-bootstrap');
	const SYSTEM = require('1701/system');

	var DBGOUT = true;

///////////////////////////////////////////////////////////////////////////////
/** SYS1701 REACT ROUTER CLASS ***********************************************/

	class AppLoader extends React.Component {
		constructor( props ) {
			super( props );
			this.route = props.location.pathname;
			if (DBGOUT) console.log('AppLoader path',this.route);
		}
		componentDidMount() {
			if (DBGOUT) console.log('AppLoader path',this.route);
			// SYS1401.InitializeGameModeQuery( this.query );
			// MASTER.Start( this.route );
			SYSTEM.Start();
		}
		render() {
			return (
				<div id='system-app'>
					<p>next steps:</p>
					<ul>
						<li>create the SYSTEM startup in system.js</li>
					</ul>
				</div>
			);
		}
	}

///////////////////////////////////////////////////////////////////////////////
/** RETURN MODULE ************************************************************/
	module.exports = AppLoader;
