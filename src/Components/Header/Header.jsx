import React ,{ useEffect, useState }  from "react";
import './Header.css';
import Showtask from "../Showtask/Showtask";
import Title from "../TITLE/Title";
export default function Header(){

  // Initialize state with tasks from local storage or an empty array
  const [Tasks , settasks]=useState(()=>{
    const savedtasks = localStorage.getItem('Tasks');
    return savedtasks? JSON.parse(savedtasks):[]
  });


  const[task ,setnewtask]=useState("");
  const[desc ,setnewdesc]=useState("");
  const[mark ,setnewmark]=useState("");
  const[date ,setnewdate]=useState("");
  const [showalert ,setshowalert]=useState(false);


  function addtask(){
    if (task.trim()!== ''){
  const newtask =[...Tasks,{id: Tasks.length+1 , title:task , desc: desc, date:date, completed: mark}];
      settasks(newtask)
      setnewtask("")
      setnewdesc("")
      setnewdate("")
      setshowalert(false)
    }
    else{
      setshowalert(true)
    }
    setnewmark("")
  };
  function closealert(){
    setshowalert(false)
  };
  function toggletask(id){
    settasks(Tasks.map(task =>task.id === id ? {...task, completed : !task.completed } :task))
   }
 function deletetask(id){
  settasks(Tasks.filter(task => task.id !== id));
 };


// Save tasks to local storage whenever the tasks state changes.
useEffect(() =>{
  localStorage.setItem('Tasks' , JSON.stringify(Tasks));
},[Tasks])





return<>
  <Title/>
    <div className="header">
        <div className="container  pt-5 ">
            <h4>All Tasks({Tasks.length} tasks)</h4>
            <Showtask key={task.id} deletetask={deletetask}  toggletask={ toggletask} Tasks={Tasks} settasks={settasks}/>
             <div className="butn mt-4">
            
<button type="button" className="btn MY-BTN" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Add New Task
</button>
<div className=" modal fade  " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Add a Task</h1>
        <button type="button" className="btn-close my-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
     <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" value={task} onChange={(e) =>setnewtask(e.target.value) }/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"value={desc} onChange={(e) => setnewdesc(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">Date</label>
          <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="dd/mm/yyyy" value={date} onChange={(e) =>setnewdate(e.target.value) }/>
        </div>
       <div>
       <input className="form-check-input" type="checkbox" checked={mark} onChange={(e) => setnewmark(e.target.value)} id="flexCheckDefault"/>
       <label className="form-check-label" htmlFor="flexCheckDefault">
            Mark as Completed
        </label>
       </div>
      </div>
      {showalert &&(
        <div className="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
          <div className="errmess d-flex align-items-center">
          <i className="fa-solid fa-circle-exclamation text-danger"></i>
        <div className="ms-2">
          This is Empty
        </div>
          </div>
        <button type="button" className="btn-close" aria-label="Close" onClick={closealert}></button>
      </div>
      )}
      <div className="modal-footer d-flex justify-content-center">
        <button type="button" className="btn my-add" onClick={addtask}>ADD</button>
      </div>
    </div>
  </div>
</div>
             </div>
        </div>
    </div>
    </>
}