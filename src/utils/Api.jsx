import axios from "axios";

const configUrl = {
    url: 'https://pixabay.com/api/',
    keyUserPixabay: '22753244-01291854404e32317fab358dd',
}

const getImages = (nextName, page = 1) => axios.get(`${configUrl.url}?q=${nextName}&page=${page}&key=${configUrl.keyUserPixabay}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => response.data.hits)
    .catch(err => alert(err))

export default getImages