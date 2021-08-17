import React, { FC, KeyboardEvent, useState, } from 'react';
import { CloseButton, Form } from 'react-bootstrap';
import styled from 'styled-components'
import { ColumnsType, CommentsType, TasksType } from '../types/types';
import NewTask from './NewTask';
import Task from './Task';

type PropsColumn = {
  title: string
  setColumns: (a: {}) => void
  tasks: TasksType
  setTasks: (a: {}) => void
  columnId: string
  comments: CommentsType
}

const Column: FC<PropsColumn> = ({ title, columnId, setColumns, tasks, setTasks, comments }) => {
  const [onEditTitle, setOnEditTitle] = useState(false)
  const [tempTitle, setTempTitle] = useState(title)

  const handleClickTitle = () => {
    setOnEditTitle(!onEditTitle)

  };
  const saveTitle = (columnId: string) => {
    setOnEditTitle(false)
    setColumns((oldColumns: ColumnsType) => {
      return { ...oldColumns, [columnId]: { ...oldColumns[columnId], title: tempTitle } }
    })
  };
  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(value)
  };
  const deleteColumn = (columnId: string) => {
    setColumns((oldColumns: ColumnsType) => {
      delete oldColumns[columnId]
      return { ...oldColumns }
    })
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    e.preventDefault()
    if (e.key === 'Enter') {
      saveTitle(columnId)
    }
  };


  return (
    <Wrap>
      <Header >
        {onEditTitle
          ? <Form.Control
            onChange={handleOnChange}
            placeholder='Title'
            defaultValue={title}
            type='text'
            autoFocus
            onKeyUp={handleKeyPress}
            onBlur={() => { saveTitle(columnId) }}
          />
          : <Title onClick={handleClickTitle}>{
            title.length === 0
              ? 'Title'
              : <Text>{title}</Text>}</Title>}

        <CloseButton onClick={() => { deleteColumn(columnId) }} />
      </Header>
      <ListTasks>
        {
          Object.keys(tasks).map(taskId => {
            if (tasks[taskId].columnId === columnId) {
              return <Task
                key={taskId}
                setTasks={setTasks}
                taskId={taskId}
                title={tasks[taskId].title}
                author={tasks[taskId].author}
                columnTitle={title}
                description={tasks[taskId].description}
                comments={comments}
              />
            } return null
          })
        }

      </ListTasks>
      <NewTask
        setTasks={setTasks}
        columnId={columnId} />
    </Wrap>
  );
}

const Wrap = styled.div`
width: 272px;
margin: 0 4px;
height: 100%;
box-sizing: border-box;
display: inline-block;
white-space: nowrap;
background-color: #ebecf0;
border-radius:5px;
    
`
const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding:5px;
z-index: 2;
`
const Title = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding:3px;
margin-top:4px;
`
const Text = styled.div`
overflow-wrap: break-word;
white-space: normal;
word-break: break-word;
`
const ListTasks = styled.div`
width:270px;
display: flex;
align-items: flex-start;
flex-direction: column;
padding: 1px;
`


export default Column;
