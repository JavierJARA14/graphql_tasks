const { gql } = require('apollo-server');

const typeDefs = gql`
    """Definición del esquema para tareas """
    type Task {
        """ Identificador """
        id: ID!
        name: String!
        completed: Boolean!
    }

    type Query {
        """Obtiene la lista de todas las tareas"""
        getAllTasks: [Task]
    }

    type Mutation {
        """ Crea una nueva tarea """
        createTask(name: String!): Task
        """ Actualiza una tarea """
        updateTask(id: ID!, name: String!): Task
        """ Elimina una tarea """
        deleteTask(id:ID!): Task
        """ Marca una tarea como completa """
        completeTask(id:ID!): Task
    }
`;

module.exports = typeDefs;