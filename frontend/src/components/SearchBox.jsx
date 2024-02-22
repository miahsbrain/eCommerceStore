import React from 'react';
import { useState } from 'react';
import { Button, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {
    
    const [keyword, setKeyword] = useState();
    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`);
        } else {
            navigate(window.location.pathname);
        }
    }


  return (
    <Form onSubmit={submitHandler} style={{display:'flex', justifyContent:'center'}} className='mx-4' >
      <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} className='mr-sm2 ml-sm-5' >
      </Form.Control>
      <Button type='submit' variant='outline-success' className='px-2 mx-1' >Submit</Button>
    </Form>
  )
}
