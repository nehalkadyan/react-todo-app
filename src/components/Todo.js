import React, {useState} from 'react'
import {BiMessageSquareAdd} from "react-icons/bi"
import {MdDelete} from "react-icons/md"
import {AiFillEdit} from "react-icons/ai"
import "./todo.css"

const Todo = () => {


    const [input, setInput] = useState("");
    const [items, setItems] = useState([""]);
    const [toggle, setToggle] = useState(true);
    const [tobeEdited, setTobeEdited] = useState(null);

    const addItem = () => {
        if(!input){
           alert('Please fill the data!')
        }else if(input && !toggle){
            setItems(
                items.map((item) => {
                    if(item.id === tobeEdited){
                       return {...item, name: input}
                    }
                    return item;
                } )
                
            )
            setToggle(true);
            setInput("");
            setTobeEdited(null)

            }else{
            const allInputs = {
                id: new Date().getTime().toString(),
                name: input
            }
            setInput('')
            setItems([...items, allInputs])
            
            
        }
       
    }

    const editItem = (id) => {
         let newEditItem = items.find((item) => {
            return item.id === id
         })
         setToggle(false)
         setInput(newEditItem.name)
         setTobeEdited(id);

    }

    const deleteItem = (id) => {

        const updatedItems = items.filter((item) => {
            return id !== item.id;
        });

        setItems(updatedItems)
    }

    const removeAll = () => {
        setItems([""]);
    }

    

  return (
    <>
      <div className='div'>
        <div className='child-div'>
           <figure>
            <img src="https://img.freepik.com/free-vector/collection-sticky-note-illustrations_53876-8287.jpg?w=2000" alt="logo" />
            <figcaption>Add your list here🚀</figcaption>
           </figure>

           <div className='add-item'>
              <input type='text' placeholder='write...' onChange={(e) => setInput(e.target.value)} value={input} />
              {
                toggle ? <BiMessageSquareAdd onClick={addItem} className='submit-icon'/> :                        <AiFillEdit onClick ={addItem}title='edit' className='submit-icon'/>

              }
              
           </div>

           <div className='show-item'>
            {
                items.map((item) => {
                    return (
                       <div key={item.id} className='each-item'>
                       <h4>{item.name}</h4> 
                       <div className='todo-buttons'>
                       <AiFillEdit onClick={() => editItem(item.id)} title='edit'/>
                       <MdDelete onClick={() => deleteItem(item.id)} title='delete'/>
                       </div>
                        </div>
                       


                    )
                })
            }
             
           </div>


           {/*  Clear Button   */}
           <div className='clear-btn'>
            <button onClick={removeAll}>Remove All</button>
           </div>

        </div>
      </div>
    </>
  )
}

export default Todo
