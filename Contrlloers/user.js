const dbcon = require('../Database')
const bcrypt = require('bcryptjs');


////////userlogin/////////////
exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        let sql = `SELECT * from users
                   WHERE email = ?`;

        dbcon.query(sql, [email], (err, result) => {
            if (err) throw err;
            // if (result) {
            //     res.status(200).json({
            //         message:"userLogin Successfully"
            //     })
            if (result) {
                const data = result[0].password;
                console.log("data==", data);
                const isMatch =  bcrypt.compare(password, data);
                console.log("isMatch", isMatch);
                if (isMatch) {
                    res.status(200).json({
                        message: "userlogin successfully"
                    })
                }
                else {
                    res.status(200).json({
                        message: "Invalid Email or Password"
                    })
                }
            } else {
                res.status(200).json({
                    message: "Invalid Email or Password"
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            Error_Message: "Somthing wents wrongs",
            error
        })
    }
}
////////Add Family members//////
exports.Addfamily = async (req, res) => {
    try {
        const { users_id, firstname, lastname, DOB } = req.body
        let sql = `INSERT INTO family (users_id, firstname, lastname, DOB)  VALUES ("${users_id}", "${firstname}", "${lastname}", "${DOB}")`;
        dbcon.query(sql, (err, result) => {
            if (err) {
                res.json({
                    message: err
                })
            }
            if (result) {
                res.status(201).json({
                    message: "Family member Add successfuly"
                })
            } else {
                res.status(400).json({
                    message: "Oops Family member Add failed"
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            Error_Message: "Somthing wents wrong",
            error
        })
    }
}
//////Update family Details/////
exports.updateFamily = async (req, res) => {
    try {
        const { family_id } = req.body
        console.log("datat", req.body);
        dbcon.query(`select * from family where family_id = ?`, [family_id], (err, result) => {
            if (err) {
                res.json({
                    message: err
                })
            }
            if (result.length > 0) {
                const data = result[0];
                const firstname = req.body.firstname ? req.body.firstname : data.firstname;
                const lastname = req.body.lastname ? req.body.lastname : data.lastname;
                const DOB = req.body.DOB ? req.body.DOB : data.DOB;

                let sql = `UPDATE family set
                        firstname =? , lastname = ?, DOB = ?
                        where family_id = ? ;`
                dbcon.query(sql, [firstname, lastname, DOB, family_id], (err, resul) => {
                    if (err) throw err;
                    if (resul) {
                        res.status(200).json({
                            message: "Family Info are Updated successfully"
                        })
                    } else {
                        res.status(200).json({
                            message: "Family Info are Updated failed..."
                        })
                    }
                })
            }
        })
    } catch (error) {
        res.json({
            Error_Message: "Somthing wents wrongs",
            error
        })
    }
}
//////get family members by Id////
exports.getFamilyMembers = async (req, res) => {
    try {
        const { users_id } = req.body
        let sql = `select * from family where users_id = ?;`
        dbcon.query(sql, [users_id], (err, result) => {
            if (err) {
                res.json({
                    message: err
                })
            }
            if (result) {
                res.status(200).json({
                    message: 'Your family members',
                    result
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            Error_Message: "something wents wrongs",
            error
        })
    }
}
/////Delet Family////
exports.deleteFamilyMember = async (req, res) => {
    try {
        const { family_id } = req.body
        let sql = `DELETE FROM family where family_id = ?;`
        dbcon.query(sql, [], (err, result) => {
            if (err) {
                res.json({
                    message: err
                })
            }
            if (result) {
                res.status(200).json({
                    message: "family member deleted successfully"
                })
            } else {
                res.status(400).json({
                    message: "something wents wrongs"
                })
            }
        })

    } catch (error) {
        res.status(500).json({
            Error_Message: "Something wents wrongs",
            error
        })
    }
}
////// Add users/////
exports.Addusers = async (req, res) => {
    try {
        const { email, phone_number, lan_id, role_id } = req.body;
        const hasedpassword = await bcrypt.hashSync(req.body.password, 10)
        // console.log(req.body);
        let sql = `INSERT INTO users (lan_id, role_id, email, password , phone_number) VALUES ("${lan_id}", "${role_id}","${email}", "${hasedpassword}", "${phone_number}");`;
        dbcon.query(sql, (err, result) => {
            if (err) {
                console.log("ERROR", err);
                res.json({
                    message: err
                })
            }
            if (result) {
                res.status(200).json({
                    message: "users register Successfully",
                    result
                })
            } else {
                console.log("error", err);
                res.status(400).json({
                    message: "Oop's users  registration failed"

                })
            }
        })
    } catch (error) {
        res.status(500).json({
            Error_Message: "Somthing wents wrongs",
            error
        })
    }
}
////// Update users/////
exports.Updateusers = async (req, res) => {
    try {
        const { users_id } = req.body;
        dbcon.query(`select * from users where users_id = ?`, [users_id], (err, result) => {
            if (err) {
                res.json({
                    message: err
                })
            }
            if (result.length > 0) {
                const data = result[0];
                let email = req.body.email ? req.body.email : data.email;
                let phone_number = req.body.phone_number ? req.body.phone_number : data.phone_number
                let lan_id = req.body.lan_id ? req.body.lan_id : data.lan_id
                let zip_code = req.body.zip_code ? req.body.zip_code : data.zip_code

                let sql = `UPDATE users set
               email =? , phone_number = ?, lan_id = ?, zip_code =?
               where users_id = ? ;`
                dbcon.query(sql, [email, phone_number, lan_id, zip_code, users_id], (err, resul) => {
                    if (err) throw err;
                    if (resul) {
                        res.status(201).json({
                            message: "users updated successfully",
                            resul
                        })
                    }
                })
            }
        })

    } catch (erroe) {
        res.status(500).json({
            Error_Message: "Sommething wents wrongs",
            error
        })
    }
}
//////get All users////
exports.getAlluser = async (req, res) => {
    try {
        const { role_id } = req.body.role_id
        let sql = `select * from users where role_id = ?;`
        dbcon.query(sql, [role_id], (err, result) => {
            if (err) {
                res.json({
                    message: err
                })
            }
            if (result) {
                res.status(200).json({
                    message: "users List",
                    result
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            Error_Message: "Something wents wrongs",
            error
        })
    }
}




// /////////Relationship///////////
// exports.getUserByTypeId = async (req, res) => {
//     try {
//         const { userTypeId } = req.body
//         let sql = `select u.firstName, u.lastName, u.DOB, ut.description from users u
//                    inner join usertype ut on
//                    ut.userTypeId = u.userTypeId
//                    where ut.userTypeId = ${userTypeId}`
//         // let sql = ` SELECT * FROM users where userId = ${userId} `
//         dbcon.query(sql, function (err, result) {
//             console.log("result", result);
//             if (result) {
//                 res.status(200).json({
//                     message: "your data is here",
//                     result
//                 })
//             } else {
//                 res.status(400).json({
//                     message: "no data found"
//                 })
//             }
//         })
//     } catch (error) {
//         res.status(500).json({
//             Error_Message: "Somthing wents wrongs",
//             error

//         })
//         console.log("erroe");
//     }

// } 