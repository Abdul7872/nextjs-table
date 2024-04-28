'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Box
      height={"100vh"}
      display="flex"
      flexDirection="column"
      textAlign="center"
      justifyContent="center"
    >
    <Container maxWidth="md">
        <Typography align="center" variant="h4" mb={2}>
          {error?.message || "Something went wrong!"}
        </Typography>
        <Button
            color="primary"
            variant="contained"
            onClick={reset}
        >
            Try again
        </Button>
    </Container>
</Box>
  )
}