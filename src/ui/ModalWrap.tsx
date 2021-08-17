import React, { FC } from 'react'
import { Modal } from 'react-bootstrap'

type PropsModalWrap = {
  handleClose?: () => void
  show: boolean
  children: React.ReactNode


}
const ModalWrap: FC<PropsModalWrap> = ({ show, children, handleClose }) => {

  return (
    <>
      <Modal show={show} onHide={handleClose} >
        <Modal.Body >{children}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalWrap