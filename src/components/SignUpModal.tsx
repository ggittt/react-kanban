import React, { FC,  useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import ModalWrap from '../ui/ModalWrap';
import { validUserName } from '../utils/text';

type PropSignUpModal = {
  show: boolean
  handleSignUp: (userName: string) => void
}
const SignUpModal: FC<PropSignUpModal> = ({ show, handleSignUp }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [userName, setUserName] = useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleSignUp(userName)
  };
  const handleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(value)
    setButtonDisabled(!validUserName(value))
  };

  return (
    <>
      <ModalWrap show={show} >
        <Form onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Form.Group>
              <Form.Control
                onChange={handleOnChange}
                name='userName'
                type='text'
                placeholder='Enter your username' />
            </Form.Group>
          </Row>
          <Button
            disabled={buttonDisabled}
            type="submit"
            variant='primary'>
            Create
          </Button>
        </Form>
      </ModalWrap>

    </>
  );
}

export default SignUpModal