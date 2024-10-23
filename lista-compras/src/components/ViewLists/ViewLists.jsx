import React from "react";
import ItemList from "../itemList/ItemList";
import "./ViewLists.css";

const ViewList = ({ items, deleteItemById, onMarkAsPurchased }) => {
    console.log(items)
    return (

        <section className="shopping-list-container">
            <h2>total de artículos: {items.length}</h2>
            <div className="list-items">
                {items.map((item) => (
                    <ItemList
                        key={item.id}
                        item={item}
                        deleteItemById={deleteItemById}
                        onMarkAsPurchased={onMarkAsPurchased}
                    />
                ))}
            </div>
        </section>
    );
};

export default ViewList;