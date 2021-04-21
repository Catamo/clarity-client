import express from "express";
import * as fs from "fs";
import { decode } from "clarity-decode";
import cors from "cors";
import RecordingsService from "./service/recording.service";
import SessionsService from "./service/sessions.service";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const port = process.env.PORT || 5000;

app.get("/tag/:projectId", (req: any, res: any) => {
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

app.post("/collect", express.text(), (req: any, res: any, next: () => void) => {
  const decoded = decode(req.body);

  const service = new RecordingsService();
  service.createRecordings(decoded);

  res.end("Recording saved");
});

app.get("/recordings", (req: any, res: any) => {
  const service = new RecordingsService();

  res.type("json");
  res.send(service.getAllRecordings());
});

app.get("/sessions", (req: any, res: any) => {
  const service = new SessionsService();

  res.type("json");
  res.send(service.getAllSessions());
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}!`);
});
