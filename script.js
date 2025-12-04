const submitButton = document.getElementById('submit');
const newTask = document.getElementById('new-task-input');
const taskList = document.querySelector('.taskList');
const undoneButton = document.getElementById('undone');
const doneButton = document.getElementById('done');
const allButton = document.getElementById('all');


let tasks = [];
let taskBase = '<li class="taskItem"><input type="checkbox"><p>Exemple task</p><i class="ph ph-trash delete" id="delete"></i></li>';


submitButton.addEventListener("click", () =>{
  taskList.textContent = ''; // vide la liste
  tasks.push({ text: newTask.value, completed: false }); // crée la nouvelle tache
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.innerHTML = taskBase.replace('Exemple task', task.text);
    const checkbox = li.querySelector('input[type="checkbox"]'); // Restaure l'état de la checkbox
    checkbox.checked = task.completed;
    if (task.completed) {
      li.classList.add('completed');
    }
    taskList.appendChild(li);
  })
  newTask.value = '';

})

taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
    const taskItem = event.target.closest('.taskItem'); // Supprime la tâche correspondante
    const taskText = taskItem.querySelector('p').textContent;

    tasks = tasks.filter(task => task.text !== taskText); // Retire la tâche du tableau des tâches

    taskItem.remove(); // Retire l'élément de la liste du DOM
  }
});

taskList.addEventListener('change', (event) => {
  if (event.target.type === 'checkbox') {
    const taskItem = event.target.closest('.taskItem');
    const taskText = taskItem.querySelector('p').textContent;
    const task = tasks.find(t => t.text === taskText);
    if (task) {
      task.completed = event.target.checked;      // Met à jour l'objet dans `tasks`
      taskItem.classList.toggle('completed', event.target.checked);
    }
  }
});

undoneButton.addEventListener('click', () => {
  taskList.textContent = '';
  tasks
    .filter(task => !task.completed)
    .forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = taskBase.replace('Exemple task', task.text);

      taskList.appendChild(li);
    });
});

doneButton.addEventListener('click', () => {
  taskList.textContent = '';
  tasks
    .filter(task => task.completed)
    .forEach(task => {
      const li = document.createElement('li');
      li.classList.add('completed');
      li.innerHTML = taskBase.replace('Exemple task', task.text);
      const checkbox = li.querySelector('input[type="checkbox"]');
      checkbox.checked = true; // Coche la checkbox
      taskList.appendChild(li);
    });
});

allButton.addEventListener('click', () => {
  taskList.textContent = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = taskBase.replace('Exemple task', task.text);
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.checked = task.completed; // Coche la checkbox si la tâche est complétée
    if (task.completed) {
      li.classList.add('completed'); // Ajoute la classe .completed si la tâche est complétée
    }
    taskList.appendChild(li);
  });
});
