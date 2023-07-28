import supertest from "supertest"
import app from "../index"
import auth from "../routes/authRouter"
import { request } from "express"

describe("POST /user", () => {
  describe("given a username and password",() => {
     test("should respond with a 200 status code", async() => {
      const response = await request(auth).post("/register").send({
        username: "username",
        email: "email",
        password: "password"
      })
      expect(response.statusCode).toBe(200)
     })
  })

  describe("when the username and password is missing", () => {

  })
})