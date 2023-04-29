import { Inter } from 'next/font/google'
import { SearchInput } from '@/components/SearchInput'
import { FormEvent, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Colour } from './api/generate';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [query,setQuery] = useState<string>("");
  const [results,setResults] = useState<Colour[]>([]);

  const handleQueryChange = (value:string) => {
    // check for length by word count
    setQuery(value)
  }

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    try{
      const response = await fetch("/api/generate",{
        method: "POST",
        body: JSON.stringify({query}),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const results:Colour[] = await response.json()
      setResults(results)
    }catch(err){
      console.error(err)
    }
  }
  return (
    <main className='h-screen w-screen '>
      <div className='h-full p-10 flex flex-col'>
      <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col w-full'>
      <SearchInput value={query} onChange={handleQueryChange}/>
      <button className='bg-white text-black px-6 py-2 border-0 rounded-sm mt-2' type='submit'>Search</button>
      </form>
      <div className='flex w-full flex-col h-full flex-wrap p-10'>
        {
          results.map((result:Colour,index) => { 
            return(
              <div style={{backgroundColor:`${result.hex_code}`}} className='w-full  rounded-md border-white border-2 flex-1 mt-2 relative'  key={index+result.colour_name}>
                <div className='absolute top-0 left-0 bg-gray-500 w-40 h-full opacity-50 z-0'/>
                <CopyToClipboard text={result.hex_code}>
                  <button style={{color:"#fff"}} className=' absolute top-0 left-0 z-10 rounded-md text-center p-2 flex flex-col'>
                    <span>{result.hex_code}</span>
                    <span className='text-sm'>{result.colour_name}</span>
                    </button>
                  </CopyToClipboard>
              </div>
            )
        })}
      </div>
      </div>

    </main>
  )
}
