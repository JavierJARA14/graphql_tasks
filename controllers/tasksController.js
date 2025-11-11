const taskModel = require('../models/tasksModel');

const resolvers = {
    Query: {
        getAllTasks: () => taskModel.getAllTasks()
    },

    Mutation: {
        createTask: (_, { name }) => taskModel.createTask(name),
        updateTask: (_, { id, name }) => taskModel.updateTask(id, name),
        deleteTask: (_, {id}) => taskModel.deleteTask(id),
        completeTask: (_, {id}) => taskModel.completeTask(id)
    }
}

module.exports = resolvers;