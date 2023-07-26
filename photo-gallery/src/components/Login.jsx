import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }), 
    })
    .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./Home";
        }
      });
  }
  return (
    <div className=" min-h-screen ">
      <h1 className="text-4xl font-semibold my-4 text-center">Image Gallery</h1>
      <div className="flex flex-col  my-20 items-center justify-center ">
      <form
      className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-bold mb-4">Sign In</h3>
      <div className="mb-4 w-96">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email address 
        </label>
        <input
          type="email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            id="customCheck1"
          />
          <label
            className="ml-2 block text-gray-700 text-sm font-bold"
            htmlFor="customCheck1"
          >
            Remember me
          </label>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
      <p className="forgot-password text-right py-3">
        Not registered <a href="/sign-up " className='hover:underline'>sign up?</a>
      </p>
    </form>
      </div>
     
    </div>
    
  );
};

export default Login;
