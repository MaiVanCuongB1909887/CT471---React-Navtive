//validate email
export const isValidEmail = (stringEmail) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail))
}
//validate password
export const isValidPassword = (stringPassword) => {
    return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(stringPassword))
}
export const isValidRetypePassword = (stringRetypePassword) => {
    return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(stringRetypePassword))
}