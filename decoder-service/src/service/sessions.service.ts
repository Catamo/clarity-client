import dbConfig from "../data/db.config";

class SessionsService {
  async getAllSessions() {
    let data = [];
    try {
      const database = await dbConfig.connect();
      const collection = database.collection("sessions");
      const results = await collection.find({});
      data = await results.toArray();
    } finally {
      dbConfig.disconnect();
    }
    return data;
  }

  async getSession(sessionId: string) {
    let data = {};
    try {
      const database = await dbConfig.connect();

      const collection = database.collection("recordings");
      const collectionResults = await collection.find({
        "envelope.sessionId": sessionId,
      });
      console.log(collection);
      data = {
        recordings: await collectionResults.toArray(),
      };
    } finally {
      dbConfig.disconnect();
    }
    return data;
  }
}

export default SessionsService;
