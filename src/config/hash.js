import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10
const passwordAdmin = 'carolina2020'

// email =  alhiperac500@gmail.com

async function hashedPassword(password){
    const hashed = await bcrypt.hash(password, SALT_ROUNDS)
    return console.log(" contraseña hasheada",hashed)
}




hashedPassword(passwordAdmin)