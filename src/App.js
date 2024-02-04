import React, { useEffect, useState } from "react";
import createTodos, { initialTodos } from "./todos";

export default function TodoList() {
    const [todos, setTodos] = useState(initialTodos);
    const [showActive, setShowActive] = useState(true);
    const [showCompleted, setShowCompleted] = useState(true);
    const [activeTodos, setActiveTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [visibleTodos, setVisibleTodos] = useState([]);
    const [footer, setFooter] = useState(null);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [editedText, setEditedText] = useState("");

    useEffect(() => {
        setActiveTodos(todos.filter(todo => !todo.completed));
        setCompletedTodos(todos.filter(todo => todo.completed));
    }, [todos]);

    useEffect(() => {
        const combinedVisibleTodos = [];
        if (showActive) {
            combinedVisibleTodos.push(...activeTodos);
        }
        if (showCompleted) {
            combinedVisibleTodos.push(...completedTodos);
        }
        setVisibleTodos(combinedVisibleTodos);
    }, [showActive, showCompleted, activeTodos, completedTodos]);

    useEffect(() => {
        setFooter(
            <footer>
                {activeTodos.length} active todos | {completedTodos.length} completed todos
            </footer>
        );
    }, [activeTodos, completedTodos]);

    function handleCompleteClick(todo) {
        const updatedTodos = todos.map(t =>
            t.id === todo.id ? { ...t, completed: !t.completed } : t
        );
        setTodos(updatedTodos);
        setSelectedTodo(null);
        setEditedText("");
    }
    function NewTodo({ onAdd }) {
        const [text, setText] = useState("");

        function handleAddClick() {
            if (text.trim() !== "") {
                setText("");
                onAdd(createTodos(text));
            }
        }

        return (
            <>
                <input value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={handleAddClick}>Add</button>
            </>
        );
    }


    function handleDeleteClick(todo) {
        const updatedTodos = todos.filter(t => t.id !== todo.id);
        setTodos(updatedTodos);
        setSelectedTodo(null);
        setEditedText("");
    }

    function handleEditClick(todo) {
        setSelectedTodo(todo);
        setEditedText(todo.text);
    }

    function handleSaveClick() {
        const updatedTodos = todos.map(t =>
            t.id === selectedTodo.id ? { ...t, text: editedText } : t
        );
        setTodos(updatedTodos);
        setSelectedTodo(null);
        setEditedText("");
    }

    function handleCancelEditClick() {
        setSelectedTodo(null);
        setEditedText("");
    }

    return (
        <div style={{ backgroundColor: "#c4e1f5", padding: "20px", borderRadius: "8px", maxWidth: "400px", margin: "auto" }}>
            <label>
                <input
                    type="checkbox"
                    checked={showActive}
                    onChange={() => setShowActive(!showActive)}
                />
                Show active todos
            </label>
            <label style={{ marginLeft: "10px" }}>
                <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={() => setShowCompleted(!showCompleted)}
                />
                Show completed todos
            </label>
            <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])} />
            <ul>
                {visibleTodos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                            onClick={() => setSelectedTodo(todo)}
                        >
                            {todo.text}
                        </span>
                        {selectedTodo === todo && (
                            <>
                                <button onClick={() => handleCompleteClick(todo)}>
                                    {todo.completed ? "Uncomplete" : "Complete"}
                                </button>
                                <button onClick={() => handleDeleteClick(todo)}>Delete</button>
                                <input
                                    type="text"
                                    value={editedText}
                                    onChange={e => setEditedText(e.target.value)}
                                />
                                <button onClick={() => handleSaveClick()}>Save</button>
                                <button onClick={() => handleCancelEditClick()}>Cancel</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {footer}
        </div>
    );
}

function NewTodo({ onAdd }) {
    const [text, setText] = useState("");

    function handleAddClick() {
        setText("");
        onAdd(createTodos(text));
    }

    return (
        <>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleAddClick}>Add</button>
        </>
    );
}
