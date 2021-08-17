import React, { FC, useState } from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import { CommentsType } from '../types/types';
import { capitalize } from '../utils/text';

type PropComments = {
  author: string
  text: string
  commentId: string
  setComments: (a: {}) => void
}
const Comment: FC<PropComments> = ({ author, text, setComments, commentId }) => {
  const [tempText, setTempText] = useState<any>(text)
  const [edit, setEdit] = useState(false)


  const saveComment = (commentId: string) => {
    setEdit(false)
    setComments((oldColumns: CommentsType) => {
      return { ...oldColumns, [commentId]: { ...oldColumns[commentId], text: tempText } }
    })
  };
  const deleteComment = (commentId: string) => {
    setComments((Comments: CommentsType) => {
      delete Comments[commentId]
      return { ...Comments }
    })
  };
  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTempText(value)
  };
  return (
    <Wrap>
      <Form>
        <Form.Label column sm="2">
          {capitalize(author)}
        </Form.Label>
        {!edit
          ? <Text> {text}</Text>
          : <Form.Control
            className="mb-3"
            as="textarea"
            placeholder="Comment"
            onChange={handleOnChange}
            defaultValue={text}
            autoFocus
          />}
        <WrapButtons>
          {edit
            ? <>
              <CustomButton onClick={() => { saveComment(commentId) }} >Save</CustomButton>
              <CustomButton onClick={() => {
                setEdit(false)
                setTempText('')
              }} >Cancel</CustomButton>
            </>
            : <CustomButton onClick={() => { setEdit(true) }} >Edit</CustomButton>}
          <CustomButton onClick={() => { deleteComment(commentId) }} >Delete</CustomButton>
        </WrapButtons>
      </Form>
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
const Text = styled.div`
overflow-wrap: break-word; 
`
const Wrap = styled.div`
margin-bottom:10px;
padding:10px;
border-radius:5px;
background-color:#e8e8e8
`

export default Comment