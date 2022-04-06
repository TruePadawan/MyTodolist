export function sortBasedOnCompletion(taskList) {
  if (taskList.length === 0) return [];

  let sortedTaskList = taskList.filter((item) => item.complete === true);

  if (sortedTaskList.length === 0) return taskList;

  for (let i = 0; i < taskList.length; ++i) {
    if (taskList[i].complete === false) {
      sortedTaskList.push(taskList[i]);
    }
  }

  return sortedTaskList;
}

export function sortBasedOnUncompletion(taskList) {
  if (taskList.length === 0) return [];

  let sortedTaskList = taskList.filter((item) => item.complete === false);

  if (sortedTaskList.length === 0) return taskList;

  for (let i = 0; i < taskList.length; ++i) {
    if (taskList[i].complete === true) {
      sortedTaskList.push(taskList[i]);
    }
  }

  return sortedTaskList;
}
