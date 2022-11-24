import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginButton from './loginButton'

const customRender = () => {
  render(<LoginButton />)
}

describe('LoginButton', () => {
  test('Should show label', () => {
    customRender()
    const label = 'login'
    expect(screen.queryByText(label).textContent).toContain(label)
  })
})
