// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


type Data = {
  colours: string[] | undefined
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'POST') {
    const query:string = req.body.query
    if(!query || query.trim() === '') {  
      res.status(400).json({ error: 'Query is required'})
    }
    const colours = await getCompletion(query)
    res.status(200).json({ colours })
  }

}


async function getCompletion(query:string):Promise<string[] | undefined> {
  try{
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a web application which helps people to find a colour pallete for their design by describing what they are looking for. The answer to the prompt should be always a javascript string with only and only the colors HEX codes seperated by comma. Don't add any other description or text."},
        {"role": "user", "content": `Generate a javascript string with HEX codes of colour pallete, speretade by comma for the the following description: ${query}`},
      ]
    });
return completion.data.choices[0].message?.content?.split(',');
  }catch(error){
    console.error(error.message)
  }


}