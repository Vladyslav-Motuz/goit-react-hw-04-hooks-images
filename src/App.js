import { useState } from "react";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

import './App.css';

function App() {
  const [searchName, setSearchName] = useState("");  

  const searchForm = (searchName) => {
    setSearchName(searchName);  
  };

  return (
    <div className="App">
      <Searchbar onSubmit={searchForm} />
      <ImageGallery searchName={searchName}/>
    </div>
  );
};

export default App;
