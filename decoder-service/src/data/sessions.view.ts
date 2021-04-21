import { Db } from "mongodb";

const createSessionsView = (db: Db) => {
  db.createCollection("sessions", {
    viewOn: "recordings",
    pipeline: [
      {
        $group: {
          sessionId: "$envelope.sessionId",
          total: { $sum: "$amount" },
        },
      },
    ],
  });
};

export { createSessionsView };
