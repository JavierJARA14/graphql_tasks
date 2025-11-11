const emailService = require('../services/emailService');

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

function updateTask(id, name){
    const toNumeric = Number(id);
    const index = tasks.findIndex(task => task.id === toNumeric);
    if (index === -1) return null;
    tasks[index] = {
        ...tasks[index],
        name: typeof name === "undefined" ? tasks[index].name : name,
    };
    return tasks[index];
}

function deleteTask(id){
    const toNumeric = Number(id);
    const index = tasks.findIndex((t) => t.id === toNumeric);
    if (index === -1) return null;
    const deletedTask = tasks.splice(index, 1);
    return deletedTask[0];
}

function completeTask(id){
    const toNumeric = Number(id);
    const index = tasks.findIndex((t) => t.id === toNumeric);
    if(index === -1) return null;
    tasks[index] = {
        ...tasks[index],
        completed: true,
    };
    emailService.sendTaskCompletionEmail(tasks[index]);
    return tasks[index];
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
}