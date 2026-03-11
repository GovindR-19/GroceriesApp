import { useState } from 'react'


function App() {
  const [data, setData] = useState('');
  const [itemName, setItemName] = useState("");
  const [count, setCount] = useState(1);
  const [toggle, setToggle] =useState(false)

  const handleSubmit = async (e)=>{
    // e.preventDefault();

    const contentBody = { item_name: itemName, item_count: count, category_id: 1, toggle:false}

    try{
      const response = await fetch("http://localhost:3000/items",
        {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify(contentBody)
        }
      );
      const newData = response.json();
      setData(newData);
      console.log("Success", data)
      alert(`Added: ${data.item_name}`)
    }catch(e) {
      console.error(e.message)
    }

  }

 return (
        <div>
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection:"column", margin: "10px", alignContent:'center', justifyContent:'center'}} >
            <input value={itemName} type="text" placeholder='Name...' onChange={(e)=>setItemName(e.target.value)} />
            <input value={count} type="number" placeholder={1} onChange={(e)=>setCount(e.target.value)}/>
            <input value={true} type="boolean" placeholder='false' onChange={()=>setToggle(true)} />
            <button type="submit" >Add Item</button>
          </form>
          <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export default App
