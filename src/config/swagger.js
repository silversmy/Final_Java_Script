const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Final JavaScript API",
      version: "1.0.0",
      description: "API documentation for the Final JavaScript project"
    },

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 9
            },
            firstName: {
              type: "string",
              example: "John"
            },
            lastName: {
              type: "string",
              example: "Doe"
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com"
            },
            role: {
              type: "string",
              example: "USER"
            }
          }
        },

        RegisterUser: {
          type: "object",
          required: [
            "firstName",
            "lastName",
            "email",
            "password"
          ],
          properties: {
            firstName: {
              type: "string",
              example: "John"
            },
            lastName: {
              type: "string",
              example: "Doe"
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com"
            },
            password: {
              type: "string",
              format: "password",
              minLength: 6,
              maxLength: 8,
              example: "Test1234"
            }
          }
        },

        LoginUser: {
          type: "object",
          required: [
            "email",
            "password"
          ],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com"
            },
            password: {
              type: "string",
              format: "password",
              minLength: 6,
              maxLength: 8,
              example: "Test1234"
            }
          }
        },

        UpdateUser: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              example: "John"
            },
            lastName: {
              type: "string",
              example: "Doe"
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com"
            },
            password: {
              type: "string",
              format: "password",
              minLength: 6,
              maxLength: 8,
              example: "New1234"
            }
          }
        }
      }
    }
  },

  apis: ["./src/routes/*.js"]
};



const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;