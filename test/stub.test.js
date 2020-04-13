// process.env.NODE_ENV = "test";
const chai = require("chai");
const should = chai.should();

const database = require("../modules/mongoose/connect");
const User = require("../modules/user/user.schema");

const Worker = require("../client-stub/client");
const worker = new Worker();

describe("Testing USER CRUD", () => {
  before((done) => {
    User.deleteMany({}, () => {
      console.log("Database Cleared");
      const token = "myToken";
      const user = {};
      done();
    });
  });

  it("should create a new user1", (done) => {
    worker
      .signup({
        firstName: "Yash",
        lastName: "Verma",
        email: "someone@example.com",
        password: "12345",
        username: "yashkumarverma",
      })
      .then((resp) => {
        resp.error.should.not.be.true;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should create a new user2", (done) => {
    worker
      .signup({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "12345",
        username: "johndoe",
      })
      .then((resp) => {
        resp.error.should.not.be.true;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should not create a new user with same username", (done) => {
    worker
      .signup({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@gmail.com",
        password: "12345",
        username: "yashkumarverma",
      })
      .then((resp) => {
        resp.error.should.be.true;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should successfully log in using username", (done) => {
    worker
      .login({
        username: "yashkumarverma",
        password: "12345",
      })
      .then((resp) => {
        resp.error.should.not.be.true;
        token = resp.token;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should successfully log in using email", (done) => {
    worker
      .login({
        email: "someone@example.com",
        password: "12345",
      })
      .then((resp) => {
        resp.error.should.not.be.true;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should return info about username already registered", (done) => {
    worker
      .aboutUser("yashkumarverma")
      .then((resp) => {
        resp.error.should.not.be.true;
        // resp.user.username.should.be.equal("yashkumarverma");
        user = resp.user;
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should not return info about username that doesn't exist", (done) => {
    worker
      .aboutUser("narendamodi")
      .then((resp) => {
        resp.error.should.be.true;
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it("should return details about currently logged user", (done) => {
    worker
      .details(user)
      .then((resp) => {
        resp.error.should.not.be.true;
        resp.user._id.should.be.equal(user._id);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it("should not return details when wrong userid passed", (done) => {
    worker
      .details({
        _id: "someRandomId",
      })
      .then((resp) => {
        resp.error.should.be.true;
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it("should delete the account with username yashkumarverma", (done) => {
    worker
      .delete({
        username: "yashkumarverma",
      })
      .then((resp) => {
        resp.error.should.be.true;
        done();
      })
      .catch((error) => {
        done();
      });
  });
});
