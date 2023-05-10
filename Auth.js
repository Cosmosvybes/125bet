import jwt from 'jsonwebtoken'
const secretKey = 'ddhgdcdcjascdgscyudgcycgsdc'
let token = jwt.sign({ name: 'Ayomidele' }, secretKey, { expiresIn: '30m' })

let validate = jwt.verify(token, secretKey)
if (validate) {
    console.log(validate.name)
}



