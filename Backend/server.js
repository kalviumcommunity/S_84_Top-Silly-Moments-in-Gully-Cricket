import express from 'express';
const app = express()
const PORT = 7856;

app.use(express.json());
app.get('/ping' , (req , res) => {
    res.send('This is Home Route')
})

app.listen(PORT , () => {
    console.log(`Server is running at : http://localhost:${PORT}`)
})