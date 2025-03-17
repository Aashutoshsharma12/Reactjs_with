export function clear_localStorage(){
    console.log('enter')
    localStorage.removeItem('token')
    localStorage.clear()
}