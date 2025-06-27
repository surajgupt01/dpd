import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



export default function MyLineChart(GData : any) {

const dummyData = [
  { date: "2025-06-21", rating: 3.2 },
  { date: "2025-06-22", rating: 4.5 },
  { date: "2025-06-23", rating: 3.8 },
  { date: "2025-06-24", rating: 4.1 },
  { date: "2025-06-25", rating: 4.9 },
  { date: "2025-06-26", rating: 3.5 },
  { date: "2025-06-27", rating: 4.3 },
];



console.log(GData.data.GData)
 
  return (

   
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dummyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0,5]}/>
          <Tooltip />
          <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
