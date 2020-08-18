const express = require('express')

const router = express.Router()

router.get('/',(req,res,next) => {
    console.log('GET request in places')
    res.json({message:'It works'})
})

// router.post('/',(req,res,next) => {
//     console.log('POST request in places')
//     res.json({message:'It works'})
// })

// router.patch('/',(req,res,next) => {
//     console.log('PATCH request in places')
//     res.json({message:'It works'})
// })

// router.delete('/',(req,res,next) => {
//     console.log('DELETE request in places')
//     res.json({message:'It works'})
// })

module.exports = router