const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("../../configs/azure_cosmos");
const { endpoint, key, databaseId, containerId } = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);
const container = database.container(containerId);

const querySpec = {
    query: "SELECT * from c"
};

function create(data) {
    return new Promise((resolve, reject) => {
        container.items.create(data)
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            reject(err);
        })
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        try {
            container.items
                .query(querySpec)
                .fetchAll()
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
    
        } catch (error) {
            reject(error);
        }
    });
}

exports.create = create;
exports.getAll = getAll;