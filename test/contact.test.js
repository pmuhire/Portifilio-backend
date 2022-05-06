require("dotenv").config();
let chai = require("chai");
let chaihttp = require("chai-http");
let server = require("../index");
// let server="localhost:1200"

// Assertion  style
chai.should();

chai.use(chaihttp);

describe("Message APIs", () => {
  /**
   * Test the Get route
   */
  describe("Get /api/messages", () => {
    it("It should GET all messages", (done) => {
      chai
        .request(server)
        .get("/api/messages")
        .query({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxNzY3MjE1fQ.L9rL9emG8ySh_aOmAUh70kftI-trfy1dw18DkkE_aXk"})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    it("It should NOT GET all messages", (done) => {
      chai
        .request(server)
        .get("/api/message")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  /**
   * Test the Get (by Id) route
   */
  describe("Get /api/messages/:id", () => {
    it("It should GET a requested message", (done) => {
      const messageId = "626c60b70cbc98262116bb76";
      chai
        .request(server)
        .get("/api/messages/" + messageId)
        .query({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxNzY3MjE1fQ.L9rL9emG8ySh_aOmAUh70kftI-trfy1dw18DkkE_aXk"})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("names");
          res.body.should.have.property("phone");
          res.body.should.have.property("email");
          res.body.should.have.property("message");
          res.body.should.have.property("_id").eql(messageId);
          done();
        });
    });
    it("It should GET no Message", (done) => {
      const messageId = "52717fb721df1cc797851c10";
      chai
        .request(server)
        .get("/api/messages/" + messageId)
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eq("Access Denied! You need to login first or Sign up");
          done();
        });
    });
  });
  /**
   * Test the Post route
   */
  describe("POST /api/message", () => {
    it("It should ADD a  message", (done) => {
      const contact = {
        names: "Muhire Patrick",
        phone: "0783681395",
        email: "pmuhire2002@gmail.com",
        message: "hello3438@!"
      };
      chai
        .request(server)
        .post("/api/message")
        .query({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxNzY3MjE1fQ.L9rL9emG8ySh_aOmAUh70kftI-trfy1dw18DkkE_aXk"})
        .send(contact)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });

    it("It should NOT ADD a  message", (done) => {
        const contact = {
            names: "Muhire Patrick",
            phone: "0783681395",
            email: "pmuhire0122@gmail.com",
            message: "hello3438@!"
        };
        chai
          .request(server)
          .post("/api/messages")
          .send(contact)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          });
      });
  });

  /**
   * Test the Delete route
   */
  //  describe("Delete /api/messages/delete/id", () => {
  //   it("It should Delete a  message", (done) => {
  //     const messageId="62717fb721df1cc797851c10"
  //     chai
  //       .request(server)
  //       .delete("/api/messages/delete/"+messageId)
  //       .query({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxNzY3MjE1fQ.L9rL9emG8ySh_aOmAUh70kftI-trfy1dw18DkkE_aXk"})
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //   });
  // });
});
