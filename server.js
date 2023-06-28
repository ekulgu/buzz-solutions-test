import express from 'express'
import fetch from "node-fetch";

const app = express()

// app.use(express.json());

const flickrApi = 'https://www.flickr.com/services/feeds/photos_public.gne'


app.get('/images', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log("req >>>",req)
    const { tags } = req.query
    // const tags = 'sno'

    fetch(`${flickrApi}?tags=${encodeURIComponent(tags)}&format=json&nojsoncallback=1`)
    // fetch(`${flickrApi}`)
    .then(response => response.json())
    .then( data => {
        const images = data.items
        console.log("images data >>>", data)
        res.json(images)
    })
    .catch( err => {
        console.error("Error from fetching api images:", err);
        res.statusCode(500).json({error: 'Server error occured while fetching data'})
    })
})



const port = process.env.PORT || 3005
app.listen(port,  () => {
    console.log(`Listening on port ${port}...`)
})