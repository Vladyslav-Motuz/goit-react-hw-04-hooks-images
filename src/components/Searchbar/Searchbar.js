import { useState } from "react";
import s from './Searchbar.module.css'

function Searchbar({onSubmit}) {
    const [searchName, setSearchName] = useState("");

    const handleChange = (event) => {
        setSearchName(event.currentTarget.value.toLowerCase());
    };        

    const handleSubmit = (event) => {
        event.preventDefault();
        if (searchName.trim() === "") {
            alert("Введите запрос")
            return
        }        
        onSubmit(searchName);
        resetForm();
    };

    const resetForm = () => {
        setSearchName("");
    };

    return (
        <header
            className={s.Searchbar}
        >
            <form onSubmit={handleSubmit} className={s.SearchForm}>
                <button type="submit" className={s.SearchForm__button}>
                    <span className={s.SearchForm__buttonText}>Search</span>
                </button>

                <input
                    onChange={handleChange}
                    className={s.SearchForm__input}
                    type="text"
                    value={searchName}
                    // autocomplete="off"
                    // autofocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
};

export default Searchbar;