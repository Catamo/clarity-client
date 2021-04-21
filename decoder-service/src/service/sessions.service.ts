import dbConfig from "../data/db.config";

class SessionsService {
  async getAllSessions() {
    let data = {};
    try {
      const database = await dbConfig.connect();
      const collection = database.collection("sessions");
      data = await collection.find({});
    } finally {
      dbConfig.disconnect();
    }
    return data;
  }
}

export default SessionsService;
