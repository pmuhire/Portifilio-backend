// require("dotenv").config();
// let chai = require("chai");
// let chaihttp = require("chai-http");
// let server = `https://my-brand-backend-app.herokuapp.com`;

// // Assertion  style
// chai.should();

// chai.use(chaihttp);

// describe("Users  APIs", () => {
//   /**
//    * Test the Get route
//    */
//   describe("Get /api/users", () => {
//     it("It should GET all users", (done) => {
//       chai
//         .request(server)
//         .get("/api/users")
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("array");
//           done();
//         });
//     });
//     it("It should NOT GET all users", (done) => {
//       chai
//         .request(server)
//         .get("/api/user")
//         .end((err, res) => {
//           res.should.have.status(404);
//           done();
//         });
//     });
//   });
//   /**
//    * Test the Get (by Id) route
//    */
//   describe("Get /api/users/:id", () => {
//     it("It should GET a requested user", (done) => {
//       const userId = "6267d827f72969b4f1ae450d";
//       chai
//         .request(server)
//         .get("/api/users/" + userId)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("object");
//           res.body.should.have.property("fullNames");
//           res.body.should.have.property("userName");
//           res.body.should.have.property("email");
//           res.body.should.have.property("password");
//           res.body.should.have.property("_id").eql(userId);
//           done();
//         });
//     });
//     it("It should GET no user", (done) => {
//       const userId = "626a4244528380a2f2809d83";
//       chai
//         .request(server)
//         .get("/api/users/" + userId)
//         .end((err, res) => {
//           res.should.have.status(404);
//           res.text.should.be.eq("User does not exist");
//           done();
//         });
//     });
//   });
//   /**
//    * Test the Post route
//    */
//   describe("POST /api/user", () => {
//     it("It should POST a new User", (done) => {
//       let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
//       let string = '';
//       for (let ii = 0; ii < 15; ii++) {
//         string += chars[Math.floor(Math.random() * chars.length)];
//       }
//       const user = {
//         fullNames: "Muhire Patrick",
//         userName: string,
//         email: string + "@gmail.com",
//         password: "hello3438@!"
//       };
//       chai.request(server)
//         .post("/api/user")
//         .send(user)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("object");
//           res.body.should.have.property("_id")
//           res.body.should.have.property("__v");
//           res.body.should.have.property("fullNames").eq("Muhire Patrick");
//           res.body.should.have.property("userName").eq(string);
//           res.body.should.have.property("email").eq(string + "@gmail.com");
//           done();
//         })
//     });
//     it("It should NOT ADD a  user", (done) => {
//       const user = {
//         fullNames: "Muhire Patrick",
//         userName: "pmuhire",
//         email: "rwantambara@gmail.com",
//         password: "hello3438@!"
//       };
//       chai
//         .request(server)
//         .post("/api/users")
//         .send(user)
//         .end((err, res) => {
//           res.should.have.status(404);
//           done();
//         });
//     });
//   })
//   /**
//    * Test the Put route
//    */
//    describe("PATCH /api/users/update/:id", () => {
//     it("It should UPDATE a  user", (done) => {
//       const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxMjcwNTM1fQ.ih7IofJGEjU3bNt5ep5_3Cs2SrlQRWmwHQbNi0Ji4ts"
//       const userId="626798b15a1dcfe2cbd3753b"
//       const user = {
//         fullNames: "Rwantambara Dismas updated 2"
//       };
//       chai
//         .request(server)
//         .patch("/api/users/update/"+userId)
//         .set({ Authorization: `${token}`})
//         .send(user)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a("object");
//           res.body.should.have.property("_id").eq(userId);
//           res.body.should.have.property("__v");
//           res.body.should.have.property("fullNames").eq("Rwantambara Dismas updated 2");
//           res.body.should.have.property("userName").eq("Rwantambara");
//           res.body.should.have.property("email").eq("rwantambara@gmail.com");
//           done();
//         });
//     });
//   });

//   /**
//    * Test the Delete route
//    */
//    describe("Delete /api/users/delete/id", () => {
//     it("It should Delete a  user", (done) => {
//       const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjY3ZDgyN2Y3Mjk2OWI0ZjFhZTQ1MGQiLCJlbWFpbCI6InBtdWhpcmUyMDAyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJHJQSENxdzZ3Uy9uaEE3ck5veFVvOXVweEUuMVRyeEFkNTN5dHBLZ2RCTGVEL2xsc3cuZ2dlIiwiaWF0IjoxNjUxMjcwNTM1fQ.ih7IofJGEjU3bNt5ep5_3Cs2SrlQRWmwHQbNi0Ji4ts"
//       const userId="626798b15a1dcfe2cbd3753b"
//       chai
//         .request(server)
//         .delete("/api/users/delete/"+userId)
//         .set({ Authorization: `${token}`})
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
// });


// // LOGIN

// describe("POST /api/login", ()=>{
//   it("It should login user who have an account", (done)=>{
//       const user = {
//           email: "pmuhire2002@gmail.com",
//           password: "hello3438@!"
//       }

//       chai.request(server)
//       .post("/api/login")
//       .send(user)
//       .end((err, response)=>{
//           response.should.have.status(200);
//           response.body.should.be.a("object");
//       done();
//       })
//   })
// });

// describe("POST /api/login", ()=>{
//   it("It should not login(INVALID EMAIL OR PASSWORD)", (done)=>{
//       const user = {
//         email: "pmuhire2002@gmail.com",
//         password: "hello3538@!"
//       }

//       chai.request(server)
//       .post("/api/login")
//       .send(user)
//       .end((err, response)=>{
//           response.should.have.status(200);
//           response.body.should.be.a("object");
//       done();
//       })
//   })
// });