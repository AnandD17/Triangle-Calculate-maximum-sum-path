import { render, screen } from '@testing-library/react'
import Home from './index';

test("Home Rendered", () => {
    render(<Home/>);

    const element = screen.getByText(/Maximum Path Sum/i);

    expect(element).toBeInTheDocument();
})