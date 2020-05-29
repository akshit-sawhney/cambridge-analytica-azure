const { getByTeacherId } = require('../models/cosmos_db/items');

function getByTeacherIdAndCategory(teacherId, category) {
    return new Promise((resolve, reject) => {
        getByTeacherId(teacherId, category)
            .then(res => {
                if (res && res.resources) {
                    resolve(res.resources);
                }
            })
            .catch(err => {
                console.log('error: ', err)
                resolve([]);
            });
    });
}

exports.getByTeacherIdAndCategory = getByTeacherIdAndCategory;