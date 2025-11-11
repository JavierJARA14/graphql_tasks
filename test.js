// URL del servidor
const API_URL = 'http://localhost:4000/graphql';

/**
 * Función genérica para enviar peticiones a tu API de GraphQL.
 */
async function fetchGraphQL(query, variables = {}) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    });

    const result = await response.json();

    //ERRORES DE GRAPHQL
    if (result.errors) {
      console.error('--- GraphQL Error ---');
      console.log(JSON.stringify(result.errors, null, 2));
    } else {
      console.log('--- Successful Response ---');
      console.log(JSON.stringify(result.data, null, 2));
    }
    
  } catch (error) {
    //ERRORES DE SERVIDOR
    console.error('Network or Connection Error:', error.message);
  }
}

// --- 1. Definición de la Query: getAllUsers ---
const GET_ALL_USERS_QUERY = `
  query {
    getAllUsers {
      id
      name
      email
      age
    }
  }
`;

// --- 2. Definición de la Query: getUserById ---
const GET_USER_BY_ID_QUERY = `
  query($id: ID!) {
    getUserById(id: $id) {
      id
      name
      email
    }
  }
`;

// --- 3. Definición de la Mutation: createUser ---
const CREATE_USER_MUTATION = `
  mutation($name: String!, $email: String!, $age: Int!) {
    createUser(name: $name, email: $email, age: $age) {
      id
      name
      age
    }
  }
`;

// --- AÑADIDO: 4. Definición de la Mutation: updateUser ---
const UPDATE_USER_MUTATION = `
  mutation($id: ID!, $name: String, $email: String, $age: Int) {
    updateUser(id: $id, name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;

// --- AÑADIDO: 5. Definición de la Mutation: deleteUser ---
const DELETE_USER_MUTATION = `
  mutation($id: ID!) {
    deleteUser(id: $id) {
      id
      name
    }
  }
`;

/**
 * Función principal que ejecuta todas las pruebas en secuencia.
 */
async function runApiTests() {
  console.log('>>> Test 1: Executing getAllUsers (Initial state)...');
  await fetchGraphQL(GET_ALL_USERS_QUERY);
  
  console.log('\n=============================================\n');

  console.log('>>> Test 2: Executing getUserById (requesting id: "1")...');
  await fetchGraphQL(GET_USER_BY_ID_QUERY, { id: "1" });

  console.log('\n=============================================\n');

  console.log('>>> Test 3: Executing createUser (creating "Carlos")...');
  const newUserVars = {
    name: "Carlos Sanchez",
    email: "carlos@correo.com",
    age: 28 
  };
  await fetchGraphQL(CREATE_USER_MUTATION, newUserVars);
  
  console.log('\n=============================================\n');

  // --- AÑADIDO: Prueba de Update ---
  console.log('>>> Test 4: Executing updateUser (updating id: "2")...');
  const updateVars = {
      id: "2", // Actualizando a 'Bob'
      name: "Bobby Tables", // Nuevo nombre
      age: 25 // Nueva edad
  };
  await fetchGraphQL(UPDATE_USER_MUTATION, updateVars);

  console.log('\n=============================================\n');

  // --- AÑADIDO: Prueba de Delete ---
  console.log('>>> Test 5: Executing deleteUser (deleting id: "1")...');
  await fetchGraphQL(DELETE_USER_MUTATION, { id: "1" });

  console.log('\n=============================================\n');

  // --- AÑADIDO: Prueba final ---
  console.log('>>> Test 6: Executing getAllUsers (Final state)...');
  console.log('(Should show Bobby [id:2] and Carlos [id:3]. Alice [id:1] should be gone)');
  await fetchGraphQL(GET_ALL_USERS_QUERY);

  console.log('\nAll tests finished.');
}

// --- Ejecuta la función principal ---
runApiTests();