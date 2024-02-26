import React, { useEffect, useState } from "react";
import {
  Panel,
  PanelHeader,
  Button,
  Div,
  PanelHeaderClose,
  Input,
  Textarea,
  FormLayoutGroup,
  FormItem,
  Text,
  Separator,
  Title,
} from "@vkontakte/vkui";
import { Icon24Delete, Icon20EditCircleFillBlue } from "@vkontakte/icons";
import "@vkontakte/vkui/dist/vkui.css";
import { Task } from "../types/types";
import { getOnetask, putOneTask } from "../api/todo";
import { useUnit } from "effector-react";
import { $userServer } from "../store/user";
import { $taskId } from "../store/task";

type TaskDetailsProps = {
  id: any,
  go: any,
};

const TaskDetails: React.FC<TaskDetailsProps> = ({ id, go }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const userServer = useUnit($userServer);
  const [editedTitle, setEditedTitle] = useState(task?.title || "");
  const [editedDescription, setEditedDescription] = useState(task?.descr || "");
  const taskId = useUnit($taskId);

  useEffect(() => {
    const getCurrentTask = async () => {
      const currentTask: Task = await getOnetask(userServer.id, taskId);
      setTask(currentTask);
    }
    getCurrentTask();
  }, [taskId]);

  useEffect(() => {
    if (task) {
      setEditedTitle(task?.title);
      setEditedDescription(task?.descr);
    }
  }, [task]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedDescription(e.target.value);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveButtonClick = async () => {
    const dataTask = {
      toDoId: taskId,
      title: editedTitle,
      descr: editedDescription
    }
    const updateTask = await putOneTask(dataTask);
    setTask(updateTask);
    setIsEditing(false);
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderClose
            onClick={() => go({ currentTarget: { dataset: { to: "home" } } })}
          />
        }
        separator={false}
      >
        Детали задачи
      </PanelHeader>
      <Div style={{ padding: "20px" }}>
        {isEditing ? (
          <FormLayoutGroup>
            <FormItem top="Название задачи">
              <Input
                value={editedTitle}
                onChange={handleTitleChange}
                placeholder="Введите название"
              />
            </FormItem>
            <FormItem top="Описание задачи">
              <Textarea
                value={editedDescription}
                onChange={handleDescriptionChange}
                placeholder="Введите описание"
              />
            </FormItem>
            <Button
              size="l"
              style={{ margin: "18px" }}
              onClick={handleSaveButtonClick}
            >
              Сохранить
            </Button>
          </FormLayoutGroup>
        ) : (
          <>
            <Div style={{ padding: 20 }}>
              <Title level="3" style={{ padding: "20px 0px" }}>
                Название задачи: {task?.title}
              </Title>
              <Separator />
              <Text style={{ padding: "20px 0px" }}>
                Описание задачи:{task?.descr}
              </Text>
            </Div>
            <Div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                mode="secondary"
                before={<Icon20EditCircleFillBlue />}
                onClick={handleEditButtonClick}
              >
                Редактировать
              </Button>
              <Button before={<Icon24Delete />}>Удалить</Button>
            </Div>
          </>
        )}
      </Div>
    </Panel>
  );
};

export default TaskDetails;
