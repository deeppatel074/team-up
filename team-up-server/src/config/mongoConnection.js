import { MongoClient } from "mongodb";

let _connection = undefined;
let _db = undefined;

module.exports = {
  dbConnection: async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(process.env.MONGODB_SRV);
      _db = await _connection.db(process.env.DB_NAME);
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  },
};
