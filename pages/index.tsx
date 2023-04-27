import Image from 'next/image'
import { Inter } from 'next/font/google'
import { SearchInput } from '@/components/SearchInput'
import { FormEvent, useState } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [query,setQuery] = useState<string>("");
  const [results,setResults] = useState<string[]>([]);

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
      const data = await response.json()
      console.log(data.colours)
      setResults(data.colours)
    }catch(err){
      console.error(err)
    }
  }
  return (
    <main className='h-screen'>
      <div className='h-full p-10'>
      <form onSubmit={handleSubmit}>
      <SearchInput value={query} onChange={handleQueryChange}/>
      <button type='submit'>Search</button>
      </form>
      <div className='flex w-screen flex-col h-full flex-wrap'>
        {
          results.map((result,index) => { 
            return(
              <div style={{backgroundColor:result}} className='w-screen  rounded-md border-white border-2 flex-1 mt-2 relative'  key={index+result}>
                <div className='absolute top-0 left-0 bg-gray-500 w-40 h-10 opacity-50 z-0'/>
                <CopyToClipboard text={result}>
                  <button style={{color:"#fff"}} className=' absolute top-0 left-0 z-10 rounded-md text-center p-2'>{result}</button>
                  </CopyToClipboard>
              </div>
            )
        })}
      </div>
      </div>

    </main>
  )
}
