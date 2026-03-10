import styles from "../src/CSS/grocery.module.css";
import { useState } from "react";


function GroceriesItem({name, count,toggle, deleteItem, addCount, removeCount, changeName, toggleSwitch}){


  return(
    <div className={styles.tile} >
      <button onClick={()=>toggleSwitch()} className={styles.toggle} style={{backgroundColor: toggle ? "white" : "yellow" }} />

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
  
  const [list, setList] = useState(
    [

      {
        itemCategory: "Breakfast",
        items: [
          { id:1 , name:"sugar",  count: 1, toggle: false},
          { id:2 , name: "milk",  count: 2, toggle: false},
          { id:3 , name: "tea",  count: 3, toggle: false},
          { id:4 , name: "coffee",  count: 4, toggle: false},
        ]
      },

      {
        itemCategory: "Cleaning Supplies",
        items: [
          { id:5 , name:"soap",  count: 1, toggle: false},
          { id:6 , name: "brush",  count: 2, toggle: false},
          { id:7 , name: "sprayer",  count: 3, toggle: false},
          { id:8 , name: "platic bag",  count: 4, toggle: false},
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
        {id:Date.now() ,name: "New", count:1, toggle: false}
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

  const toggleSwitch = ( categoryIndex, itemIndex)=>{
    const newList = [...list];
    
    newList[categoryIndex] = {
      ...newList[categoryIndex],
      items: newList[categoryIndex].items.map((item, i)=>{
        if(i === itemIndex){
            return {...item, toggle: !item.toggle}
        }
        return item;
      })
    }

    setList(newList);

  }

  const addCategory = ()=>{
    const newList = [...list];

    const newCategory = {itemCategory: "New", items: [{id:Date.now() ,name: "New", count:1, toggle: false}] }

    setList([...newList, newCategory]);

  }

  const deleteCategory = (categoryIndex)=>{
    const newList = list.filter(( _ , i)=> i!== categoryIndex )

    setList(newList);
  }



 return(
  <div>
    {
      list.map((element, categoryIndex)=>{

        return (
          <div>
            <div key={categoryIndex} style={{display: "flex", alignItems: "center", justifyContent:"space-around",}} >
              <h2  >{element.itemCategory}</h2>
              <button onClick={()=>deleteCategory(categoryIndex)} >Delete All</button>
            </div>

            <div>{
              element.items.map((i, itemIndex)=>{
                return (
                  <li key={itemIndex} >
                        <GroceriesItem
                        count={i.count}
                        name={i.name}
                        toggle={i.toggle}
                        deleteItem={()=>deleteItem(categoryIndex, itemIndex)}
                        addCount={()=>incrementCount(categoryIndex, itemIndex)}
                        removeCount={()=>decrementCount(categoryIndex, itemIndex)}
                        changeName={(newName)=>changeItemName(categoryIndex, itemIndex, newName)}
                        toggleSwitch={()=>toggleSwitch(categoryIndex, itemIndex)}
                        />
                  </li>
                )
          })
              }</div>
              <button className={styles.addBtn} onClick={()=>addItem(categoryIndex)} >Add</button>
          </div>
      )
      })
    }
    <button onClick={()=>{addCategory()}} >New Category</button>
    <br/><br/>
    <button style={{width: "150px", position: "absolute", alignItems: "center"}} >Save</button>
    <br/><br/><br/><br/><br/><br/><br/><br/>
  </div>
 )


}

export default App
