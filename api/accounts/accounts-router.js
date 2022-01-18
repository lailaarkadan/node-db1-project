const router = express.Router()
const express = require('express')
const Accounts = require('./accounts-model')


const {
   checkAccountId,
   checkAccountPayload, 
   checkAccountNameUnique 
    
} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  await Accounts.getAll(req.query)
    .then(accounts => {
    res.status(200).json(accounts)
    })
  .catch(next)
})

router.get('/:id', checkAccountId, (req, res) => {
    res.status(200).json(req.account)

})
router.post('/', checkAccountPayload, checkAccountNameUnique , async (req, res, next) => {
  try{
    const newAccount = await Accounts.create(req.body)
    res.status(201).json(newAccount)
  }catch(err){
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  await Accounts.updateById(req.params.id, req.body)
    .then(updated => {
    res.status(200).json(updated)
    })
  .catch(next)
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
    try {
        const deleted = await Accounts.deleteById(req.params.id)
        res.json(deleted)
    } catch (err) {
        next(err)
    }
})

module.exports = router;