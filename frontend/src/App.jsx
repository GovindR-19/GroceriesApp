import styles from "../src/CSS/grocery.module.css";
import { useState  } from "react";


function GroceriesItem({name, count, deleteItem, addCount, removeCount, changeName}){


  return(
    <div className={styles.tile} >
      <button  className={styles.toggle} />

      <input  type= "text"
              className={styles.itemName}
              value = {name}
              onChange={(e)=>changeName(e.target.value)}

              />

      <button onClick={()=>removeCount()} >-</button>
      <h1>{count}</h1>
      <button onClick={()=>addCount()} >+</button>
      <button className={styles.deleteBtn} onClick={()=>{deleteItem()}} >Delete</button>
    </div>
  )
}
function App() {
  const toggleState = true
  const [list, setList] = useState(
    [

      {
        itemCategory: "Breakfast",
        items: [
          { id:1 , name:"sugar",  count: 1, toggle: toggleState},
          { id:2 , name: "milk",  count: 2, toggle: toggleState},
          { id:3 , name: "tea",  count: 3, toggle: toggleState},
          { id:4 , name: "coffee",  count: 4, toggle: toggleState},
        ]
      },

      {
        itemCategory: "Cleaning Supplies",
        items: [
          { id:5 , name:"soap",  count: 1, toggle: toggleState},
          { id:6 , name: "brush",  count: 2, toggle: toggleState},
          { id:7 , name: "sprayer",  count: 3, toggle: toggleState},
          { id:8 , name: "platic bag",  count: 4, toggle: toggleState},
        ]
      },
    ]
  )

  const addItem = (categoryIndex)=>{
    const newList = [...list] ;
    newList[categoryIndex] ={
      ...newList[categoryIndex],
      items: [
        ...newList[categoryIndex].items,
        {id:Date.now() ,name: "New", count:1, toggle: toggleState}
      ]
    } 
    setList(newList);

  }

  const deleteItem = (categoryIndex ,itemIndex)=>{
    const newList = [...list];

    const filteredItems = newList[categoryIndex].items.filter((_, i) => i != itemIndex);
    newList[categoryIndex] = {
      ...newList[categoryIndex],
      items: filteredItems
    }

    console.log(`Filtered list : ${JSON.stringify(filteredItems)}\n\n`);

    setList(newList)
   

  }


  const incrementCount = (categoryIndex, itemIndex)=>{
    const newList = [...list];

    const filteredItem = newList[categoryIndex].items.filter((_, i) => i === itemIndex );

    newList[categoryIndex].items[itemIndex] = {
      ...newList[categoryIndex].items[itemIndex], 
      count: newList[categoryIndex].items[itemIndex].count+1
      
    }

    console.log(JSON.stringify(filteredItem));

    setList(newList)


  }

  const decrementCount = (categoryIndex, itemIndex)=>{
    const newList = [...list];

    const newItem = newList[categoryIndex].items[itemIndex];
  
    newList[categoryIndex]={
      ...newList[categoryIndex],
      items: newList[categoryIndex].items.map((item, i)=>{
        if (i === itemIndex){
          return{...item, count: item.count > 0 ? item.count -1 : 0};
        }
        return item;
      })
    }

    console.log(JSON.stringify(newItem));

    setList(newList)


  }

  const changeItemName = (categoryIndex, itemIndex, newName)=>{
    const newList = [...list];
    newList[categoryIndex] = {
      ...newList[categoryIndex],
      items: newList[categoryIndex].items.map((item, i)=>{
        if(i === itemIndex){
          return {...item, name: newName}
        }
        return item;
        
      })
    }

    setList(newList)

  }



 return(
  <div>
    {
      list.map((element, categoryIndex)=>{

        return (
          <div>
            <h2 key={categoryIndex} >{element.itemCategory}</h2>
            <>{
              element.items.map((i, itemIndex)=>{
                return (
                  <li key={itemIndex} >
                        <GroceriesItem
                        count={i.count}
                        name={i.name}
                        deleteItem={()=>deleteItem(categoryIndex, itemIndex)}
                        addCount={()=>incrementCount(categoryIndex, itemIndex)}
                        removeCount={()=>decrementCount(categoryIndex, itemIndex)}
                        changeName={(newName)=>changeItemName(categoryIndex, itemIndex, newName)}
                        />
                  </li>
                )
          })
              }</>
              <button className={styles.addBtn} onClick={()=>addItem(categoryIndex)} >Add</button>
          </div>
      )
      })
    }
    <button>New Category</button>
  </div>
 )


}

export default App
