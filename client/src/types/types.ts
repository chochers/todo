export type CreatedTask = {
  title: string,
  descr: string,
  userId: string,
  priority?: string
};

export type Task = {
  createdAt: string,
  descr: string,
  id: string,
  priority: string,
  title: string,
  updatedAt:string,
  userId: string
}

