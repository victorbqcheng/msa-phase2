import { Box, Chip, Container, Grid, Link, Paper, Stack, Typography } from '@mui/material'


const About = () => {
    const technologies = [
        'TypeScript', 'React', 'React Router', 'MUI', 'MobX', 'Storybook',
        '.NET 8', 'EF Core', 'SQL Server', 'Docker', 'Azure', 'Git'
    ];

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
                <Typography variant="h4" component="h4" gutterBottom>
                    <Link sx={{ textDecoration: 'none' }} href="https://github.com/NZMSA/2024-Phase-2" target="_blank">
                        This is MSA Phase2 Project
                    </Link>
                </Typography>

                <Typography variant="body1" paragraph>
                    This is a simple blog platform that includes features such as user registration, 
                    login, creating, editing, deleting, and browsing blog articles, 
                    as well as innovative features like generating blog titles using AI (GPT4o).
                </Typography>
                <Typography>
                    The frontend is built with React, ensuring type safety with TypeScript, 
                    managing routes with React Router, building user interfaces with MUI component library, 
                    and managing state with MobX. Storybook is used for component development and documentation. 
                    The backend is built with ASP.NET Core framework, using EF Core for data access and SQL Server 
                    as the database. The entire application is containerized with Docker and deployed on 
                    the Azure cloud platform.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Technology Stack:
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Grid container spacing={1}>
                        {technologies.map((tech) => (
                            <Grid item key={tech}>
                                <Chip label={tech} variant="outlined" />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Key Features:
                </Typography>
                <ul>
                    <li>User authentication (registration and login)</li>
                    <li>Creation, editing, deletion, and browsing of blog articles</li>
                    <li>Responsive design for a great experience on various devices</li>
                    <li>Containerized with Docker for easy deployment and scalability</li>
                    <li>Deployed on Azure cloud platform for high availability and performance</li>
                </ul>

                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    About Me:
                </Typography>
                <Typography variant="body1" paragraph>
                    I am a passionate software engineer specializing in full-stack development, focusing on creating high-quality and scalable web applications. I am proficient in both frontend and backend technologies and eager to learn and apply new technologies to enhance my projects.
                </Typography>
                <Typography variant="body1">
                    If you are interested in this project or want to know more, feel free to contact me or view the project source code.
                </Typography>
            </Paper>


        </Container>
    );
}

export default About