// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export type Colour = {
  hex_code: string,
  colour_name: string
}[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Colour[] | undefined>
) {
  if(req.method === 'POST') {
    const query:string = req.body.query
    if(!query || query.trim() === '') {  
      res.status(400).json({ error: 'Query is required'})
    }
    const results = await getCompletion(query)
    res.status(200).json(results)
  }

}


async function getCompletion(query:string):Promise<Colour[] | undefined> {
  try{
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role": "system", "content": "You are a web application which helps people to find a colour pallete for their design by describing what they are looking for.Don't add any other description or text. The description is enclosed in <query>. The output should be a an array which has a JSON object for each item. Each object has the following fields: hex_code, colour_name."},
        {"role": "user", "content": `<${query}>`},
      ]
    });
   const data  = JSON.parse(completion.data.choices[0].message?.content || '');
    return data
  }catch(error){
    console.error(error.message)
  }


}