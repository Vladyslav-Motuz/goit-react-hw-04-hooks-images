import { useState, useEffect } from "react";
import s from './ImageGallery.module.css';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ImagesAPI from '../../servise/image-api';

function ImageGallery({searchName}) {    
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");
    
    const handleButtonClick = () => {        
        setPage(prevPage => prevPage + 1);        
    };

    useEffect(() => {
        setStatus("panding");
        if (searchName === "") { return };
        setPage(1);
        setData([]);
        if (searchName) {
            ImagesAPI.SearchImages(searchName, 1)
                .then(data => {
                    setData([...data.hits]);
                    setStatus("resolved");
                }).catch(error => {
                    setError(error);
                    setStatus("rejected");
                });
        }
    }, [searchName]);

    useEffect(() => {        
        if (page > 1) {
            ImagesAPI.SearchImages(searchName, page)
            .then(data => {
                setData(prevData => [...prevData, ...data.hits]);
                setStatus("resolved");
            }).catch(error => {
                setError(error);
                setStatus("rejected");
            });
            console.log(page);
        }
    }, [searchName, page]);
    
    if (status === "idle") { return <h1>Введите запрос изображения</h1> }
    if (data.length === 0) { return <h1>изображений не найдено</h1> }
    if (status === "panding") { return <Loader /> };
    if (status === "rejected") { return <h1>{error.massage}</h1> };
    if (status === "resolved") {
        return (
            <>
                <ul className={s.ImageGallery}>
                    {data.map((image) => (
                        <ImageGalleryItem
                            key={image.id}
                            source={image.webformatURL}
                            description={image.tags}
                            dataOriginal={image.largeImageURL} />))}
                        
                </ul>
                {data.length > 0 &&
                    <Button onClick={handleButtonClick}>
                        Load more
                    </Button>
                }
            </>
        )
    };
};
export default ImageGallery;