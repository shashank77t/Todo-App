import React,{ useEffect, useState} from "react";
import Alert from "./components/Alert";
import List from "./components/List";
const getLocalStorage=()=>{
  let list=localStorage.getItem("list");
  if(list){
    return (list=JSON.parse(localStorage.getItem("list")));
  }else{
    return [];
  }
}




function App() {
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(!name){
      showAlert(true,"danger","Please Enter value");

    }else if(name&&isEditing){
      setList(
        list.map((item)=>{
          if(item.id===editID){
            return {...item,title:name}
          }
          return item;
        })
      );
      setName("");
      seteditID(null);
      setisEditing(false);
      showAlert(true,"success","value changes");
    }else{
      showAlert(true,"success","item added to the list");
      const newItem={id:new Date().getTime().toString(),title:name};
      //console.log(list);
      setList([...list,newItem]);
      //console.log(list);
      setName("");
    }
  };
  const showAlert=(show =false,type="",msg="")=>{
    setAlert({show,type,msg});
  };
  const removeItem=(id)=>{
    showAlert(true,"danger","Item removed");
    setList(list.filter((item)=>item.id!==id));
  };
  const editItem=(id)=>{
    const editItem=list.find((item)=>item.id===id);
    setisEditing(true);
    seteditID(id);
    setName(editItem.title);
  };
 
    const clearList = () => {
      setList([]);
      showAlert(true, "success", "All items cleared");
    };
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list),[list]);
  })


  const [name,setName]=useState("");
  const [list, setList] = useState(getLocalStorage);
  const [isEditing,setisEditing]=useState(false);
  const [editID,seteditID]=useState(null);
  const [alert,setAlert]=useState({show:false,msg:"",type:""});


  return (
 
    <section className='section-center'> 
    <form onSubmit={handleSubmit}>
      {alert.show&&<Alert {...alert} removeAlert={showAlert} list={list} />}
      <h3 style={{marginBottom:"1.5rem",textAlign:"center"}}>Todo using local storage</h3>
      <div className="mb-3 form">
        <input type="text" className="form-control" placeholder="e.g Brand" onChange={(e)=>setName(e.target.value)} value={name}/>
        <button type="submit" className="btn btn-success">
        {isEditing?"Edit":"Submit"}
        </button>
      </div>
    </form>
    {list.length > 0 && (
         <div>
         <List items={list} removeItem={removeItem} editItem={editItem}/>
          <div className="text-center">
            <button className="btn btn-warning" onClick={clearList}>
              Clear Items
            </button>
          </div>
       </div>
      )}
    </section>
  );
}
export default App;
