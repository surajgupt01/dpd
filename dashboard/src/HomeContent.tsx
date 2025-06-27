import MyLineChart from "./chart"

export default function HomeContent(GData : any){
    return(
        <div className='w-full p-4 '>

          <div className='w-full mb-4 grid grid-cols-4'>

          <div className='border-1 border-gray-300 rounded-lg w-55 h-30 flex justify-center items-center font-bold text-md cursor-pointer'>Total Feedback : 40</div>
          <div className='border-1 border-gray-300 rounded-lg w-55 h-30 flex justify-center items-center font-bold text-md cursor-pointer'>Teams : 4</div>
          <div className='border-1 border-gray-300 rounded-lg w-55 h-30 flex justify-center items-center font-bold text-md cursor-pointer'>Average Seniment : </div>
          <div className='border-1 border-gray-300 rounded-lg w-55 h-30 flex justify-center items-center font-bold text-md cursor-pointer'>Pending Acknowledges : 4 </div>


         </div>

         <div className='w-full flex  mt-15  '>

          <div className='border-1 w-150 h-110 rounded-xl text-sm font-semibold p-4 flex flex-col items-center justify-center'>
            <p className="mb-4">Chart: Sentiment Trends</p>

            <MyLineChart data = {GData}/>
          
          
          </div>
          <div className='border-1 w-75 rounded-xl ml-4 text-sm font-semibold p-4 flex justify-center'><p>Employees with No Recent Feedback</p></div>

          


   
         </div>


         </div>

    )
}