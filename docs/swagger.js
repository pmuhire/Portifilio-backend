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
            url: "http://localhost:1200/api", // url
            description: "Local server", // name
        },
    ],
    tags: [
        {
            name: "Users", // name of a tag
        },
        {
            name:"Blogs"
        },
        {
            name:"Contact"
        },
        {
            name:"Auth"
        },
    ],
    components: {
        schemas: {
          // user model
          User: {
            type: "object", // data type
            properties: {
                id: {
                  type: "string", 
                  description: "Identification number", 
                  example: "ytyVgh", 
                },
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
                username: {
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
                tags:{
                  type: array, 
                  description: "Some tags the blog is about", 
                },
                enableComments:{
                  type: boolean, 
                  description: "Enable comments or cancel", 
                  example:false, 
                },
                metaTitle:{
                    type: "string", 
                    description: "Simple sub title", 
                    example: "Nodejs swagger doc", 
                },
                creator:{
                  type: "string", 
                  description: "Identification number of the creator", 
                  example: "ytyVgh", 
                },
                title:{
                  type: "string", 
                  description: "Title of a blog", 
                  example: "Introduction to Nodejs", 
                },
                content:{
                  type: "string", 
                  description: "Content of the blog", 
                  example: "HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH", 
                },
                imageUrl:{
                    type: "string", 
                    description: "A url to an image", 
                    example: "https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/", 
                },
            },
          },
          // Todo input model
          Contact: {
            type: "object", // data type
            properties: {
                names:{
                    type:"string",
                    description: "Names of the user", 
                    example: "Ngaboyisonga Emmanuel", 
                    required:true
                },
                email:{
                    type:"string",
                    description: "Email of the user", 
                    example: "ngaboyisonga@gmail.com", 
                    required:true
                },
                phone:{
                    type:"string",
                    description: "Phone number of the user", 
                    example: "0783681395", 
                    required:true
                },
                message:{
                    type:"string",
                    description: "User's message", 
                    example: "Hello patrick", 
                    required:true
                }
            },
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
    },
   paths:{
     "/users":{
      get: {
        tags: ["Users"], 
        description: "Get Users", 
        parameters: [], 
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
     "/users/{id}":{
      get: {
        tags: ["Users"], 
        description: "Get a User", 
        parameters: [
          {
            name:"id",
            in:"path",
            description:"Id of a user",
            required:true,
            type:"string"
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
    //  "/users/{id}":{
    //   put: {
    //     tags: ["Users"], 
    //     description: "Update user",  
    //     parameters:  [
    //       {
    //         name:"id",
    //         in:"path",
    //         description:"Id of a user",
    //         required:true,
    //         type:"string"
    //       },
    //       {
    //         name:"Full Names",
    //         in:"body",
    //         description:"full Names of a user",
    //         type:"string"
    //       },
    //       {
    //         name:"User name",
    //         in:"body",
    //         description:"Username of a user",
    //         type:"string"
    //       },
    //       {
    //         name:"Password",
    //         in:"body",
    //         description:"password of a user",
    //         type:"string"
    //       },
    //       {
    //         name:"Email",
    //         in:"body",
    //         description:"Email of a user",
    //         type:"string"
    //       }
    //     ],
    //     // expected responses
    //     responses: {
    //       // response code
    //       200: {
    //         description: "User updated successfully", // response desc.
    //       },
    //       // response code
    //       404: {
    //         description: "User not found", // response desc.
    //       },
    //       // response code
    //       500: {
    //         description: "Server error", // response desc.
    //       },
    //     },
    //   },
    //  },
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
              {
              "in": "body",
              "name": "body",
              "description": "Course object that needs to be added to the database",
              "required": true,
              "schema": {
                  $ref: "#/components/schemas/User",
              }
          }],
          "responses": {
              "201": {
                  "description": "successful operation",
                  "schema": {
                    $ref: "#/components/schemas/User",
                  }
              }
          }
      },
    },
    "/users/{id}":{
      "put": {
          "tags": [
              "Users"
          ],
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
              name:"id",
              in:"path",
              description:"Id of a user",
              required:true,
              type:"string"
            },
            {
              "in": "body",
              "name": "body",
              "description": "User object that needs to be added to the database",
              "required": true,
              "schema": {
                   $ref: "#/components/schemas/User",
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
   },
};
