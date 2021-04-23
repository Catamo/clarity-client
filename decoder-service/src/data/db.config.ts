import { Db, MongoClient } from "mongodb";

const DATABASE_NAME = "clarity_in_house";

class DatabaseConfig {
  private client: MongoClient | null;

  constructor() {
    this.client = null;
  }

  connect = async (): Promise<Db> => {
    const url: string = process.env.MONGODB_CONECTION_STRING!;

    try {
      this.client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        auth: {
          user: "root",
          password: "root",
        },
      });
    } catch (e) {
      throw e;
    }

    return this.client.db(DATABASE_NAME);
  };

  disconnect = (): void => {
    if (!this.client || !this.client.isConnected()) {
      return;
    }

    this.client.close();
  };
}

export default new DatabaseConfig();
