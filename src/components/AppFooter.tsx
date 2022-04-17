import { Box, Stack, Link } from '@chakra-ui/react'

export const AppFooter: React.FC = () => {
  return (
    <Box p="4" textAlign="center">
      <Stack>
        <Box>
          Copyright &copy;{' '}
          <Link isExternal href="https://www.techtalk.jp/">
            TechTalk Inc.
          </Link>
        </Box>

        <Box>
          <Link isExternal href="https://www.github.com/coji/lgtm-splash">
            GitHub
          </Link>
        </Box>
      </Stack>
    </Box>
  )
}
