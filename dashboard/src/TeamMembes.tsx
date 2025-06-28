import axios from "axios"
import { useEffect, useState } from "react";
import Loader from "./loader";

interface MainDivProps {
  menuSelected: string;
  setTeamMembers:any
}

export default function TeamMembers({menuSelected , setTeamMembers}:MainDivProps){

    const [team , setTeam] = useState([])

    const colors = ['bg-red-400','bg-blue-400','bg-green-400','bg-yellow-400','bg-cyan-400','bg-purple-400','bg-orange-400']

  async function getTeam() {
    

     let response =  await axios.get(`http://localhost:8000/${menuSelected}`)

       console.log(response)
       setTeam(response.data)
   
   } 

   useEffect(() => {
    if (menuSelected === 'Teams') {
      getTeam();
    }
  }, [menuSelected==='Teams']);


  function handleTeam(e:React.MouseEvent<HTMLDivElement>){

     if(e) setTeamMembers(e.currentTarget.textContent?.trim() || '')
     
        
    
  }

  
  
        
    return(

        <div className="w-full  p-2 flex flex-col items-center">

        <p className="font-semibold text-lg">Teams</p>
        <div className="grid grid-cols-3 p-6 gap-6 w-150 cursor-pointer mt-10 relative  min-h-90 ">
            
            {team.length > 0 ?
                team.map((e,index)=>(
                  
                  <div key={e} className={`border-1 w-40 h-40 rounded-lg flex justify-center items-center shadow-sm border-gray-800 ${colors[index]} text-white font-semibold hover:scale-105 duration-300 ease-in-out ` } onClick={(x)=>handleTeam(x)}>{e}</div>

                ))
            :<div className="absolute top-50 left-70">
                        <Loader/>
                    </div>}
          
        </div>

          </div>
    )
}