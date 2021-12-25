const BASEURL = 'https://pixabay.com/api/';
const pixabayKEY = '22582996-2a8e449eb1831e14bd2864520';
const filtersAPI = 'image_type=photo&orientation=horizontal&safesearch=true';

function SearchImages(newSearchImages, page) {
    return fetch(`${BASEURL}?key=${pixabayKEY}&q=${newSearchImages}&${filtersAPI}&&page=${page}&per_page=12`)
        .then(response => {
            if (response.ok) {
                // console.log(`${BASEURL}?key=${pixabayKEY}&q=${newSearchImages}&${filtersAPI}&&page=${page}&per_page=3`)
                return response.json()
            }
            return Promise.reject(
                new Error(`Изображений с именем ${newSearchImages} не найдено!`)
            );
        })
};
const api = {
    SearchImages,
};
export default api;