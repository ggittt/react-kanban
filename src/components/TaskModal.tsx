import React, { FC, useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import ModalWrap from '../ui/ModalWrap'
import Comments from './Comments'

type PropsTask = {
  title: string
  comments?: string
  description?: string
  author: string
  columnTitle: string
  show: boolean
  taskId: string
  arrComments: []
  setOnTaskModal: (data: boolean) => void
  deleteTask: (taskId: string) => void
  genNewTasks: (taskId: string, data: string, type: string) => void

}
const TaskModal: FC<PropsTask> = ({
  title,
  description,
  author,
  show,
  setOnTaskModal,
  columnTitle,
  deleteTask,
  taskId,
  genNewTasks,
  arrComments
}) => {
  const [tempTitle, setTempTitle] = useState('')
  const [tempDescription, setTempDescription] = useState('')

  const handleClose = () => setOnTaskModal(false);

  const handleOnChangeTitle = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTempTitle(value)
  };
  const handleOnChangeDescription = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTempDescription(value)
  };
  const handleOnBlur = (taskId: string, data: string, type: string) => {
    genNewTasks(taskId, data, type)
  };


  return (
    <ModalWrap show={show} handleClose={handleClose}>
      <Modal.Header closeButton >
        {/* <div>{title}</div> */}
        <Form.Control
          plaintext
          className="mb-3"
          type="text"
          placeholder="Title"
          defaultValue={title}
          onChange={handleOnChangeTitle}
          onBlur={() => { handleOnBlur(taskId, tempTitle, 'title') }}
        />
      </Modal.Header>
      <Form>
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Form.Control
          className="mb-3"
          as="textarea"
          placeholder="Description"
          onChange={handleOnChangeDescription}
          defaultValue={description}
          onBlur={() => { handleOnBlur(taskId, tempDescription, 'description') }} />
      </Form>
      <Comments arrComments={arrComments} taskId={taskId} />
      <div>Author: {author}. Column title: {columnTitle || 'no title'}</div>
      <Button onClick={() => { deleteTask(taskId) }}>Delete</Button>
    </ModalWrap>
  )
}


export default TaskModal