import DashNav from './DashNav'
import  FeedbackForm from './FeedBackForm';
import HomeContent from './HomeContent'
import  TeamMembers from './TeamMembes';
import TeamList from './TeamList';
import  LogsPage from './LogsPage';
import { useState } from 'react';
import { useEffect } from 'react';
interface MainDivProps {
  menuSelected: string;
   teamMembers: string|null;
   setTeamMembers: React.Dispatch<React.SetStateAction<string | null>>;
   setMail : (x:string)=>void


}



export default function MainDiv({menuSelected , teamMembers , setTeamMembers  , setMail  }:MainDivProps){


  
    useEffect(()=>{
      let mail = localStorage.getItem('email')
      if(mail) setMail(mail)
    })
  
    
  const [GData , setGdata] = useState<{ date: string; rating: number }[]>([])
   
    console.log(teamMembers)
    return(

      <div className='w-full h-screen overflow-auto dark:bg-neutral-950 dark:text-gray-200 '>
                <DashNav />
            
        
               <div className=' w-full flex justify-center items-center p-4  '>
        
               { menuSelected == 'Home'  && !teamMembers  ? <HomeContent GData={GData}/> : <div></div>}
               { menuSelected == 'Teams' && !teamMembers && !teamMembers  && <TeamMembers menuSelected={menuSelected} setTeamMembers={setTeamMembers}></TeamMembers>}
               {teamMembers && <TeamList teamMembers={teamMembers} setTeamMembers={setTeamMembers}></TeamList>}
               { menuSelected == 'Give Feedback'  && !teamMembers ? <FeedbackForm /> : <div></div>}
               { menuSelected == 'Logs' && !teamMembers  ? <LogsPage  setGdata={setGdata}></LogsPage> : <div></div>}
              
               
        
                </div>


    </div>            
    )
}