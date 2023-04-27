import Image from 'next/image'
import { Inter } from 'next/font/google'
import { SearchInput } from '@/components/SearchInput'
import { FormEvent, useState } from 'react'

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
    <main style={{height:"100vh"}}>
      <div style={{height:"100%",padding:"10%"}}>
      <form onSubmit={handleSubmit}>
      <SearchInput value={query} onChange={handleQueryChange}/>
      <button type='submit'>Search</button>
      </form>
      <div style={{display:"flex",width:"100vw",justifyContent:"space-between",height:"100%"}}>
        {
          results.map((result,index) => { 
            return(
              <div style={{backgroundColor:result,height:'100%',flex:1}}  key={index+result}>
                <p style={{color:"#fff"}}>{result}</p>
              </div>
            )
        })}
      </div>
      </div>

    </main>
  )
}
