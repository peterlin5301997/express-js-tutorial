const express = require('express');
const uuid = require('uuid');
const members = require('../../MembersData'); // imports Members data

const router = express.Router();

// Gets All Members
router.get('/', (req, res) => {
  res.json(members);
});

// Get Single Member
router.get('/:id', (req, res) => {

  const found = members.some(member => {
    return member.id == req.params.id
  })

  if (found) {
    res.json(members.filter(member => {
      return member.id == req.params.id
    }))
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
});

// Create Member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  }

  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: 'Please include a name and email' })
  }

  members.push(newMember);
  res.json(members)
})

module.exports = router;
