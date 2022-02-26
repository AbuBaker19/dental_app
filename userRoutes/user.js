const express = require('express');
const { Addusers, Updateusers, getAlluser, Addfamily, updateFamily, deleteFamilyMember, getFamilyMembers, userLogin } = require('../Contrlloers/user');
const router = express.Router();

router.post('/Addusers',Addusers);
router.put('/updateusers',Updateusers);
router.get('/getAllsuers',getAlluser);

router.post('/addfamily',Addfamily);
router.put('/updatefamily',updateFamily);
router.get('/getfamily',getFamilyMembers);
router.delete('/deletefamily',deleteFamilyMember);

router.post('/userlogin',userLogin);


module.exports = router;