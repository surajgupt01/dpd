import "./utils.css";
import "./App.css";
import Nav from "./Nav";
import RNav from "./RNav";
import MainDiv from "./MainDiv";
import { useEffect, useState } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { LogIn } from "lucide-react";
import Login from "./Login";

interface TeamListProps {
  teamMembers: string;
  setTeamMembers: React.Dispatch<React.SetStateAction<string | null>>;
}

function App() {
  const [menuSelected, setMenuSelected] = useState<string>("");

  const [teamMembers, setTeamMembers] = useState<string | null>(null);

  useEffect(() => {
    console.log(menuSelected);
    setTeamMembers(null);
  }, [menuSelected]);

  return (
    <>
      <div className="flex w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <Nav setMenuSelected={setMenuSelected} />

                  <MainDiv
                    menuSelected={menuSelected}
                    teamMembers={teamMembers}
                    setTeamMembers={setTeamMembers}
                  />

                  <RNav />
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
