import Notify from './Notify'
import Search from './search'


export default function DashNav(){
    return(
          <div className='w-full  p-3 flex items-center justify-between text-gray-600'>
                 <p>Dashboard</p>
        
                <div className='flex items-center'>
                <div className=' border-gray-300 flex rounded-xl items-center p-1 mr-2'>
                <input className='border-1 border-gray-600 p-2 rounded-md text-xs mr-2 w-80 h-9' placeholder='search/'></input>
                <Search/>
                </div>
                {/* <Sun/> */}
                <Notify/>
                </div> 
        
        
        
                </div>
    )
}