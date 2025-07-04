import Home from './home'
import Team from './Team'
import Log from './Log'
import Arrow from './Arrow'
import Logout from './Logout'
import User from './User'


export default function EmpNav({setMenuSelected}:any){

   async function handlemenu(e:React.MouseEvent){

        
        setMenuSelected(e.currentTarget.textContent?.trim())
       
 
    }
    return(
               <div className='relative w-80 p-4 text-sm font-semibold dark:text-gray-200 text-gray-600  border-gray-300 '>
        
                <div className='purplevariant font-bold mb-4 absolute top-5 left-5'> <span className=' p-1 rounded-tr-xl rounded-br-xl bg-purplevariant text-white'>DPD</span> Zero</div>
        
                <div className='w-full mt-20'>
                  <ul className='dark:text-gray-200 text-gray-600 h-20 flex flex-col p-4'>
                    <li className='cursor-pointer mt-2 group hover:text-black dark:hover:text-gray-600 hover:list-none flex items-center'><span className='group-hover:opacity-100 opacity-0'><Arrow/></span>Overview</li>
                    <li className='cursor-pointer mt-3 group hover:text-black dark:hover:text-gray-600  hover:list-none flex items-center'><span className='group-hover:opacity-100 opacity-0'><Arrow/></span>Projects</li>
                    
                  </ul>
                </div>
        
                <div className='w-full flex flex-col  items-center p-2'>
                  <ul className='w-full'>
                    <li className='m-2 hover:bg-gray-200 dark:hover:bg-neutral-800  cursor-pointer p-2 rounded-lg flex items-center ' onClick={(e:React.MouseEvent)=>handlemenu(e)}><Home/>Home</li>
                    <li className='m-2 hover:bg-gray-200 dark:hover:bg-neutral-800   cursor-pointer p-2 rounded-lg flex items-center' onClick={(e:React.MouseEvent)=>handlemenu(e)}><Team/>Teams</li>
                    <li className='m-2 hover:bg-gray-200 dark:hover:bg-neutral-800  cursor-pointer p-2 rounded-lg flex items-center' onClick={(e:React.MouseEvent)=>handlemenu(e)}><Log/>Logs</li>
                  </ul>
                </div>
        
                <div className='absolute bottom-10'>
                  <div className='flex items-center mb-4 scale-125 ml-2'>
                    <User/>
                    <p className='text-xs'>Suraj Gupta</p>
                  </div>
                  <button className='border-1 border-red-400 bg-red-500 p-2 w-20 rounded-xl hover:bg-red-600  text-xs cursor-pointer text-white flex items-center'><Logout/>Logout</button>
                </div>
        
               </div>
    )
}