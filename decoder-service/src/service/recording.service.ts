import dbConfig from "../data/db.config";
import collectionExists from "../utils/collectionExists";
import getEventEmitter from "../utils/getEventEmitter";

class RecordingsService {
  async createRecordings(recording: any) {
    let data = {};
    try {
      const database = await dbConfig.connect();
      const isNewCollection =
        (await collectionExists(database, "recordings")) === false;

      const collection = database.collection("recordings");
      data = await collection.insertOne(recording);

      if (isNewCollection) {
        getEventEmitter().emit("onRecordingsFirstInsert");
      }

      console.log("Records #", await collection.count());
    } catch (err) {
      console.error("createRecordings", err);
    } finally {
      dbConfig.disconnect();
    }
    return data;
  }

  async getAllRecordings() {
    let data = {};
    try {
      const database = await dbConfig.connect();

      const collection = database.collection("recordings");
      data = await collection.find({});
    } catch (err) {
      console.error("getAllRecordings", err);
    } finally {
      dbConfig.disconnect();
    }
    return data;
  }
}

export default RecordingsService;
