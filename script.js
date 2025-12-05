const submitButton = document.getElementById('submit');
const newTask = document.getElementById('new-task-input');
const newTaskDescription = document.getElementById('new-task-descr-input');
const newTaskDate = document.getElementById('new-task-date-input');
const taskList = document.querySelector('.taskList');
const taskLine = document.querySelector('.taskLine');
const taskInfos = document.querySelector('.taskInfos');
const undoneButton = document.getElementById('undone');
const doneButton = document.getElementById('done');
const allButton = document.getElementById('all');


let tasks = [];
// let myTask = {
//   title: '',
//   description: '',
//   dueDate: '',
//   completed: false
// }
let taskBase = `<div class="taskLine">
                  <input type="checkbox">
                  <p class="taskTitle">title</p>
                  <i class="ph ph-trash delete" id="delete"></i>
                </div>
                <div class="taskInfos">
                  <p class="taskDescription">description</p>
                  <p class="taskDate">Due date: dueDate</p>
                </div>`;

function generateTaskHTML(task) {
  return taskBase
  .replace('title', task.title)
  .replace('description', task.description)
  .replace('dueDate', task.dueDate);

}
function createLi(myTask) {
  const li = document.createElement('li');
      li.className = 'taskItem';
      li.innerHTML = generateTaskHTML(myTask);
      return li;
}


// * CREER UNE TACHE
submitButton.addEventListener("click", () =>{

  if (newTask.value.trim() === '') {  // vérifie que le champ n'est pas vide
    alert('Please enter a task title.');
    return;
  }
  taskList.textContent = ''; // vide la liste
  tasks.push({         // crée la nouvelle tache
    title: newTask.value,
    description: newTaskDescription.value,
    dueDate: newTaskDate.value,
    completed: false });

  tasks.forEach((task) => {

    const li = createLi(task);

    const checkbox = li.querySelector('input[type="checkbox"]'); // Restaure l'état de la checkbox
    checkbox.checked = task.completed;
    if (task.completed) {
      li.classList.add('completed');
    }
    taskList.appendChild(li);
  })
  newTask.value = '';
  newTaskDescription.value = '';
  newTaskDate.value = '';

})

// ! SUPPRIMER UNE TACHE
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
    const taskItem = event.target.closest('.taskItem'); // Supprime la tâche correspondante
    const taskTitle = taskItem.querySelector('p').textContent;

    tasks = tasks.filter(task => task.title !== taskTitle); // Retire la tâche du tableau des tâches

    taskItem.remove(); // Retire l'élément de la liste du DOM
  }
});


// ? VALIDER UNE TACHE
taskList.addEventListener('change', (event) => {
  if (event.target.type === 'checkbox') {
    const taskItem = event.target.closest('.taskItem'); // Trouve l'élément de tâche parent
    const taskTitleElement = taskItem.querySelector('.taskTitle'); // Trouve le titre de la tâche
    const taskTitle = taskTitleElement.textContent; // Récupère le texte du titre

    // Trouve la tâche correspondante dans le tableau `tasks`
    const task = tasks.find(t => t.title === taskTitle);
    if (task) {
      task.completed = event.target.checked; // Met à jour l'objet dans `tasks`
      taskItem.classList.toggle('completed', event.target.checked);
    }
  }
});


// * FILTRER LES TACHES
undoneButton.addEventListener('click', () => {
  taskList.textContent = '';
  tasks
    .filter(task => !task.completed)
    .forEach(task => {
      const li = createLi(task);

      taskList.appendChild(li);
    });
});

doneButton.addEventListener('click', () => {
  taskList.textContent = '';
  tasks
    .filter(task => task.completed)
    .forEach(task => {
      const li = document.createElement('li');
      li.className = 'taskItem';
      li.innerHTML = generateTaskHTML(task);
      li.classList.add('completed');
      const checkbox = li.querySelector('input[type="checkbox"]');
      checkbox.checked = true; // Coche la checkbox
      taskList.appendChild(li);
    });
});

allButton.addEventListener('click', () => {
  taskList.textContent = '';
  tasks.forEach(task => {
    const li = createLi(task);

    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.checked = task.completed; // Coche la checkbox si la tâche est complétée
    if (task.completed) {
      li.classList.add('completed'); // Ajoute la classe .completed si la tâche est complétée
    }
    taskList.appendChild(li);
  });
});
