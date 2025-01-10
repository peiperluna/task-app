import React from "react";
import "./TaskForm.css";
import Tag from "./Tag";

export default function TaskForm({ setTasks }) {
  const [taskData, setTaskData] = React.useState({
    task: "",
    status: "todo", //초기값,
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target; //target 객체 안의 name, value 가져옴
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskData);
    setTasks((prev) => {
      return [...prev, taskData];
    });
    //TaskData 초기화
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }

    console.log(taskData.tags);
  };

  const checkTag = (tag) => {
    //tag가 현재 선택한 태그들에 있으면 true 없으면 false
    return taskData.tags.some((item) => item === tag);
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input name="task" onChange={handleChange} value={taskData.task} type="text" className="task_input" placeholder="할일 다 적어바라" />

        <div className="task_form_bottom_line">
          <div>
            <Tag tagName="HTML" selectTag={selectTag} selected={checkTag("HTML")} />
            <Tag tagName="CSS" selectTag={selectTag} selected={checkTag("CSS")} />
            <Tag tagName="JavaScript" selectTag={selectTag} selected={checkTag("JavaScript")} />
            <Tag tagName="REACT" selectTag={selectTag} selected={checkTag("REACT")} />
          </div>
          <div>
            <select className="task_status" name="status" onChange={handleChange} value={taskData.status}>
              <option value="todo">할일</option>
              <option value="doing">진행중</option>
              <option value="done">완료</option>
            </select>
            <button type="submit" className="task_submit">
              + 추가
            </button>
          </div>
        </div>
      </form>
    </header>
  );
}
