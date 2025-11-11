const taskModel = require('../models/tasksModel');

const resolvers = {
    Query: {
        getAllTasks: () => taskModel.getAllTasks()
    },

    Mutation: {
        createTask: (_, { name }) => taskModel.createTask(name)
    }
}

module.exports = resolvers();