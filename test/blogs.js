
require("dotenv").config();
let chai = require("chai");
let chaihttp = require("chai-http");
let server = `https://my-brand-backend-app.herokuapp.com`;

chai.should();
chai.use(chaihttp);
describe("Blogs  APIs", () => {
    /**
     * Test the Get route
     */
    // describe("Get /api/blogs", () => {
    //   it("It should GET all blogs", (done) => {
    //     chai
    //       .request(server)
    //       .get("/api/blogs")
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a("array");
    //         done();
    //       });
    //   });
    //   it("It should NOT GET all blogs", (done) => {
    //     chai
    //       .request(server)
    //       .get("/api/blog")
    //       .end((err, res) => {
    //         res.should.have.status(404);
    //         done();
    //       });
    //   });
    // });
    /**
     * Test the Get (by Id) route
     */
    // describe("Get /api/blogs/:id", () => {
    //   it("It should GET a requested blog", (done) => {
    //     const blogId = "626a4244528380a2f2809d82";
    //     chai
    //       .request(server)
    //       .get("/api/blogs/" + blogId)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         done();
    //       });
    //   });
    //   it("It should GET no blog", (done) => {
    //     const blogId = "6267d827f72969b4f1ae450d";
    //     chai
    //       .request(server)
    //       .get("/api/blogs/" + blogId)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.text.should.be.eq("Blog does not exist");
    //         done();
    //       });
    //   });
    // });
    /**
     * Test the Post route
     */
    // describe("POST /api/blog", () => {
    //   it("It should POST a new Blog", (done) => {
    //     const blog = {
    //       "tags": [
    //         "hello world",
    //         "javascript",
    //         "nodejs"
    //       ],
    //       "enableComments": true,
    //       "metaTitle": "Hello world",
    //       "title": "My hello world",
    //       "content": "hdsfgdsfdsvtre vdcd gdfsfaste ",
    //       "imageUrl": "https://www.youtube.com/watch?v=YZa-9wYyCyE",
    //     }
    //     chai.request(server)
    //       .post("/api/blog")
    //       .send(blog)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a("object");
    //         done();
    //       })
    //   });
    //   it("It should NOT ADD a  blog", (done) => {
    //     const blog = {
    //       "tags": [
    //         "hello world",
    //         "javascript",
    //       ],
    //       "enableComments": true,
    //       "metaTitle": "Hello world",
    //       "imageUrl": "https://www.youtube.com/watch?v=YZa-9wYyCyE",
    //     }
    //     chai
    //       .request(server)
    //       .post("/api/blog")
    //       .set({Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhMzNmMDVlMzMxYTQ3NjdkY2M1YTYiLCJlbWFpbCI6InBtdWhpcmUyMDAzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHlZV1c1RGZEYTFVeEMudWpDdXEzaWUzZVpnVWN3MFhrdlJqVlYwLjlCSVhqc3lsR2RmSjhlIiwiaWF0IjoxNjUxMjc0NDg1fQ.gddMOjBlw42ABmynQzUx0SszppalcsnJiymcK124OCU"})
    //       .send(blog)
    //       .end((err, res) => {
    //         res.should.have.status(404);
    //         done();
    //       });
    //   });
    // })
    /**
     * Test the Put route
     */
    //  describe("PATCH /api/blogs/update/:id", () => {
    //   it("It should UPDATE a  blog", (done) => {
    //     const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxMjcwNTM1fQ.ih7IofJGEjU3bNt5ep5_3Cs2SrlQRWmwHQbNi0Ji4ts"
    //     const blogId="626798b15a1dcfe2cbd3753b"
    //     const blog = {
    //       "title": "My hello world updated",
    //     };
    //     chai
    //       .request(server)
    //       .patch("/api/blogs/update/"+userId)
    //       .set({ Authorization: `${token}`})
    //       .send(blog)
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a("object");
    //         done();
    //       });
    //   });
    // });
  
    /**
     * Test the Delete route
     */
    //  describe("Delete /api/blogs/delete/id", () => {
    //   it("It should Delete a  blog", (done) => {
    //     const blogId="626798b15a1dcfe2cbd3753b"
    //     chai
    //       .request(server)
    //       .delete("/api/blogs/delete/"+blogId)
    //       .set({Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZhMzNmMDVlMzMxYTQ3NjdkY2M1YTYiLCJlbWFpbCI6InBtdWhpcmUyMDAzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHlZV1c1RGZEYTFVeEMudWpDdXEzaWUzZVpnVWN3MFhrdlJqVlYwLjlCSVhqc3lsR2RmSjhlIiwiaWF0IjoxNjUxMjc0NDg1fQ.gddMOjBlw42ABmynQzUx0SszppalcsnJiymcK124OCU"})
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         done();
    //       });
    //   });
    // });
  });