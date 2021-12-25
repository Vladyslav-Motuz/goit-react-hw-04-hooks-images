import { useState } from "react";
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

import './App.css';

function App() {
  const [searchName, setSearchName] = useState("");
  const [pageStart, setPageStart] = useState(1);

  const searchForm = (searchName, page) => {
    setSearchName(searchName);   
    setPageStart(page)
  };

  return (
    <div className="App">
      <Searchbar onSubmit={searchForm} />
      <ImageGallery searchName={searchName} pageStart={pageStart}/>
    </div>
  );
};

export default App;
