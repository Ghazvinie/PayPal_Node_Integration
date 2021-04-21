const mongodb = require('mongodb');
const mongoService = module.exports;

const connectionString = process.env.MongoConnectionString || 'mongodb://localhost:27017/paypaltesting';

const Connect = (callback) => {
    mongodb.connect(connectionString, (error, database) => {
        return callback(error, database, () => {
            database.close();
        });
    });
};

mongoService.Create = (collectionName, createObject, callback) => {

    Connect((error, database, close) => {
        database.collection(collectionName).insert(createObject, (error, results) => {

            callback(error, results);
            return close();
        });
    });
};

mongoService.Read = (collectionName, readObject, callback) => {

    Connect((error, database, close) => {
        database.collection(collectionName).find(readObject).toArray((error, results) => {
            callback(error, results);
            close();
        });
    });
};


mongoService.Update = (collectionName, findObject, updateObject, callback) => {

    Connect((error, database, close) => {

        database.collection(collectionName).update(findObject, { $set: updateObject }, (error, results) => {
            callback(error, results);
            return close();
        });
    });
};

mongoService.Delete = (collectionName, findObject, callback) => {

    Connect((error, database, close) => {

        database.collection(collectionName).remove(findObject, (error, results) => {

            callback(error, results);
            return close();

        });
    });
};
