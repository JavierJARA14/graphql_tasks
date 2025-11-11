const tasks=[
    {id: 1, name: 'Tarea 1', completed: false},
    {id: 2, name: 'Tarea 2', completed: false}
]

function getAllTasks(){
    return tasks;
}

function createTask(name){
    const newTask = {
        id: tasks.length + 1,
        name,
        completed: false,
    }
    tasks.push(newTask);
    return newTask;
}

module.exports = {
    getAllTasks,
    createTask
}