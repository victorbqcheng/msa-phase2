
import { 
  Box, 
  Container,
  Link,
  IconButton,
} from '@mui/material';
import { GitHub } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{borderTop: '1px solid #ccc0', bgcolor: 'background.paper', py: 3 }}>
      <Container maxWidth="lg">
        victor cheng © {currentYear} |
        <Link href="https://github.com/victorbqcheng/msa-phase2" target="_blank" color="inherit">
          <IconButton color="primary">
            <GitHub />
          </IconButton>
        </Link>
        <a href="mailto:victoratnz@outlook.com">victoratnz@outlook.com</a>
      </Container>
    </Box>
  );
};

export default Footer;