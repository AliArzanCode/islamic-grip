"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

const timing = () => {
  const [timing, setTiming] = useState({})
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [method, setMethod] = useState(2)
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  const importantTimings = [
    "Fajr",
    "Sunrise",
    "Dhuhr",
    "Asr",
    "Sunset",
    "Maghrib",
    "Isha",
  ];
  async function fetchtimings(){
     if (!city || !country) return; // don't fetch if empty
       setLoading(true);
    try{
      const res = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`)
      const data = await res.json()
        if (!data.data || !data.data.date || !data.data.timings) {
      setTiming({});
      setDate("");
      return;
    }
      setTiming(data.data.timings)
      setDate(data.data.date.readable);

      console.log(data)
      

    }
    
    catch (err) {
      console.error("Error fetching prayer times:", err);
    
    }
     setLoading(false);
  }
  useEffect(() => {
  if (!city || !country) return; 
  fetchtimings()
    
  }, [method,city,country])
  
  return (
          
    <main className='timing h-screen'   style={{
          backgroundImage: `url(./namaz-time.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "screen",
         
        }}>
          <Navbar/>
      <div className='flex justify-center items-center p-5'>
      <h1 className="text-2xl font-bold mb-3 text-white">
        Prayer Times 
      </h1></div>
      
      <div className='flex pl-14 flex-col gap-4 p-4 justify-center items-center'>
       

      {/* 🔍 City & Country Search */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="text-white p-2 border-2 hover:shadow-sm hover:shadow-green-400  rounded w-40 sm:w-48"
        />
        
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country"
          className="text-white p-2 border-2 hover:shadow-sm hover:shadow-green-400 rounded w-40 sm:w-48"
        />
        <button 
          disabled={!city || !country}
          onClick={fetchtimings}
          className="bg-green-700 text-white hover:bg-green-800 px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      </div>
      <div className='flex gap-15 pr-6  p-4 justify-center items-center'>
      <button onClick={() => setMethod(2)} className='bg-black cursor-pointer  text-white w-60 h-9 rounded-xl'>Ahl al-Sunnah</button>
      <button onClick={() => setMethod(7)} className='bg-black cursor-pointer text-white w-65 h-9 rounded-xl'>People of Wilayah</button>
      </div>
      {loading ? (<div className='flex justify-center items-center'><p className='text-white'>Loading Timing...</p></div>): timing ? (
        (
          <div className='flex justify-center items-center'>
        <div className="bg-black/40  p-5 rounded-lg w-80">
          {importantTimings.map((name) => (
            <div
              key={name}
              className="flex justify-between text-white border-b border-gray-700 py-1"
            >
              <span className="font-semibold text-white">{name}</span>
              <span className='text-white'>{timing[name]}</span>
            </div>
          ))}
          <p className="text-sm text-white mt-2 text-center">
           {date}
          </p>
        </div>
        </div>
      )) : (
        <p>No timings found.</p>
      )}
      


     
    </main>
  )
}

export default timing


