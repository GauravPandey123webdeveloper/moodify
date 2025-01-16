const express= require('express');
const router = express.Router();
const {addMusicLink, getMusicLinks} = require('./controllers/musiccontroller');
router.get("/",(req,res)=>{
    res.send("Hello World");
})
router.post("/addmusic",addMusicLink);
router.get("/getmusic/:mood",getMusicLinks);
module.exports = router;