import React, { FC, useState, } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components'
import { ColumnsType } from '../types/types';
import { generateId } from '../utils/data';

type PropsNewColumn = {
  setColumns: (a: {}) => void
}
const NewColumn: FC<PropsNewColumn> = ({ setColumns }) => {
  const [newEdit, setNewEdit] = useState(false)
  const [tempTitle, setTempTitle] = useState<any>('')

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(value)
  };

  const addNewColumn = () => {
    setColumns((oldColumns: ColumnsType) => {
      const id = generateId()
      return { ...oldColumns, [id]: { id, title: tempTitle } }
    })
    setTempTitle('')
    setNewEdit(false)
  }
  return (
    <>
      {
        newEdit
          ? <Wrap>
            <Form.Control
              onChange={handleOnChange}
              placeholder='Title'
              type='text'
              autoFocus
            />
            <WrapButtons>
              <CustomButton onClick={() => { tempTitle && addNewColumn() }} >Save</CustomButton>
              <CustomButton onClick={() => { setNewEdit(false) }} >Cancel</CustomButton>
            </WrapButtons>
          </Wrap>
          : <Button variant="secondary" onClick={() => { setNewEdit(true) }} >Add another list</Button>
      }
    </>
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
width:260px
`

export default NewColumn;
