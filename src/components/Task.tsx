import React, { FC,  useMemo, useState } from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import { CommentInterface, CommentsType, TasksType } from '../types/types'
import TaskModal from './TaskModal'

type PropsTask = {
  title: string
  comments: CommentsType
  description: string
  author: string
  setTasks: (a: {}) => void
  taskId: string
  columnTitle: string
}
const Task: FC<PropsTask> = ({
  title, comments, description, author, setTasks, taskId, columnTitle
}) => {
  const [tempTitle, setTempTitle] = useState(title)
  const [onEdit, setOnEdit] = useState(false)
  const [onTaskModal, setOnTaskModal] = useState(false)
  const [arrComments, setArrComments] = useState<any>([])

  useMemo(() => {
    let acc: Array<CommentInterface> = []
    Object.keys(comments).forEach(commentsId => {
      comments[commentsId].taskId === taskId && acc.push(comments[commentsId])
    })
    setArrComments(acc)
  }, [comments,taskId])


  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(value)
  };

  const handleTaskModal = () => {
    setOnTaskModal(!onTaskModal)
  };
  const genNewTasks = (taskId: string, data: string, type: string) => {
    setOnEdit(false)

    type === 'title'
      && setTasks((oldTasks: TasksType) => { return { ...oldTasks, [taskId]: { ...oldTasks[taskId], title: data ? data : oldTasks[taskId].title } } })
    type === 'description'
      && setTasks((oldTasks: TasksType) => { return { ...oldTasks, [taskId]: { ...oldTasks[taskId], description: data } } })
  };
  const deleteTask = (taskId: string) => {
    setTasks((oldTasks: TasksType) => {
      delete oldTasks[taskId]
      return { ...oldTasks }
    })
  };

  return (
    <Wrap >
      <Header >
        {onEdit
          ? <><Form.Control className="mr-3"
            onChange={handleOnChange}
            type='text'
            defaultValue={title}
            placeholder="Title"
            autoFocus
          />
            <Icons><i className="bi bi-check-circle"
              onClick={() => { genNewTasks(taskId, tempTitle, 'title') }}></i></Icons></>
          : <Title onClick={() => { handleTaskModal() }}>{title}</Title>
        }
        <Buttons>
          <Icons><i className="bi bi-x-circle"
            onClick={() => { deleteTask(taskId) }} ></i></Icons>
          <Icons><i className="bi bi-pen"
            onClick={() => { setOnEdit(!onEdit) }}></i></Icons>
        </Buttons>
      </Header>

      {
        comments &&
        <div onClick={() => { handleTaskModal() }}>
          {arrComments.length !== 0
            && <div>{arrComments.length}< i className="bi bi-chat-dots"></i></div>}
        </div>
      }
      <TaskModal
        show={onTaskModal}
        title={title}
        setOnTaskModal={setOnTaskModal}
        description={description}
        author={author}
        columnTitle={columnTitle}
        deleteTask={deleteTask}
        taskId={taskId}
        genNewTasks={genNewTasks}
        arrComments={arrComments}
      />
    </Wrap >
  )
}

const Buttons = styled.div`
      opacity: 0;
      `
const Icons = styled.div`
      margin-left: 2px;
      `
const Wrap = styled.div`
      margin: 4px;
      width:260px;
      padding: 8px 5px 8px 5px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius:5px;
      border: 1px solid var(--border-color);
      &:hover ${Buttons} {
        opacity: 1;
    }
      `

const Header = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding:5px;
      `
const Title = styled.div`
      margin-top:7px;
      margin-left:13px;
      width:100%
 `


export default Task