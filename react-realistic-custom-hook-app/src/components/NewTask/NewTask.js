import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttpRequest from "../../hooks/use-http-request";

const BASE_URL = "https://react-http-6205b-default-rtdb.firebaseio.com";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttpRequest();

  const createdTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: `${BASE_URL}/tasks.json`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      createdTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
