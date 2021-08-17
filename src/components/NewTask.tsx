import React, { FC, useContext, useState, } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components'
import { TasksType } from '../types/types';
import { generateId } from '../utils/data';
import { BoardContext } from './Board';

type PropsNewTask = {
  setTasks: (a: {}) => void
  columnId: string

}
const NewTask: FC<PropsNewTask> = ({ setTasks, columnId, }) => {
  const [newEdit, setNewEdit] = useState(false)
  const [tempTitle, setTempTitle] = useState<any>('')

  const { author } = useContext(BoardContext)

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(value)
  };

  const addNewTask = () => {
    setTasks((oldTasks: TasksType) => {
      const id = generateId()
      return {
        ...oldTasks,
        [id]: { id, title: tempTitle, columnId: columnId, description: '', author: author }
      }
    })
    setTempTitle('')
    setNewEdit(false)
  }
  return (
    <Wrap>
      {
        newEdit
          ? <>
            <Form.Control
              onChange={handleOnChange}
              placeholder='Title'
              type='text'
              autoFocus
            />
            <WrapButtons>
              <CustomButton onClick={() => { tempTitle && addNewTask() }} >Save</CustomButton>
              <CustomButton onClick={() => { setNewEdit(false) }} >Cancel</CustomButton>
            </WrapButtons>
          </>
          : <Button variant="secondary" onClick={() => { setNewEdit(true) }} >Add another list</Button>
      }

    </Wrap>
  );
}


const CustomButton = styled.div`
margin:3px;
width:60px;
padding:5px;
border: none;
background-color:var( --border-color);
cursor: pointer;
border-radius:5px;
`
const WrapButtons = styled.div`
display: flex;
`
const Wrap = styled.div`
padding:10px;
width:260px
`

export default NewTask;
