import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import Loading from '../components/Loading'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import { dateFormat } from '../lib/dateFormat'
import { useAppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY

  const { axios, getToken, user, image_base_url} = useAppContext()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMyBookings = async () =>{
    try {
      const {data} = await axios.get('/api/user/bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
        if (data.success) {
          setBookings(data.bookings)
        }

    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(()=>{
    if(user){
      getMyBookings()
    }
    
  },[user])


  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <BlurCircle top="100px" left="100px"/>
      <div>
        <BlurCircle bottom="0px" left="600px"/>
      </div>
      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

      {bookings
      .filter(item => item.show && item.show.movie && item.show.movie.poster_path) // AiCode
      .map((item,index)=>(
        <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
          <div className='flex flex-col md:flex-row'>
            <img src={image_base_url + item.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'/>
            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
              <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
            </div>
          </div>

          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
            <div className='flex items-center gap-4'>
              <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>
              {!item.isPaid && <Link to={item.paymentLink} className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</Link>}
            </div>
            <div className='text-sm'>
              <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length}</p>
              <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(", ")}</p>
            </div>
          </div>

        </div>
      ))}

    </div>
  ) : <Loading />
}

export default MyBookings


// Ai code 
// import React, { useEffect, useState } from 'react'
// import { dummyBookingData } from '../assets/assets'
// import Loading from '../components/Loading'
// import BlurCircle from '../components/BlurCircle'
// import timeFormat from '../lib/timeFormat'
// import { dateFormat } from '../lib/dateFormat'
// import { useAppContext } from '../context/AppContext'
// import { Link } from 'react-router-dom'

// const FALLBACK_POSTER = '/fallback-poster.jpg' // Make sure this exists in your public folder

// const MyBookings = () => {
//   const currency = import.meta.env.VITE_CURRENCY

//   const { axios, getToken, user, image_base_url } = useAppContext()

//   const [bookings, setBookings] = useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   const getMyBookings = async () => {
//     try {
//       const { data } = await axios.get('/api/user/bookings', {
//         headers: { Authorization: `Bearer ${await getToken()}` }
//       })
//       if (data.success) {
//         setBookings(data.bookings)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//     setIsLoading(false)
//   }

//   useEffect(() => {
//     if (user) {
//       getMyBookings()
//     }
//   }, [user])

//   // Fallback for poster path, title, runtime, showDateTime, etc.
//   return !isLoading ? (
//     <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
//       <BlurCircle top="100px" left="100px" />
//       <div>
//         <BlurCircle bottom="0px" left="600px" />
//       </div>
//       <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

//       {bookings.length === 0 && (
//         <div className="text-center py-10 text-gray-500">No bookings found.</div>
//       )}

//       {bookings.map((item, index) => {
//         const movie = item.show?.movie
//         const posterUrl = movie?.poster_path
//           ? image_base_url + movie.poster_path
//           : FALLBACK_POSTER

//         const title = movie?.title ?? "Unknown Movie"
//         const runtime = movie?.runtime ? timeFormat(movie.runtime) : "N/A"
//         const showDate = item.show?.showDateTime ? dateFormat(item.show.showDateTime) : "N/A"
//         const amount = item.amount ?? "-"
//         const paymentLink = item.paymentLink ?? "#"
//         const isPaid = item.isPaid ?? false
//         const bookedSeats = Array.isArray(item.bookedSeats) ? item.bookedSeats : []

//         return (
//           <div key={index} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
//             <div className='flex flex-col md:flex-row'>
//               <img
//                 src={posterUrl}
//                 alt={title}
//                 className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'
//                 onError={e => { e.target.onerror = null; e.target.src = FALLBACK_POSTER }}
//               />
//               <div className='flex flex-col p-4'>
//                 <p className='text-lg font-semibold'>{title}</p>
//                 <p className='text-gray-400 text-sm'>{runtime}</p>
//                 <p className='text-gray-400 text-sm mt-auto'>{showDate}</p>
//               </div>
//             </div>

//             <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
//               <div className='flex items-center gap-4'>
//                 <p className='text-2xl font-semibold mb-3'>{currency}{amount}</p>
//                 {!isPaid && <Link to={paymentLink} className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</Link>}
//               </div>
//               <div className='text-sm'>
//                 <p><span className='text-gray-400'>Total Tickets:</span> {bookedSeats.length}</p>
//                 <p><span className='text-gray-400'>Seat Number:</span> {bookedSeats.join(", ") || "N/A"}</p>
//               </div>
//             </div>
//           </div>
//         )
//       })}

//     </div>
//   ) : <Loading />
// }

// export default MyBookings
