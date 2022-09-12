import { render, screen, cleanup } from '@testing-library/react'
import Jokes from '../Jokes.jsx'

describe('Should render jokes component', () => {
    it("rendered input", () => {
        const { getByTestId } = render(<Jokes />);
        const input = getByTestId("inputBar");
        expect(input).toBeTruthy();
    })

})