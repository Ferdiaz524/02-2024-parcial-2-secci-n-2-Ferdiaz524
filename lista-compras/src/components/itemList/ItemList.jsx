import React from "react";
import { FaRegCircle, FaCheckCircle, FaTrash } from "react-icons/fa";
import "./ItemList.css";

const ItemList = ({ item, deleteItemById, onMarkAsPurchased }) => {
    return (
        <div className="item-card">
            <button
                className="mark-purchased-button"
                onClick={() => onMarkAsPurchased(item.id)}
            >
                {item.isPurchased ? <FaCheckCircle /> : <FaRegCircle size={20} />}
            </button>
            <p className="item-text"> {item.name}</p>
            {item.image && <img src={item.image} alt={item.name} className="item-image" />}
            <button className="delete-button"
                onClick={() => deleteItemById(item.id)}
            >
                <FaTrash size={20} />
            </button>
        </div>
    );
};

export default ItemList;
