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

function getByTeacherId(teacherId, category) {
    return new Promise((resolve, reject) => {
        const getByTeacherIdQuerySpec = {
            query: `SELECT * from c WHERE c.teacher_id= "${teacherId}" and c.category = "${category}"`
        };
        try {
            container.items
                .query(getByTeacherIdQuerySpec)
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

function update(id, category, item) {
    return new Promise((resolve, reject) => {
        container
            .item(id, category)
            .replace(item)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    });
}

exports.create = create;
exports.getAll = getAll;
exports.getByTeacherId = getByTeacherId;
exports.update = update