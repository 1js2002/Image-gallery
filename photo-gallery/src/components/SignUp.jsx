import React, { useState } from 'react';


const SignUp = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fname, lname, email, password);
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data, "user Registered");
      if (data.status == "ok") {
        alert("Registration Successful");
      } else {
        alert("Something went wrong");
      }
    })
    
  }
  return (
    <div className=' flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-semibold text-center mt-5 mb-20 '>Image Gallery</h1>
    <form className='flex flex-col items-center justify-center mx-auto bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96' onSubmit={handleSubmit}>
      <h3 className='text-2xl font-bold mb-4 text-left'>Sign Up</h3>

      <div className="my-3 w-80 flex flex-col">
        <label className=' text-left'>First name</label>  
        <input
          type="text" 
          className="border rounded p-2"
          placeholder="First name"
          onChange={e=> setFname((e).target.value)}
          />
      </div>

      <div className="mb-3 w-80 flex flex-col">
        <label className='text-left'>Last name</label>
        <input type="text" className="border rounded p-2" placeholder="Last name"
        onChange={e=> setLname((e).target.value)} />
      </div>

      <div className="mb-3  w-80 flex flex-col text-left">
        <label className='text-left'>Email address</label>
        <input
          type="email"
          className="border rounded p-2"
          placeholder="Enter email"
          onChange={(e)=> setEmail(e.target.value)}
          />
      </div>

      <div className="mb-3  w-80 flex flex-col">
        <label className='text-left'>Password</label>
        <input
          type="password"
          className="border rounded p-2"
          placeholder="Enter password"
          onChange={(e)=> setPassword(e.target.value)}
          />
      </div>

      <div className="d-grid ">
        <button type="submit" className="btn btn-primary bg-blue-500 text-white rounded p-2">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right py-3">
        Already registered <a href="/sign-in " className='hover:underline'>sign in?</a>
      </p>
    </form>
  </div>
  );
};

export default SignUp;
