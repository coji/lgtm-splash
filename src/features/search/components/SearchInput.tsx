import { HStack, Input, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useUnsplashSearch } from '~/features/search/hooks/useUnsplashSearch'

export interface SearchInputFormProps {
  query: string
}

interface SearchInputProps {
  isLoading: boolean
  onSubmit: (data: SearchInputFormProps) => void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  isLoading,
  onSubmit
}) => {
  const { register, handleSubmit } = useForm<SearchInputFormProps>()

  const handleSearchSubmit = (values: SearchInputFormProps) => {
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit(handleSearchSubmit)}>
      <HStack align="baseline">
        <Input
          id="query"
          type="search"
          placeholder="Search"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          {...register('query')}
        />
        <Button type="submit" isLoading={isLoading}>
          Search
        </Button>
      </HStack>
    </form>
  )
}
