import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "E-Commerce API Documentation",
        version: "1.0.0",
        description: "API documentation for the e-commerce cart system.",
    },
    servers: [
        {
            url: "http://localhost:3000/api", // Replace with your API base URL
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT", // Optional, indicates the format
            },
        },
    },
    security: [
        {
            bearerAuth: [], // Applies globally to all routes
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"], // Path to your route files
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiMiddleware = swaggerUi.setup(swaggerSpec);
