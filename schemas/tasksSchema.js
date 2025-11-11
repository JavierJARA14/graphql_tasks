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
        """Crea una nueva tarea"""
        createTask(name: String!, completed: Boolean!): Task
    }
`;