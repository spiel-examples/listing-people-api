import * as Code from "code";
import * as Lab from "lab";
import * as request from "request-promise";
import {addPerson, delPerson, getPerson} from "./request";

const lab = Lab.script();

export { lab };

lab.experiment("People", async () => {
  let id: string;

  lab.test("add person has to be success", async () => {
    const res = await request(addPerson);
    id = res._id;
    Code.expect(id).to.be.a.string();
  });
  lab.test("get person added last time", async () => {
    const filter = {filter: {
        _id: id,
      },
    };
    getPerson.uri = `${getPerson.uri}?response=${encodeURIComponent(JSON.stringify(filter))}`;
    const res = await request(getPerson);
    Code.expect(res.statusCode).to.be.equal(200);
    Code.expect(res.body).to.include("camion");
  });
  lab.test("add the same person has to fail", async () => {
    try {
      const res = await request(addPerson);
    } catch (err) {
      Code.expect(err.statusCode).to.be.equal(500);
    }
  });
  lab.test("delete person has to be success", async () => {
    delPerson.uri = `${delPerson.uri}/${id}`;
    const res = await request(delPerson);
    Code.expect(res.statusCode).to.be.equal(200);
  });
});
