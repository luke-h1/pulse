import z from 'zod';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormProvider from '../FormProvider';
import RHFForm from '../RHFForm';

describe('Form', () => {
  test('Does not render errors for fields that do not have errors', async () => {
    const { container } = render(
      <FormProvider
        initialValues={{
          firstName: 'FirstName',
          lastName: '',
        }}
        validationSchema={z.object({
          firstName: z.string({
            required_error: 'First name is required',
          }),
          lastName: z.string({
            required_error: 'Last name is required',
          }),
        })}
      >
        <RHFForm id="test-form" onSubmit={jest.fn()}>
          Form
          <button type="submit">submit</button>
        </RHFForm>
      </FormProvider>,
    );

    userEvent.click(screen.getByRole('button', { name: 'submit' }));

    await waitFor(() => {
      expect(
        screen.queryByText('First name is required'),
      ).not.toBeInTheDocument();
    });

    expect(container.innerHTML).toMatchSnapshot();
  });

  test('calls `onSubmit` handler when form is submitted successfully', async () => {
    const handleSubmit = jest.fn();

    render(
      <FormProvider
        initialValues={{
          firstName: 'firstName',
        }}
        validationSchema={z.object({
          firstName: z.string(),
        })}
      >
        <RHFForm id="test-form" onSubmit={handleSubmit}>
          Form
          <button type="submit">submit</button>
        </RHFForm>
      </FormProvider>,
    );

    userEvent.click(screen.getByRole('button', { name: 'submit' }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
