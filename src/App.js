import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {

  const auth = getAuth(app);

  const [validated, setValidated] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');

  const handleChecked = (e) => {
    setChecked(e.target.checked);
  }

  const handleFormSubmit = (e) => {

    if(checked) {
      signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error)=>{
        setError(error.message)
      })
      e.preventDefault();
    }
    else{
      const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    if(!/(?=.{6,})/.test(password)){
      setError("password must be 6 characters");
      return;
    }

    setValidated(true);
    setError('');
    createUserWithEmailAndPassword(auth, email, password)
    .then((result)=>{
      setEmail('');
      setPassword('');
      setError('');
      emailVerification();
      setNameToFirebase();
    })
    .then((error)=>{
      console.log(error);
      setError(error.message);
    })
    }
  }

  const handleEmailBlur = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  }

  const handleLogout = () => {
    signOut(auth)
    .then(()=>{
      console.log("Signout successfully");
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const emailVerification = () => {
    const auth = getAuth();
sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log("Send email verification")
  });
  }

  const handleNameBlur = (e) => {
    setName(e.target.value);
  }

  const setNameToFirebase = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log("Set name successfully")
    }).catch((error) => {
      console.log(error)
      // ...
    });
    
  }
  
  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
  .then(() => {
    console.log("Reset password link")
  })
  .catch((error) => {
    console.log(error)
    // ..
  });
  }
  
  return (
    <div>
      <h2 className="text-primary text-center">Please {checked ? 'Login' : 'Register'}</h2>
      <div className="w-50 mx-auto mt-5" >
      
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

      {!checked&&
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Your Name</Form.Label>
      <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter Your Name" required/>
      <Form.Control.Feedback type="invalid">
          Please provide a valid Email.
        </Form.Control.Feedback>
    </Form.Group>}

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
          <br />
          <Form.Check
          required
          onChange={handleChecked}
          label="Already Registered?"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button onClick={resetPassword} variant="link">Forget Password?</Button>
      <p className="text-danger">{error}</p>
      
      <Button variant="primary" type="submit">
        {
          checked ? 'Login' : 'Resister'
        }
      </Button>
      <br /> <br />
      <Button onClick={handleLogout} variant="danger">Logout</Button>
    </Form>
      </div>
    </div>
  );
}

export default App;
