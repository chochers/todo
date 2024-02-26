import React, { useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  Group,
  Card,
  CardGrid,
  Button,
  FormLayout,
  FormItem,
  Input,
  Textarea,
  ModalRoot,
} from "@vkontakte/vkui";
import { Icon24Delete, Icon24Add } from "@vkontakte/icons";
import "@vkontakte/vkui/dist/vkui.css";
import { CreatedTask, Task } from "../types/types";
import { createTaskFx, deleteTaskFx, getTaskFx } from "../api/todo";
import { useUnit } from "effector-react";
import { $tasks, filterTasks, setTaskId } from "../store/task";
import { $userServer } from "../store/user";

const Home = ({ id, go }: any) => {
  const [tasks, userServer] = useUnit([$tasks, $userServer]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    if (userServer) {
      getTaskFx(userServer.id);
    }
  }, [userServer]);

  const addTask = async () => {

    if (!newTaskTitle.trim() || !newTaskDescription.trim()) return;

    const dataToCreatedNewTask: CreatedTask = {
      title: newTaskTitle,
      descr: newTaskDescription,
      priority: 'HIGHT',
      userId: 'c3767e86-5548-44fd-9166-76c238c7ed12',
    };

    const dataTask: Task = await createTaskFx(dataToCreatedNewTask);

    if (dataTask) {
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  const deleteTask = async (taskId: string) => {
    const isDelete = await deleteTaskFx(taskId);
    if (isDelete == 200) {
      filterTasks(taskId);
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader>ToDo Список</PanelHeader>
      <FormLayout>
        <FormItem top="Новая задача">
          <Input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Заголовок задачи"
            required
          />
        </FormItem>
        <FormItem top="Описание">
          <Textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Описание задачи"
            required
          />
        </FormItem>
        <FormItem>
          <Button size="l" stretched before={<Icon24Add />} onClick={addTask}>
            Добавить
          </Button>
        </FormItem>
      </FormLayout>
      <Group>
        <CardGrid>
          {tasks.map((task) => (
            <Card
              mode="shadow"
              key={task.id}
              onClick={() => {
                setTaskId(task.id);
                go({ currentTarget: { dataset: { to: "taskdetails"} } })
              }}
            >
              <div
                style={{
                  padding: "16px",
                  maxHeight: "100px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    marginBottom: "12px",
                    fontSize: "16px",
                    fontWeight: "500",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {task.title.length > 10
                    ? task.title.substring(0, 10) + "..."
                    : task.title}
                </div>
                <div
                  style={{
                    marginBottom: "12px",
                    color: "#555",
                    fontSize: "14px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {task.descr.length > 10
                    ? task.descr.substring(0, 10) + "..."
                    : task.descr}
                </div>
                <Button
                  before={<Icon24Delete />}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                >
                  Удалить
                </Button>
              </div>
            </Card>
          ))}
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default Home;
