import express, { text } from "express";
import * as fs from "fs";
import { decode } from "clarity-decode";
import cors from "cors";
import RecordingsService from "./service/recording.service";
import SessionsService from "./service/sessions.service";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const port = process.env.PORT || 5000;

app.get("/tag/:projectId", (req: express.Request, res: express.Response) => {
  fs.readFile(
    __dirname + "/templates/tag.js",
    "utf8",
    (err: any, data: any) => {
      if (err) {
        console.log(err.stack);
        res.status(500).send("Something went wrong!");
      }

      const { projectId } = req.params;

      const tagScript = data
        .replace("<PROJECT_ID>", projectId)
        .replace("<COLLECT_URL>", "http://localhost:5000/collect");

      res.type(".js");
      res.send(tagScript);
    }
  );
});

app.post("/collect", text(), (req: express.Request, res: express.Response) => {
  const decoded = decode(req.body);

  const service = new RecordingsService();
  service.createRecordings(decoded);

  res.end("Recording saved");
});

app.get("/sessions", async (req: express.Request, res: express.Response) => {
  const service = new SessionsService();

  res.type("json");
  res.send(await service.getAllSessions());
});

app.get("/session/:id", async (req: express.Request, res: express.Response) => {
  const service = new SessionsService();
  const sessionId = req.params.id;

  res.type("json");
  res.send(await service.getSession(sessionId));
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
