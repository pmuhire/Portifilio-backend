const { array, boolean } = require('joi');

module.exports = {
  openapi: "3.0.0", // present supported openapi version
  info: {
    title: "My Brand App", // short title.
    description: "My Brand App APIs", //  desc.
    version: "1.0.0", // version number
    contact: {
      name: "Muhire Patrick", // your name
      email: "pmuhire2002@gmail.com", // your email
      url: "https://pmuhire.github.io/portifolio.io/", // your website
    },
  },
  servers: [
    {
      url: "https://my-brand-backend-app.herokuapp.com/api",
      description: "Deployed server"
    },
    {
      url: "http://localhost:1200/api", // url
      description: "Local server", // name
    }

  ],
  tags: [
    {
      name: "Users", // name of a tag
    },
    {
      name: "Blogs"
    },
    {
      name: "Contact"
    },
    {
      name: "Auth"
    },
  ],
  components: {
    schemas: {
      // user model
      User: {
        type: "object", // data type
        properties: {
          // id: {
          //   type: "string", 
          //   description: "Identification number", 
          //   example: "ytyVgh", 
          // },
          fullNames: {
            type: "string",
            description: "Users full Names",
            example: "Muhire Patrick", // example of a title
          },
          email: {
            type: "string", // data type
            description: "Users email",
            example: "pmuhire2002@gmail.com", // example of a completed value
          },
          userName: {
            type: "string", // data type
            description: "Users username",
            example: "pmuhire2002", // example of a completed value
          },
          password: {
            type: "string", // data type
            description: "Users password",
            example: "encripted password", // example of a completed value
          },
        },
      },
      // Blog model
      Blog: {
        type: "object", // data type
        properties: {
          tags: {
            type: array,
            description: "Some tags the blog is about",
          },
          enableComments: {
            type: boolean,
            description: "Enable comments or cancel",
            example: false,
          },
          metaTitle: {
            type: "string",
            description: "Simple sub title",
            example: "Nodejs swagger doc",
          },
          creator: {
            type: "string",
            description: "Identification number of the creator",
            example: "ytyVgh",
          },
          title: {
            type: "string",
            description: "Title of a blog",
            example: "Introduction to Nodejs",
          },
          content: {
            type: "string",
            description: "Content of the blog",
            example: "Working with nodejs",
          },
          imageUrl: {
            type: "string",
            description: "A url to an image",
            example: "https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/",
          },
        },
      },

      // TOKEN
      Token: {
        "type": "object",
        "properties": {
          "token": {
            "type": "string"
          }
        }
      },
      // Contact Model
      Contact: {
        type: "object", // data type
        properties: {
          names: {
            type: "string",
            description: "Names of the user",
            example: "Ngaboyisonga Emmanuel",
            required: true
          },
          email: {
            type: "string",
            description: "Email of the user",
            example: "ngaboyisonga@gmail.com",
            required: true
          },
          phone: {
            type: "string",
            description: "Phone number of the user",
            example: "0783681395",
            required: true
          },
          message: {
            type: "string",
            description: "User's message",
            example: "Hello patrick",
            required: true
          }
        },
      },
      "Login": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        }
      },
      // error model
      Error: {
        type: "object", //data type
        properties: {
          message: {
            type: "string", // data type
            description: "Error message",
            example: "Not found", // example of an error message
          },
          internal_code: {
            type: "string", // data type
            description: "Error internal code",
            example: "Invalid parameters", // example of an error internal code
          },
        },
      },
    },
    securitySchemes: {
      BearerAuth: {
        type: "string",
        scheme: "Token",
      },

      Bearer: {
        type: "string",
        name: "Authorization",
        in: "header"
      }
    },

  },
  paths: {
    //  USERS APIs DOCUMENTATION
    "/users": {
      get: {
        tags: ["Users"],
        "summary": "Get  Users",
        description: "Get Users",
        parameters: [
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Users were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    "/user": {
      "post": {
        "tags": [
          "Users"
        ],
        "summary": "Save new User",
        "description": "Save new User",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          // {
          // "in": "body",
          // "name": "body",
          // "description": "User object that needs to be added to the database",
          // "required": true,
          // "schema": {
          //     $ref: "#/components/schemas/User",
          // }
          // }
        ],
        requestBody: {
          // expected request body
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        "responses": {
          200: {
            description: "User added successfully", // response desc.
          },

          // response code
          500: {
            description: "Server error", // response desc.
          },
        }
      },
    },
    "/users/update/{id}": {
      "put": {
        "tags": [
          "Users"
        ],
        "security": {
          "Bearer": []
        },
        "summary": "Update existing User",
        "description": "Update existing User",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            name: "id",
            in: "path",
            description: "Id of a user",
            required: true,
            type: "string"
          },
          {
            "in": "body",
            "name": "body",
            "description": "User object that needs to be added to the database",
            "required": true,
            "schema": {
              $ref: "#/components/schemas/User",
            }
          },{
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }],
        responses: {
          // response code
          200: {
            description: "User updated successfully", // response desc.
          },
          // response code
          404: {
            description: "User not found", // response desc.
          },
          // response code
          500: {
            description: "Server error", // response desc.
          },
        },
      },
    },
    "/users/{id}": {
      get: {
        tags: ["Users"],
        "summary": "Get a User",
        description: "Get a User",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id of a user",
            required: true,
            type: "string"
          },
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Users were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    "/users/delete/{id}": {
      "delete": {
        "tags": [
          "Users"
        ],
        "summary": "Delete a User",
        "description": "Delete User",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            name: "id",
            in: "path",
            description: "Id of a user",
            required: true,
            type: "string"
          },
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }],
        responses: {
          // response code
          200: {
            description: "User updated successfully", // response desc.
          },
          // response code
          404: {
            description: "User not found", // response desc.
          },
          // response code
          500: {
            description: "Server error", // response desc.
          },
        },
      },
    },

    // BLOGS APIs DOCUMENTATION
    "/blogs": {
      get: {
        tags: ["Blogs"],
        "summary": "Get  Blogs",
        description: "Get Blogs",
        parameters: [],
        responses: {
          200: {
            description: "Blogs were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
        },
      },
    },
    "/blog": {
      "post": {
        "tags": [
          "Blogs"
        ],
        "summary": "Save new Blog",
        "description": "Save new Blog",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        requestBody: {
          // expected request body
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
            },
          },
        },
        "responses": {
          200: {
            description: "Blog added successfully", // response desc.
          },

          // response code
          500: {
            description: "Server error", // response desc.
          },
        }
      },
    },
    "/blogs/update/{id}": {
      "patch": {
        "tags": [
          "Blogs"
        ],
        "summary": "Update existing Blog",
        "description": "Update existing Blog",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            name: "id",
            in: "path",
            description: "Id of a Blog",
            required: true,
            type: "string"
          },
          {
            "in": "body",
            "name": "body",
            "description": "Blog object that needs to be added to the database",
            "required": true,
            "schema": {
              $ref: "#/components/schemas/Blog",
            }
          },
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }],
        responses: {
          // response code
          200: {
            description: "Blog updated successfully", // response desc.
          },
          // response code
          404: {
            description: "Blog not found", // response desc.
          },
          // response code
          500: {
            description: "Server error", // response desc.
          },
        },
      },
    },
    "/blogs/{id}": {
      get: {
        tags: ["Blogs"],
        "summary": "Get a Blog",
        description: "Get a Blog",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id of a Blog",
            required: true,
            type: "string"
          }
        ],
        responses: {
          200: {
            description: "Blog was obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
        },
      },
    },
    "/blogs/delete/{id}": {
      "delete": {
        "tags": [
          "Blogs"
        ],
        "summary": "Delete a Blog",
        "description": "Delete Blog",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            name: "id",
            in: "path",
            description: "Id of a Blog",
            required: true,
            type: "string"
          },
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }],
        responses: {
          // response code
          200: {
            description: "Blog updated successfully", // response desc.
          },
          // response code
          404: {
            description: "Blog not found", // response desc.
          },
          // response code
          500: {
            description: "Server error", // response desc.
          },
        },
      },
    },
    "/blogs/{id}/comments": {
      get: {
        tags: ["Blogs"],
        "summary": "Get a Blog comments",
        description: "Get a Blog",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id of a Blog",
            required: true,
            type: "string"
          },
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Blog comments were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
        },
      },
    },
    "/blogs/{id}/likes": {
      get: {
        tags: ["Blogs"],
        "summary": "Get a Blog likes",
        description: "Get a Blog likes",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id of a Blog",
            required: true,
            type: "string"
          },
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Blog likes were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Blog",
                },
              },
            },
          },
        },
      },
    },

    // login 
    "/login": {
      "post": {
        "tags": [
          "Auth"
        ],
        "summary": "Login",
        "description": "Login",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        requestBody: {
          // expected request body
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Login",
              },
            },
          },
        },
        "responses": {
          200: {
            description: "Loged in successfully", // response desc.
          },

          // response code
          500: {
            description: "Server error", // response desc.
          },
        }
      },
    },

    // Contact APIs DOCUMENTATION
    "/messages": {
      get: {
        tags: ["Contact"],
        "summary": "Get  Messages",
        description: "Get Messages",
        parameters: [
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Messages were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contact",
                },
              },
            },
          },
        },
      },
    },
    "/message": {
      "post": {
        "tags": [
          "Contact"
        ],
        "summary": "Send new Message",
        "description": "Send new Blog",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        requestBody: {
          // expected request body
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Contact",
              },
            },
          },
        },
        "responses": {
          200: {
            description: "Message sent successfully", // response desc.
          },

          // response code
          500: {
            description: "Server error", // response desc.
          },
        }
      },
    },
    "/messages/{id}": {
      get: {
        tags: ["Contact"],
        "summary": "Get a Message",
        description: "Get a Message",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Id of a Message",
            required: true,
            type: "string"
          },
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Message was received",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Contact",
                },
              },
            },
          },
        },
      },
    },
    "/messages/delete/{id}": {
      "delete": {
        "tags": [
          "Contact"
        ],
        "summary": "Delete a message",
        "description": "Delete Message",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            name: "id",
            in: "path",
            description: "Id of a message",
            required: true,
            type: "string"
          },
          {
            "in": "header",
            "name": "Authorization",
            "description": "bearer token for user authorization",
            "required": true,
            "schema": {
              "type": "string"
            }
          }],
        responses: {
          // response code
          200: {
            description: "Message deleted successfully", // response desc.
          },
          // response code
          404: {
            description: "Message not found", // response desc.
          },
          // response code
          500: {
            description: "Server error", // response desc.
          },
        },
      },
    },
  },

};
