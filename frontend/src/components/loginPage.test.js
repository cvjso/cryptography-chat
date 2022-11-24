import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginPage from './loginPage'

const customRender = () => {
  render(<LoginPage />)
}

describe('LoginPage', () => {
  test('Should show label', () => {
    customRender()
    const label = 'exchat is a mvp of a encrypted chat using the methods of RSA and AES'
    expect(screen.queryByText(label).textContent).toContain(label)
  })

  test('Should show label username', () => {
    customRender()
    const label = 'Username'
    expect(screen.queryByText(label).textContent).toContain(label)
  })

  test('Should show label password', () => {
    customRender()
    const label = 'Password'
    expect(screen.queryByText(label).textContent).toContain(label)
  })

  test('Should show username input', () => {
    customRender()
    expect(screen.getByTestId('usernameInput')).toBeInTheDocument()
  })

  test('Should show password input', () => {
    customRender()
    expect(screen.getByTestId('passwordInput')).toBeInTheDocument()
  })
})
