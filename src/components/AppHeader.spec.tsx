import { describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import { AppHeader } from './AppHeader'

vi.mock(
  '~/features/auth/hooks/useAuth',
  vi.fn(() => {
    return {
      useAuth: vi.fn(() => {
        return {
          currentUser: undefined,
          isAuthChecking: false
        }
      })
    }
  })
)

vi.mock(
  '~/features/auth/hooks/useAuthAction',
  vi.fn(() => {
    return {
      useAuthAction: vi.fn(() => {
        return {
          signOut: vi.fn()
        }
      })
    }
  })
)

describe('AppHeader', () => {
  test('render', () => {
    const component = render(<AppHeader />)
    expect(component).toMatchSnapshot()
  })
})
