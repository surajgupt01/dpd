import { Rating } from "./Rating";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function FeedbackForm() {
  const teamOption = useRef(null);
  const [team, setTeam] = useState([]);
  const [formData, setFormData] = useState({
    feedbacktype: "",
    email: "",
    department: "",
    feedback: "",
    communication: 0,
    skills: 0,
    timeliness: 0,
    teamwork: 0,
  });

  const [teamMembers, setTeamMembers] = useState([]);

  const handleChange = (e: any) => {
   
    const { name , value } = e.target;

    const parsedValue = [
      "communication",
      "skills",
      "teamwork",
      "timeliness",
    ].includes(name)
      ? parseInt(value, 10)
      : value;

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };



 const token = localStorage.getItem('access_token')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // ✅ first prevent form default
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8000/feedback",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Correct way to send token
          },
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  }



  async function getTeam() {
    let response = await axios.get(`http://localhost:8000/Teams`);

    console.log(response);
    setTeam(response.data);
  }

  async function getTeamMembers() {
    let response = await axios.get(
      `http://localhost:8000/teamMembers/${formData.department}`
    );

    console.log(response);
    setTeamMembers(response.data);
    console.log("ttt", teamMembers);
  }

  useEffect(() => {
    getTeam();
  }, []);

  useEffect(() => {
    console.log('get members')
    if(formData.department) getTeamMembers();
  }, [formData.department]);

  return (
    <div className=" border-gray-300 rounded-xl w-full  p-2 flex justify-center ">
      <form
        className="flex justify-center flex-col items-center scale-95"
        onSubmit={handleSubmit}
      >
        <p className="text-gray-900 text-lg font-semibold">Feedback Form</p>

        <div className="w-full p-4">
          <p className="text-md font-semibold mb-2">Feedback Type</p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                id="positive"
                name="feedbacktype"
                type="radio"
                value="Positive"
                className="accent-blue-500"
                onChange={handleChange}
              />
              Positive
            </label>
            <label className="flex items-center gap-2">
              <input
                id="constructive"
                name="feedbacktype"
                type="radio"
                value="Constructive"
                className="accent-blue-500"
                onChange={handleChange}
              />
              Constructive
            </label>
            <label className="flex items-center gap-2">
              <input
                id="issue"
                name="feedbacktype"
                type="radio"
                value="Issue"
                className="accent-blue-500"
                onChange={handleChange}
              />
              Issue
            </label>
            <label className="flex items-center gap-2">
              <input
                id="appreciation"
                name="feedbacktype"
                type="radio"
                value="Appreciation"
                className="accent-blue-500"
                onChange={handleChange}
              />
              Appreciation
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2  w-full">
          <Rating
            label={"communication"}
            setFormData={setFormData}
            formData={formData}
          ></Rating>
          <Rating
            label={"skills"}
            setFormData={setFormData}
            formData={formData}
          ></Rating>
          <Rating
            label={"teamwork"}
            setFormData={setFormData}
            formData={formData}
          ></Rating>
          <Rating
            label={"timeliness"}
            setFormData={setFormData}
            formData={formData}
          ></Rating>
        </div>

        <select
          ref={teamOption}
          name="department"
          className="mt-2 border-1 border-gray-300 rounded-lg h-12 w-144 p-2 m-2"
          onChange={handleChange}
        >
          <option value="">Select a department</option>
          {team && team.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>

        <select
          name="email"
          className="border-1 border-gray-300 rounded-lg h-12 w-144 p-2 m-2"
          onChange={handleChange}
        >
          {teamMembers &&
            teamMembers.map((e: any, index) => (
              <option key={index} value={e.email}>{e.email}</option>
            ))}
        </select>

        <input
          name="feedback"
          placeholder=""
          className="border-1 border-gray-300 rounded-lg h-50 w-144 p-2 m-2"
          onChange={handleChange}
        ></input>

        <button
          type="submit"
          className="p-2 text-center rounded-lg bg-purplevariant w-140 font-semibold text-white"
        >
          submit
        </button>
      </form>
    </div>
  );
}
