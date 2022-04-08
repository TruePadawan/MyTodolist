export function sortBasedOnCompletion(taskList) {
  if (taskList.length === 0) return [];

  let sortedTaskList = taskList.filter((item) => {
    const itemData = item[Object.keys(item)[0]];
    
    return itemData.complete === true;
  });

  if (sortedTaskList.length === 0) return taskList;

  for (let i = 0; i < taskList.length; ++i) {
    const item = taskList[i];
    const itemData = item[Object.keys(item)[0]];

    if (itemData.complete === false) {
      sortedTaskList.push(taskList[i]);
    }
  }

  return sortedTaskList;
}

export function sortBasedOnUncompletion(taskList) {
  if (taskList.length === 0) return [];

  let sortedTaskList = taskList.filter((item) => {
    const itemData = item[Object.keys(item)[0]];

    return itemData.complete === false;
  });

  if (sortedTaskList.length === 0) return taskList;

  for (let i = 0; i < taskList.length; ++i) {
    const item = taskList[i];
    const itemData = item[Object.keys(item)[0]];

    if (itemData.complete === true) {
      sortedTaskList.push(taskList[i]);
    }
  }

  return sortedTaskList;
}
