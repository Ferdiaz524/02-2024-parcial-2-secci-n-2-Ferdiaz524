import React from 'react';
import FormList from "../Form/FormList";
import "./Header.css";

const Header = ({ handleAddList }) => {
    return (
        <header className="header-container">
            <h1>Lista de Compras</h1>
            {<FormList handleAddList={handleAddList} />}
        </header>

    );
};

export default Header;