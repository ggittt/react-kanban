export interface TaskInterface {
  id: string;
  columnId: string;
  title: string;
  description: string;
  author: string;
}
export type TasksType = Record<string, TaskInterface>


export interface CommentInterface {
  id: string;
  taskId: string;
  author: string;
  text: string;
}
export type CommentsType = Record<string, CommentInterface>


export interface ColumnInterface {
  id: string;
  title: string;
}
export type ColumnsType = Record<string, ColumnInterface>
