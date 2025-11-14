import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BE API Documentation',
            version: '1.0.0',
            description: 'Backend API with Node.js + Express + MySQL',
            contact: {
                name: 'API Support',
                email: 'support@example.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
            {
                url: 'https://api.example.com',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        tags: [
            {
                name: 'Web - Auth',
                description: 'Public authentication endpoints',
            },
            {
                name: 'Web - Public',
                description: 'Public endpoints',
            },
            {
                name: 'User',
                description: 'User endpoints (requires authentication)',
            },
            {
                name: 'Admin',
                description: 'Admin endpoints (requires admin role)',
            },
        ],
    },
    apis: ['./src/routes/**/*.js'],
}

export const swaggerSpec = swaggerJsdoc(options)

