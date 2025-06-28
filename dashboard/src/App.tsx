import "./utils.css";
import "./App.css";
import Nav from "./Nav";

import MainDiv from "./MainDiv";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Login";

// interface TeamListProps {
//   teamMembers: string;
//   setTeamMembers: React.Dispatch<React.SetStateAction<string | null>>;
// }

function App() {
  const [menuSelected, setMenuSelected] = useState<string>("");

  const [teamMembers, setTeamMembers] = useState<string | null>(null);

  const [userType , setUserType] = useState()

  const [mail , setMail] = useState('')

  if(localStorage.getItem('email')){
    let email = localStorage.getItem('email')
    if(email)setMail(email)
  }

      useEffect(() => {
      if (localStorage.getItem("email")) {
        let email = localStorage.getItem("email");
        console.log(email)
        if (email) setMail(email);
      }
    });
  

  

  useEffect(() => {
    console.log(menuSelected);
    setTeamMembers(null);
  }, [menuSelected]);

  return (
    <>
      <div className="flex w-full dark:bg-neutral-900">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login  setMail={setMail} mail={mail}  setUserType={setUserType}/>} />
            <Route
              path="/dashboard"
              element={
                <>
                  <Nav setMenuSelected={setMenuSelected} setMail={setMail} />

                  <MainDiv
                    menuSelected={menuSelected}
                    teamMembers={teamMembers}
                    setTeamMembers={setTeamMembers}
                    setMail={setMail}
                   
                  />
{/* 
                  <RNav /> */}
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
