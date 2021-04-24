import dbConfig from "../data/db.config";

class RecordingsService {
  async createRecordings(recording: any) {
    let data = {};
    try {
      const database = await dbConfig.connect();
      const collection = database.collection("recordings");
      data = await collection.insertOne(recording);
    } finally {
      dbConfig.disconnect();
    }
    return data;
  }
}

export default RecordingsService;
