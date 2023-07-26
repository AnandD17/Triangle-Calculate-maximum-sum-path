import { render, screen } from '@testing-library/react'
import Home from './index';

test("Home Rendered", () => {
    render(<Home/>);

    const element = screen.getByText(/Upload file in .txt file/i);

    expect(element).toBeInTheDocument();
})