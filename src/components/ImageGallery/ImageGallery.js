import React from 'react';
import { useState, useEffect } from "react";
import s from './ImageGallery.module.css';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ImagesAPI from '../../servise/image-api';

// class ImageGallery extends React.Component {
//     state = {
//         data: [],        
//         page: 1,
//         status: 'idle',
//         error: ''        
//     };
    
//     componentDidUpdate(prevProps, prevState) {
//         const prevSearchImages = prevProps.searchName;
//         const newSearchImages = this.props.searchName;
//         const { page } = this.state;
        
//         if (prevSearchImages !== newSearchImages) {
//             this.setState({ status: 'panding', page: 1, data: '', loading: true });
//             if (page === 2) { return };
//             ImagesAPI.SearchImages(newSearchImages, page)
//                 .then(data => this.setState({ data: data.hits, totalhits: data.totalHits, status: 'resolved' }))
//                 .catch(error => this.setState({ error, status: 'rejected' }))
//                 .finally(() => this.setState({ loading: false }));
//             // console.log(page)
//         };        
        
//         if (prevState.page !== this.state.page) {            
//             ImagesAPI.SearchImages(prevSearchImages, this.state.page)
//                 .then(data => this.setState({ data: [...prevState.data, ...data.hits], status: 'resolved' }))
//                 .catch(error => this.setState({ error, status: 'rejected' }))
//             console.log(page)
//         }
//     }

//     handleButtonClick = () => {
//         this.setState(prevState => ({ page: prevState.page + 1 }))
//     };

//     render() {
//         const { data, status, error } = this.state;
//         if (status === "idle") { return <h1>Введите запрос изображения</h1> }
//         if (data.length === 0) { return <h1>изображений не найдено</h1> }
//         if (status === 'panding') { return <Loader /> };
//         if (status === 'rejected') { return <h1>{error.massage}</h1> };
//         if (status === 'resolved') {
//             return (
//                 <>
//                     <ul className={s.ImageGallery}>
//                         {data.map((image) => (
//                             <ImageGalleryItem
//                                 key={image.id}
//                                 source={image.webformatURL}
//                                 description={image.tags}
//                                 dataOriginal={image.largeImageURL}/>))}
                        
//                     </ul>
//                     {data.length > 0 &&
//                         <Button onClick={this.handleButtonClick}>
//                             Load more
//                         </Button>
//                     }
//                 </>)
//         }
//     }
// };
function ImageGallery({ searchName}) {    
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState("");
    
    const handleButtonClick = () => {        
        setPage(prevPage => prevPage + 1);        
    };

    useEffect(() => {
        setPage(page);
        if (searchName === "") { return };
        if (page === 1) {
            setStatus("panding");
            ImagesAPI.SearchImages(searchName, 1)
                .then(data => {
                    setData(data.hits);
                    setStatus("resolved");
                }).catch(error => {
                    setError(error);
                    setStatus("rejected");
                });
        }
        if (page > 1) {            
            ImagesAPI.SearchImages(searchName, page)
                .then(data => {
                    setData(prevData => [...prevData, ...data.hits]);
                    setStatus("resolved");
                }).catch(error => {
                    setError(error);
                    setStatus("rejected");
                });
        }        
    },[searchName, page])

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