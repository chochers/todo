import { createEvent, createStore } from "effector";
import { createTaskFx, getTaskFx } from "../api/todo";
import { Task } from "../types/types";

export const $tasks = createStore<Task[]>([]);
export const $taskId = createStore<string>('');

export const filterTasks = createEvent<string>();
export const setTaskId = createEvent<string>();

$tasks.on(createTaskFx.doneData, (tasks, newTask) => [...tasks, newTask]);

$tasks.on(getTaskFx.doneData, (_, tasks) => tasks);

$tasks.on(filterTasks, (tasks, taskId) => tasks.filter((task) => task.id !== taskId));

$taskId.on(setTaskId, (_, taksId) => taksId);