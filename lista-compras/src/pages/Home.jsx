import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import ViewList from "../components/ViewLists/ViewLists";
import "./Home.css";

const Home = () => {
    const [items, setItems] = useState([]);

    const addItem = async (itemName) => {
        try {
            const response = await fetch(`http://34.56.94.219:3000/items`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id: itemName }),
            });


            if (response.ok) {
                fetchItemsFromBackend();
            } else {
                alert("Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    };

    const toggleItemPurchasedById = async (itemId) => {
        try {
            const response = await fetch(`http://34.56.94.219:3000/items/${itemId}`, {
                method: "PUT",
            });

            if (response.ok) {
                fetchItemsFromBackend();
            }
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    const deleteItemById = async (itemId) => {
        try {
            const response = await fetch(`http://34.56.94.219:3000/items/${itemId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchItemsFromBackend();
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    const fetchItemsFromBackend = async () => {
        try {
            const response = await fetch(`http://34.56.94.219:3000/items`);
            if (response.ok) {
                const items = await response.json();
                setItemsAndSave(items);
            } else {
                console.error("Error al cargar productos del backend");
            }
        } catch (error) {
            console.error("Error en la comunicación con el backend:", error);
        }
    };

    const setItemsAndSave = (newItems) => {
        setItems(newItems);
        localStorage.setItem("items", JSON.stringify(newItems));
    };

    useEffect(() => {
        fetchItemsFromBackend();


        const intervalId = setInterval(() => {
            fetchItemsFromBackend(); 
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="home-container">
            <Header handleAddList={addItem} />
            <ViewList
                items={items}
                deleteItemById={deleteItemById}
                onMarkAsPurchased={toggleItemPurchasedById}
            />
        </div>
    );
};

export default Home;


//Referencias

//  Universidad Centroamericana José Simeón Cañas. (n.d.). Laboratorio 05: Introducción a React.
//  Universidad Centroamericana José Simeón Cañas. (n.d.). Laboratorio 06: Arquitectura MVC con Node.js y Express.
//  OpenAI. (2024). Asistente virtual ChatGPT: Aplicación de lista de compras. https://www.openai.com/chatgpt