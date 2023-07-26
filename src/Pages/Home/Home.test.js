import { render, screen } from '@testing-library/react'
import Home from './index';

test("Home Rendered", () => {
    render(<Home/>);

    const element = screen.getByText(/first test/i);

    expect(element).toBeInTheDocument();
})