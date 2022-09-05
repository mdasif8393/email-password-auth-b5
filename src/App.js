import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {

  const auth = getAuth(app);

  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    createUserWithEmailAndPassword(auth, email, password)
    .then((result)=>{
      console.log(result);
    })
    .then((error)=>{
      console.log(error);
    })
    e.preventDefault();
  }

  const handleEmailBlur = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  }
  
  return (
    <div>
      <h2 className="text-primary text-center">Please Register</h2>
      <div className="w-50 mx-auto mt-5" >
      
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required/>
        <Form.Control.Feedback type="invalid">
            Please provide a valid Email.
          </Form.Control.Feedback>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required/>
        <Form.Control.Feedback type="invalid">
            Please provide a valid Password.
          </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
    </div>
  );
}

export default App;
