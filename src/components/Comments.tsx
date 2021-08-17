import React, { FC, useContext } from 'react'
import { CommentInterface } from '../types/types';
import { BoardContext } from './Board';
import Comment from './Comment';
import NewComment from './NewComment';

type PropComments = {
  arrComments: []
  taskId: string
}
const Comments: FC<PropComments> = ({ arrComments, taskId }) => {
  const { setComments, author } = useContext(BoardContext)

  return (
    <>
      {arrComments.map((comment: CommentInterface) => (
        <Comment
          key={comment.id}
          author={comment.author}
          text={comment.text}
          commentId={comment.id}
          setComments={setComments}
        />
      ))}
      <NewComment
        taskId={taskId}
        setComments={setComments}
        author={author}
      />
    </>
  );
}

export default Comments