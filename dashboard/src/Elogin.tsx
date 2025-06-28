import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ELogin({ setMail }: any) {
  const navigate = useNavigate();
  const [form_data, setFormData] = useState({
    username: "",
    password: "",
  });

  function handlechange(e: any) {
    setFormData({
      ...form_data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLog(e: any) {
    e.preventDefault();


    console.log(form_data);

    let response = await axios.post(
      "http://localhost:8000/login",
      new URLSearchParams({
        username: form_data.username,
        password: form_data.password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status == 200) {
      console.log("maill", response.data.email);
      setMail(response.data.email);
      localStorage.setItem("mail", form_data.username);
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/dashboard");
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="purplevariant font-bold mb-4 absolute left-5 top-5">
        {" "}
        <span className=" p-1 rounded-tr-xl rounded-br-xl bg-purplevariant text-white">
          DPD
        </span>{" "}
        Zero
      </div>

      <form
        onSubmit={handleLog}
        className="text-white  border-1 border-gray-300 rounded-lg flex flex-col items-center  p-4 h-80"
      >
        <p className="font-bold text-lg">LogIn</p>
        <input
          className="border-1 border-gray-200 rounded-lg w-80 h-10 p-2 m-2 mt-8"
          placeholder="Email"
          name="username"
          onChange={handlechange}
          type="email"
        ></input>
        <input
          className="border-1 border-gray-200 rounded-lg w-80 h-10 p-2 m-2"
          placeholder="Password"
          name="password"
          onChange={handlechange}
          type="password"
        ></input>
        <button
          type="submit"
          className="font-semibold text-sm text-white text-center p-2 h-10 w-75 bg-purplevariant rounded-lg m-2 cursor-pointer"
        >
          LogIn
        </button>
      </form>
    </div>
  );
}
