import React, { FC, useState, } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components'
import { CommentsType } from '../types/types';
import { generateId } from '../utils/data';

type PropsNewComment = {
  setComments: (a: {}) => void
  taskId: string
  author?: string
}
const NewComment: FC<PropsNewComment> = ({ setComments, taskId, author }) => {
  const [newEdit, setNewEdit] = useState(false)
  const [tempText, setTempText] = useState<any>('')

  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTempText(value)
  };

  const addNewComment = () => {
    setComments((oldComments: CommentsType) => {
      const id = generateId()
      return {
        ...oldComments,
        [id]: { id, title: tempText, taskId: taskId, text: tempText, author: author }
      }
    })
    setTempText('')
    setNewEdit(false)
  }
  return (
    <Wrap>
      {
        newEdit
          ? <>
            <Form.Control
              onChange={handleOnChange}
              placeholder='New comments'
              as="textarea"
              type='text'
              className="mb-3"
              autoFocus
            />
            <WrapButtons>
              <CustomButton onClick={() => { tempText && addNewComment() }} >Save</CustomButton>
              <CustomButton onClick={() => { setNewEdit(false) }} >Cancel</CustomButton>
            </WrapButtons>
          </>
          : <Button variant="secondary" onClick={() => { setNewEdit(true) }} >Add another comment</Button>
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
`

export default NewComment;
