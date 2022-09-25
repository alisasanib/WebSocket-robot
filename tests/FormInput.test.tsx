import FormInput from '../components/FormInput';
import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';

describe('FormInput', () => {
  it('renders inputs properly', async () => {
    const handleSubmit = jest.fn();
    await act(() =>
      render(
        <FormInput
          handleSubmit={ handleSubmit }
        />
      )
    );
    expect(await screen.findByLabelText('X')).toHaveValue(null);
    expect(await screen.findByLabelText('Y')).toHaveValue(null);
    expect(await screen.findByLabelText('ANGLE')).toHaveValue(null);

    const submitButton = await screen.findByRole('button', {
      name: 'Submit',
    });
    fireEvent.click(submitButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
