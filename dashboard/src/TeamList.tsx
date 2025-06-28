import axios from "axios";
import { useEffect, useState } from "react";
import Back from "./Back";
import Loader from "./loader";

interface TeamListProps {
  teamMembers: string|null;
  setTeamMembers: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function TeamList({
  teamMembers,
  setTeamMembers,
}: TeamListProps) {
  const [Employees, setEmployees] = useState([]);
  const [loading , setLoading] = useState(false)

  async function getTeamMembers() {
    console.log("ttt", teamMembers);
    setLoading(true)
    let response = await axios.get(
      `http://localhost:8000/teamMembers/${teamMembers}`
    );

    console.log(response);
    setEmployees(response.data);
    setLoading(false)
  }

  useEffect(() => {
    getTeamMembers();
  }, [teamMembers]);

  return (
    <div className="w-full flex flex-col items-center p-4 h-150">
      <div
        className="m-4 flex w-full cursor-pointer items-center p-2 text-gray-400 text-sm hover:text-gray-800"
        onClick={() => {
          setTeamMembers(null);
        }}
      >
        <Back /> back
      </div>
      <ul className="w-full relative text-gray-600">
       {!loading && <li className="border-1 border-gray-800 shadow-sm w-full p-2 grid grid-cols-4">
          <span className="m-2 font-semibold">name</span>
          <span className="m-2 font-semibold">department</span>
          <span className="m-2 font-semibold">email</span>
          <span className="m-2 font-semibold">team</span>
        </li>}
        {!loading && Employees.map((e: any, index) => (
          <div
            key={index}
            className="grid grid-cols-4 border-b-1 border-gray-700 m-2 text-sm text-gray-400 p-2 hover:bg-gray-800 border-t-1 cursor-pointer "
          >
            <span>{e.name}</span>
            <span>{e.department}</span>
            <span>{e.email}</span>
            <span>{e.team}</span>
          </div>
        ))}
        { loading && <div className="absolute top-50 left-110">
            <Loader/>
        </div>
}
      </ul>
    </div>
  );
}
