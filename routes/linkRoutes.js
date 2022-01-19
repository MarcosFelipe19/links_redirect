const express = require('express')
const router = express.Router()
var methodOverride = require('method-override')
const linkControllers = require('../controllers/linkControllers')

router.use(methodOverride('_method'))

router.get('/', linkControllers.allLinks)
router.get('/add', (req, res)=>{res.render('add', { erro:false, body:{} }) })
router.get('/:title', linkControllers.redirect)
router.get('/edit/:id', linkControllers.loadLinks)

router.post('/edit/:id', express.urlencoded({extended:true}) , linkControllers.editLink)
router.post('/', express.urlencoded({extended: true}), linkControllers.addLink)
router.delete('/:id', linkControllers.deleteLink)
router.delete('/',express.urlencoded({extended:true}), linkControllers.deleteLink)


module.exports = router