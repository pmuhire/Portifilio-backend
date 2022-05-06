
require("dotenv").config();
let chai = require("chai");
let chaihttp = require("chai-http");
let server = require("../index");
// let server="localhost:1200"

chai.should();
chai.use(chaihttp);
describe("Blogs  APIs", () => {
    /**
     * Test the Get route
     */
    describe("Get /api/blogs", () => {
      it("It should GET all blogs", (done) => {
        chai
          .request(server)
          .get("/api/blogs")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
      it("It should NOT GET all blogs", (done) => {
        chai
          .request(server)
          .get("/api/blo")
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });
    /**
     * Test the Get (by Id) route
     */
    describe("Get /api/blogs/:id", () => {
      it("It should GET a requested blog", (done) => {
        const blogId = "626a4244528380a2f2809d82";
        chai
          .request(server)
          .get("/api/blogs/" + blogId)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
      it("It should GET no blog", (done) => {
        const blogId = "6267d827f72969b4f1ae450d";
        chai
          .request(server)
          .get("/api/blogs/" + blogId)
          .end((err, res) => {
            res.should.have.status(200);
            res.text.should.be.eq("Blog does not exist");
            done();
          });
      });
    });
    /**
     * Test the Post route
     */
    describe("POST /api/blog", () => {
      it("It should POST a new Blog", (done) => {
        const blog = {
          "tags": [
            "hello world",
            "javascript",
            "nodejs"
          ],
          "description":"My blog",
          "title": "My hello world"+ Math.random(),
          "content": "hdsfgdsfdsvtre vdcd gdfsfaste ",
          "imageUrl": "https://www.youtube.com/watch?v=YZa-9wYyCyE",
        }
        chai.request(server)
          .post("/api/blog")
          .query({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxNzY3MjE1fQ.L9rL9emG8ySh_aOmAUh70kftI-trfy1dw18DkkE_aXk"})
          .send(blog)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          })
      });
      it("It should NOT ADD a  blog", (done) => {
        const blog = {
          "tags": [
            "hello world",
            "javascript",
          ],
          "imageUrl": "https://www.youtube.com/watch?v=YZa-9wYyCyE",
        }
        chai
          .request(server)
          .post("/api/blog")
          .send(blog)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    })
    /**
     * Test the Put route
     */
     describe("PATCH /api/blogs/update/:id", () => {
      it("It should UPDATE a  blog", (done) => {
        const blogId="626798b15a1dcfe2cbd3753b"
        const blog = {
          "title": "My hello world updated",
        };
        chai
          .request(server)
          .patch("/api/blogs/update/"+blogId)
          .query({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxNzY3MjE1fQ.L9rL9emG8ySh_aOmAUh70kftI-trfy1dw18DkkE_aXk"})
          .send(blog)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  
    // COMMENT ON A BLOG
    describe("COMMENT /api/blogs/update/:id", () => {
      it("It should UPDATE a  blog", (done) => {
        const blogId="626798b15a1dcfe2cbd3753b"
        const blog = {
          "title": "My hello world updated",
        };
        chai
          .request(server)
          .patch("/api/blogs/update/"+blogId)
          .query({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxNzY3MjE1fQ.L9rL9emG8ySh_aOmAUh70kftI-trfy1dw18DkkE_aXk"})
          .send(blog)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });
    /**
     * Test the Delete route
     */
    //  describe("Delete /api/blogs/delete/id", () => {
    //   it("It should Delete a  blog", (done) => {
    //     const blogId="626798b15a1dcfe2cbd3753b"
    //     chai
    //       .request(server)
    //       .delete("/api/blogs/delete/"+blogId)
    //       .query({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxNzY3MjE1fQ.L9rL9emG8ySh_aOmAUh70kftI-trfy1dw18DkkE_aXk"})
    //       .end((err, res) => {
    //         res.should.have.status(200);
    //         done();
    //       });
    //   });
    // });
  });