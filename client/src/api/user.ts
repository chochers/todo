import { createEffect } from "effector";
import { api } from "./axiosInstance";

export const setUserServerFx = createEffect(async (id: number) => {
    const idToString = id.toString()
    const { data } = await api.post('api/todo/user/controll', { vkId: idToString });
    return data;
});