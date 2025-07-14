import { memo, useCallback, useEffect, useState } from "react";
import { TextInput, Textarea, Button, Stack, Paper, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addTask,
  clearEditingTask,
  updateTask,
} from "../features/tasks/taskSlice";
import { v4 as uuidv4 } from "uuid";

const TaskForm = () => {
  const dispatch = useAppDispatch();
  const editingTask = useAppSelector((state) => state.tasks.editingTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [errors, setErrors] = useState<boolean>(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const handleSubmit = useCallback(() => {
    if (!title || !dueDate) {
      setErrors(true);
      return;
    }
    setErrors(false);
    const taskPayload = {
      id: editingTask ? editingTask.id : uuidv4(),
      title,
      description,
      dueDate: new Date(dueDate).toISOString(),
      completed: editingTask ? editingTask.completed : false,
    };
    if (editingTask) {
      dispatch(updateTask(taskPayload));
      dispatch(clearEditingTask());
    } else {
      dispatch(addTask(taskPayload));
    }

    setTitle("");
    setDescription("");
    setDueDate(null);
  }, [title, description, dueDate, editingTask, dispatch]);

  return (
    <Paper
      withBorder
      shadow="sm"
      p="lg"
      style={{
        flex: 2,
      }}
    >
      <Stack gap="xs" my="md">
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          required
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />
        <DatePicker value={dueDate} onChange={setDueDate} />
        {errors && (
          <Text style={{ color: "red" }}>Please fill title and due date.</Text>
        )}
        <Button onClick={handleSubmit}>
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default memo(TaskForm);
