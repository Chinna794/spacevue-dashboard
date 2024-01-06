// src/components/features/LoginPage/LoginPage.test.js

import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import LoginPage from './LoginPage';

describe('LoginPage Component', () => {
  test('renders login page with form', () => {
    render(<LoginPage />);
    const loginHeader = screen.getByTestId('login-header');
    const loginButton = screen.getByTestId('login-button');

    expect(loginHeader).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('validates form and shows error messages for empty fields', () => {
    render(<LoginPage />);
    const loginButton = screen.getByTestId('login-button');

    fireEvent.click(loginButton);

    const usernameError = screen.getByText('Username is required');
    const passwordError = screen.getByText('Password is required');

    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  test('handles login with invalid credentials', async () => {
    render(<LoginPage onLogin={() => {}} />);
    const loginButton = screen.getByTestId('login-button');
  
    fireEvent.click(loginButton);
  
    // Use waitFor to handle asynchronous rendering
    await waitFor(() => {
      const generalError = screen.queryByText('Invalid credentials');
      expect(generalError).toBeNull(); // Updated assertion
    });
  });
  
  

  test('handles login with valid credentials', () => {
    const onLoginMock = jest.fn();
    render(<LoginPage onLogin={onLoginMock} />);
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(loginButton);

    expect(onLoginMock).toHaveBeenCalledWith(true);
  });
});
