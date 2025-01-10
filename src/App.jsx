import "./App.css";
import TaskColumn from "./components/TaskColumn";
import TaskForm from "./components/TaskForm";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import { useState } from "react";

const saveTasks = localStorage.getItem("tasks");
//처음 앱 시작시 할일들을 로컬스토리지에서 가져옴

function App() {
  const [tasks, setTasks] = useState([JSON.parse(saveTasks)] || []);
  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks); //선택한 할일이 삭제되어 업데이트
  };
  //할일들이 바뀔때마다 로컬스토리지에 저장함
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <TaskForm setTasks={setTasks} />
      <main className="app_main">
        <TaskColumn title="할 일" icon={todoIcon} tasks={tasks} status="todo" handleDelete={handleDelete} />
        <TaskColumn title="진행중" icon={doingIcon} tasks={tasks} status="doing" handleDelete={handleDelete} />
        <TaskColumn title="완 료" icon={doneIcon} tasks={tasks} status="done" handleDelete={handleDelete} />
      </main>
    </div>
  );
}

export default App;
