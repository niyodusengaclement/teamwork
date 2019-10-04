import bcrypt from 'bcrypt';



export async function logUser(inputEmail,inputPassword){
    const salt = bcrypt.genSaltSync(10);
    const inPassword= bcrypt.hashSync(inputPassword, salt);
    const hash= bcrypt.compareSync(inPassword,inputPassword);
    return this.user=users.find(data => data.email===inputEmail && data.password===inputPassword);
}