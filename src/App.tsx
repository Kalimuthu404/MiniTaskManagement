import { useState, useEffect } from "react";
import { Title, Text, Loader } from "@mantine/core";
import { fetchQuote } from "./utils/api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TasksList";

function App() {
  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getQuote = async () => {
      setLoading(true);
      const q = await fetchQuote();
      setQuote(q);
      setLoading(false);
    };
    getQuote();
  }, []);

  return (
    <>
      <header className="header">
        <Title order={2}>Mini Task Manager</Title>
        {loading ? (
          <Loader color="blue" size={20} />
        ) : (
          <Text size="14px">{quote}</Text>
        )}
      </header>
      <section className="tasks">
        <div className="task-form-wrapper">
          <TaskForm />
        </div>
        <div className="task-list-wrapper">
          <TaskList />
        </div>
      </section>
    </>
  );
}

export default App;
