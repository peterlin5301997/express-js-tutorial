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
  // new member object
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active"
  }
  // condition to require name and email
  if (!newMember.name || !newMember.email) {
    res.status(400).json({ msg: 'Please include a name and email' })
  }

  members.push(newMember); // adds new member to array
  // res.json(members); // returns all members including new member
  res.redirect('/'); // redirects to root page
})

// Update Member
router.put('/:id', (req, res) => {

  const found = members.some(member => {
    return member.id == req.params.id
  })

  if (found) {
    const updateMember = req.body;
    members.forEach(member => {
      if (member.id == req.params.id) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: 'Member updated', member })
      }
    })
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
});

// Delete Member
router.delete('/:id', (req, res) => {

  const found = members.some(member => {
    return member.id == req.params.id
  })

  if (found) {
    res.json({
      msg: 'Member Deleted',
      members: members.filter(member => {
        return member.id != req.params.id
      })
    })
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
  }
});

module.exports = router;
