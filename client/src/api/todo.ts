import { createEffect } from "effector";
import { CreatedTask } from "../types/types";
import { api } from "./axiosInstance";

export const createTaskFx = createEffect( async (task: CreatedTask) => {
    const { data } = await api.post('api/todo/create', task);
    return data;
});

export const getTaskFx = createEffect( async (idUser: string) => {
    const { data } = await api.get('api/todo/' + idUser);
    return data;
});

export const deleteTaskFx = createEffect( async (id: string) => {
    const { data } = await api.delete('api/todo/delete/' + id);
    return data;
});

export const getOnetask = async (userServerId: string, taskId: string) => {
    const { data } = await api.get('api/todo/' + userServerId + '?todoid=' + taskId);
    return data;
}

export const putOneTask = async (dataTask: any) => {
    const { data } = await api.put('api/todo/update', dataTask);
    return data;
}