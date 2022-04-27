require("dotenv").config();
let chai = require("chai");
let chaihttp = require("chai-http");
let server = `http://localhost:1200`;

// Assertion  style
chai.should();

chai.use(chaihttp);

describe("Users  APIs", () => {
  /**
   * Test the Get route
   */
  describe("Get /api/users", () => {
    it("It should GET all users", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
    it("It should NOT GET all users", (done) => {
      chai
        .request(server)
        .get("/api/user")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  /**
   * Test the Get (by Id) route
   */
  describe("Get /api/users/:id", () => {
    it("It should GET a requested user", (done) => {
      const userId = "624c835f06fadea76fb63537";
      chai
        .request(server)
        .get("/api/users/" + userId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("fullNames");
          res.body.should.have.property("userName");
          res.body.should.have.property("email");
          res.body.should.have.property("password");
          res.body.should.have.property("_id").eql(userId);
          done();
        });
    });
    it("It should GET no user", (done) => {
      const userId = "624c84e256176b40b53d7973";
      chai
        .request(server)
        .get("/api/users/" + userId)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("User does not exist");
          done();
        });
    });
  });
  /**
   * Test the Post route
   */
  describe("POST /api/user", () => {
    it("It should ADD a  user", (done) => {
      const user = {
        fullNames: "Muhire Patrick",
        userName: "pmuhire",
        email: "pmuhire0122@gmail.com",
        password: "hello3438@!"
      };
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id")
          res.body.should.have.property("__v");
          res.body.should.have.property("fullNames").eq("Muhire Patrick");
          res.body.should.have.property("userName").eq("pmuhire");
          res.body.should.have.property("email").eq("pmuhire0122@gmail.com");
          done();
        });
    });

    it("It should NOT ADD a  user", (done) => {
        const user = {
          fullNames: "Muhire Patrick",
          userName: "pmuhire",
          email: "rwantambara@gmail.com",
          password: "hello3438@!"
        };
        chai
          .request(server)
          .post("/api/user")
          .send(user)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          });
      });
  });
  /**
   * Test the Put route
   */
   describe("PATCH /api/users/update/:id", () => {
    it("It should UPDATE a  user", (done) => {
      const userId="626798b15a1dcfe2cbd3753b"
      const user = {
        fullNames: "Rwantambara Dismas updated 2"
      };
      chai
        .request(server)
        .patch("/api/users/update/"+userId)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id").eq(userId);
          res.body.should.have.property("__v");
          res.body.should.have.property("fullNames").eq("Rwantambara Dismas updated 2");
          res.body.should.have.property("userName").eq("Rwantambara");
          res.body.should.have.property("email").eq("rwantambara@gmail.com");
          done();
        });
    });
  });

  /**
   * Test the Delete route
   */
   describe("Delete /api/users/update/id", () => {
    it("It should Delete a  user", (done) => {
      const userId="626798b15a1dcfe2cbd3753b"
      chai
        .request(server)
        .delete("/api/users/delete/"+userId)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
