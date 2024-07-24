import React,{useState} from "react";
import './Showtask.css';
export default function Showtask({Tasks,toggletask,deletetask,settasks}){
  console.log(Tasks)
    const [isEditing , setisEditing ]=useState(null);
  const [uptitle ,setuptitle] = useState("");
  const [updesc ,setupdesc] = useState("");

  function updateTask (id) {
    setisEditing(id);
    setuptitle(Tasks.find((task) => task.id === id).title);
    setupdesc(Tasks.find((task) => task.id === id).desc);
  };
  
  function saveTask (){
    settasks(
        Tasks.map((task) =>
          task.id === isEditing? { ...task, title: uptitle ,desc:updesc }: task
        )
      );
      setisEditing(null);
      setuptitle("");
      setupdesc("")
  }

 return<>
    <div className="container">
      <div className="row mt-5 gy-3">
        {Tasks.map((task)=>
          <div key={task.id} className="col-md-3">
            <div class="card px-3 py-3" >
                {isEditing ?(<>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                       <input type="text" value={uptitle} onChange={(e)=>setuptitle(e.target.value)} class="form-control" id="exampleFormControlInput1" placeholder=""/>
                       </div>
                       <div className="mb-3">
                      <label htmlFor="exampleFormControlTextarea1" class="form-label">Description</label>
                      <textarea className="form-control" value={updesc} onChange={(e)=>setupdesc(e.target.value) } id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-success ml-2"onClick={() => saveTask()}>Save</button>
                    </>):(<>
                        <div classn="card-body">
   <div className="praa">
   <h5 className="card-title"style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            onClick={() => toggletask(task.id)}
            >    {task.title}</h5>
    <p className="card-text mt-2">{task.desc}</p>
   </div>
     <div className="calender d-flex align-items-center mb-auto mt-5">
     <span className="card-text">{task.date}</span>
      <div className="icon ms-auto">
        <i className="fa-regular fa-calendar-days"></i>
      </div>
     </div>
  </div>
      <div className="card-footer mt-2">
      <div className=" operations d-flex align-items-center">
            <button
              className={`btn btn-sm ml-2 ${task.completed ? 'btn-success' : 'btn-danger'}`}
              onClick={() => toggletask(task.id)}
            >
              {task.completed ? 'Complete' : 'undo'}
            </button>
         <div className="mybtnns d-flex align-items-center ms-auto">
         <div className="deletebtn">
             <button className="btn"onClick={() => deletetask(task.id)}><i class="fa-solid fa-trash-can"></i></button>
         </div>
         <div className="updatebtn">
         <button className="btn " onClick={() => updateTask(task.id)}><i class="fa-solid fa-pen-to-square"></i></button>
         </div>
         </div>
     </div>
      </div>
                    </>)}
</div>
          </div>
        
        )}
      </div>
    </div>
    </>
}