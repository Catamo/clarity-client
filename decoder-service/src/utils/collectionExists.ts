import { Db } from "mongodb";

const collectionExists = (db: Db, collName: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.listCollections({ name: collName }).next((err, collinfo) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(!!collinfo);
    });
  });
};

export default collectionExists;
