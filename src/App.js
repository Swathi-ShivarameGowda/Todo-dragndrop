import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import { initialValue } from './constants'

function App() {
    const [inputValue, setInputValue] = useState()
    const [list, setList] = useState(initialValue);
    const [idValue, setIdvalue] = useState(3)

    const addItem = (item) => {
        if (item) {
            setIdvalue(idValue + 1);
            const newList = { item, id: idValue }
            setList([newList, ...list]);
            setInputValue("")
        }
    }



    const removeItem = (item) => {
        let itemArray = Array.from(list);
        itemArray.splice(item, 1);
        setList(itemArray)
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(list);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setList(items);
    }



    return (
        <>
            <div className="App">
                <header className="App-header">
                    <h1>Todo Items</h1>

                    <div className="Add">
                        <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
                        <button onClick={() => addItem(inputValue)}>Add</button>
                    </div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="list">
                            {(provided) => (
                                <ul className="grid-container" {...provided.droppableProps} ref={provided.innerRef}>

                                    {list.map(({ item, id }, index) => {

                                        return (
                                            <Draggable key={id} draggableId={id.toString()} index={index}>
                                                {(provided) => (
                                            <div className="grid-item">
                                           
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} key={id}>
                                                        <div className="characters-thumb">
                                                        {item}
                                                        </div>
                                                        <button onClick={() => removeItem(index)}>Remove</button>
                                                        </li>

                                            </div>


                                                )}
                                            </Draggable>
                                            
                                        )

                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                        

                </header>
            </div>
        </>
    );
}

export default App;
