export const setLocalStorage = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item))
}
export const getLocalStorage = key => {
    return JSON.parse(localStorage.getItem(key))
}
export const getSessionStorage = key => {
    return JSON.parse(sessionStorage.getItem(key))
}