import React from "react";

let nextId = 0;

export default function createTodos(text, completed = false) {
    return {
        id: nextId++,
        text,
        completed
    };
}

export const initialTodos = [
    createTodos("Купить яблоки.", true),
    createTodos("Купить апельсины.", true),
    createTodos("Сделать домашнюю работу.", false)
];
