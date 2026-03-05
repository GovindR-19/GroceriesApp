import styles from "../src/CSS/grocery.module.css";
import { useState, useEffect } from "react";


function GroceriesItem({ name, count, toggle }){
  const [value, setValue] = useState(count);  
  const [itemName, setItemName] = useState(name);

  const [toggleColor, setToggleColor] = useState("yellow");
  const [toggleStatus, setToggleStatus] = useState(toggle);

  
  const handleToggle = ()=>{
    setToggleStatus(!toggleStatus);
  }

  useEffect(()=>{
    if(toggleColor === "yellow"){setToggleColor("white")}
    else{ setToggleColor("yellow")}

  },[toggleStatus])
  

  const handleInput = (event)=>{
    setItemName(event.target.value);
  }
  
  
  const handleAdd = ()=>{
    setValue(prev=> prev + 1)
  }
  
  const handleSubstract = ()=>{
    if(value>0){
      setValue(prev=> prev - 1)
    }
  }

  
  return(
    <div className={styles.tile} >
      <button className={styles.toggle} onClick={handleToggle} style={{backgroundColor: toggleColor}} />
      
      <input  
              className={styles.itemName} 
              onChange={handleInput}
              value={itemName} 
              />

      <button onClick={handleSubstract} >-</button>
      <h1 className={styles.itemCount} >{value}</h1>
      <button onClick={handleAdd} >+</button>      
    </div>
  )
}
function App() {
  
  const [itemList, setItemList] = useState([{id:0, name: "new", category:"default", count: 1, toggle:true  }])

  
  const addItem =()=>{
    const newId = itemList.length;
    const newItem = [...itemList, {id: newId, name: "new", count:1, category: "default", toggle: true}];
    setItemList(newItem);
    
  }

 


  return (
      <div className={styles.container} >
        <h1>Main Window</h1>
        {
          itemList.map( (item)=>{
            return(
                <GroceriesItem key={item.id} name={item.name} count={item.count} />
            )
          })
        }
        
        <button onClick={addItem} className={styles.newBtn}>New</button>
      </div>
     
  )
}

export default App
