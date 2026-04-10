import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages,
    })

    res.json({
      reply: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error('Backend error:', error)
    res.status(500).json({
      error: error.message,
    })
  }
})

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000')
})