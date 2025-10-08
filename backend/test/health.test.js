import request from 'supertest'
import app from '../src/app.js'


describe("prueba de health", () =>{

    it("deberia responder bien el health y responder estatus 200", async () =>{
        const res = await request(app)
        .post("/health")

       expect(res.statusCode).toBe(200)
       expect(
        res.body.status === "ok" ||res.body.message === "API is healthy"
       ).toBeTruthy()
       
    })

  })