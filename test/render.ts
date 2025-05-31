import userEvent from '@testing-library/user-event';
import { render as _render } from '@testing-library/react';
// setup function
function render(jsx: React.ReactElement) {
	return {
		user: userEvent.setup(),
		..._render(jsx),
	};
}

export default render;