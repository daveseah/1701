/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

	This is the main entry point for the 1701 system.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

///////////////////////////////////////////////////////////////////////////////
/** LIBRARY MODULES **********************************************************/

import React           from 'react';
import ReactDOM        from 'react-dom';
import { HashRouter }  from 'react-router-dom';
import AppShell        from '1701/app/AppShell';

ReactDOM.render(
	(
		<HashRouter hashType='noslash'>
			<AppShell/>
		</HashRouter>
	),
	document.getElementById('system-shell')
);
