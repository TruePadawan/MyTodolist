export function sortBasedOnCompletion(taskList) {
  if (taskList.length === 0) return [];

  let sortedTaskList = taskList.filter((item) => item.status === true);

  if (sortedTaskList.length === 0) return taskList;

  for (let i = 0; i < taskList.length; ++i) {
    if (taskList[i].status === false) {
      sortedTaskList.push(taskList[i]);
    }
  }

  return sortedTaskList;
}

export function sortBasedOnUncompletion(taskList) {
  if (taskList.length === 0) return [];

  let sortedTaskList = taskList.filter((item) => item.status === false);

  if (sortedTaskList.length === 0) return taskList;

  for (let i = 0; i < taskList.length; ++i) {
    if (taskList[i].status === true) {
      sortedTaskList.push(taskList[i]);
    }
  }

  return sortedTaskList;
}
