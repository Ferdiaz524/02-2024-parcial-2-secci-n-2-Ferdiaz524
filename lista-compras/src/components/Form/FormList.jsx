import React, { useState } from "react";
import { IoMdCreate } from "react-icons/io";
import "./FormList.css";

const FormList = ({ handleAddList }) => {
    const [name, setName] = useState("");

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        handleAddList(name);
        setName("");
    };

    const onChangeItem = (e) => {
        setName(e.target.value);
    };

    return (
        <>
            <form onSubmit={handleSubmitEvent} className="newItem-Form">
                <input
                    required
                    placeholder="Id del producto"
                    type="text"
                    onChange={onChangeItem}
                    value={name}
                />
                <button className="newItem-button">
                    Agregar compra <IoMdCreate size={20} />
                </button>
            </form>
        </>
    );
};

export default FormList;
