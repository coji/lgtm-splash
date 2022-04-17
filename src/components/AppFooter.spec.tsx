import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { AppFooter } from './AppFooter'

describe('AppFooter', () => {
  test('render', () => {
    const component = render(<AppFooter />)
    expect(component).toMatchSnapshot()
  })
})
