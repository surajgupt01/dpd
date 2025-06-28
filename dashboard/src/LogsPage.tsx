import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./loader";

interface LogsPageProps {
  setGdata: React.Dispatch<React.SetStateAction<{ date: string; rating: number }[]>>;
}

export default function LogsPage({ setGdata }: LogsPageProps) {
  const [logs, setLogs] = useState<any[]>([]);
  const [data, setData] = useState<{ date: string; rating: number }[]>([]);

  const token = localStorage.getItem("access_token");

  function dateTme(date: string) {
    const safeDate = date.endsWith("Z") ? date : `${date}Z`;
    const formatted = new Date(safeDate).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });
    return formatted;
  }

  async function getLogs() {
    try {
      const response = await axios("http://localhost:8000/logs", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      let res = response.data.reverse()
      setLogs(res);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  }

  useEffect(() => {
    getLogs();
  }, []);


  useEffect(() => {
    const newData: { date: string; rating: number }[] = logs.map((e: any) => ({
      date: new Date(e.timestamp).toISOString().split("T")[0],
      rating: e.rating,
    }));

    setData(newData);
    setGdata(newData);
    console.log(data)
  }, [logs]);

  return (
    <div className="w-full p-4 flex flex-col items-center">
      <p className="text-gray-600 font-semibold text-2xl mb-6">Logs</p>
      {!logs.length ? (
        <Loader />
      ) : (
        logs.map((e: any, i: number) => (
          <div
            key={i}
            className="w-200 p-2 border-t border-b border-gray-900 text-xs text-gray-300"
          >
            <div className="text-green-400">Sender: {e.manager_mail}</div>
            <div className="text-blue-400">Receiver: {e.employee_mail}</div>
            <div className="text-[10px] flex justify-end text-yellow-50">{dateTme(e.timestamp)}</div>
            <div className="text-xs mt-2">Average rating: {e.rating}</div>

            <div className="flex flex-col text-xs">
              <div className="flex mt-2">
                <div>communication: {e.communication}/5</div>
                <div className="ml-4">skills: {e.skills}/5</div>
              </div>
              <div className="flex mt-1">
                <div>timeliness: {e.timeliness}/5</div>
                <div className="ml-4">teamwork: {e.teamwork}/5</div>
              </div>
            </div>
            <div className="mt-4 border p-2 rounded-lg border-gray-800">
              <p className="text-gray-500 text-xs">Feedback</p>

              {e.feedback}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
