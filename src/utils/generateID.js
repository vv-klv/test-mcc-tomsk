const generateID = () => {
    return Math.floor(Math.random() * Date.now())
}

export default generateID