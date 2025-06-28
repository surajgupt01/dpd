import MyLineChart from "./chart"

export default function HomeContent(GData : any){



    return(
        <div className='w-full p-4 flex flex-col items-center '>

          <div className='w-250 mb-4 grid grid-cols-4'>

          <div className='border-1 border-gray-800 rounded-lg w-55 h-30 flex justify-center items-center font-bold text-md cursor-pointer  shadow-sm shadow-gray-800 text-blue-300'>Total Feedback : 40</div>
          <div className='border-1 border-gray-800 rounded-lg w-55 h-30 flex justify-center items-center font-bold text-md cursor-pointer shadow-sm shadow-gray-800 text-red-300'>Teams : 4</div>
          <div className='border-1 border-gray-800 rounded-lg w-55 h-30 flex justify-center items-center font-bold text-md cursor-pointer shadow-sm shadow-gray-800 text-purple-300'>Average Seniment : </div>
          <div className='border-1 border-gray-800 rounded-lg w-55 h-30 flex justify-center items-center font-bold text-md cursor-pointer shadow-sm shadow-gray-800 text-cyan-300'>Pending Acknowledges : 4 </div>


         </div>

         <div className='w-full flex  mt-15 justify-center  '>

          <div className='border-1 border-gray-800 w-150 h-110 rounded-xl text-sm font-semibold p-4 flex flex-col items-center justify-center'>
            <p className="mb-4">Chart: Sentiment Trends</p>

            <MyLineChart data = {GData}/>
          
          
          </div>
          <div className='border-1 w-75 border-gray-800 rounded-xl ml-4 text-sm font-semibold p-4 flex justify-center'><p>Employees with No Recent Feedback</p></div>

          


   
         </div>


         </div>

    )
}