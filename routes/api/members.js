const express = require('express');
const members = require('../../Members'); // imports Members data

const router = express.Router();

// Gets All Members
router.get('/', (req, res) => {
  res.json(members);
});

// Get Single Member
router.get('/:id', (req, res) => {

  const found = members.some(member => {
    member.id == req.params.id
  })

  if (found) {
    res.json(members.filter(member => {
      return member.id == req.params.id
    }))
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
});

module.exports = router;
