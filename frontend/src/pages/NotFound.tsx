import { SentimentDissatisfied } from '@mui/icons-material'
import { Box, Button, Container, Typography } from '@mui/material'

const NotFound = () => {
    return (
        <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
          }}
        >
          <SentimentDissatisfied />
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Sorry, the page you are looking for does not exist.
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Please check if the URL you entered is correct or use the button below to return to the homepage.
          </Typography>
          <Button variant="contained" color="primary" href="/" sx={{ mt: 2 }}>
            Return to Homepage
          </Button>
        </Box>
      </Container>
    )
}

export default NotFound