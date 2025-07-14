import { useCallback, useMemo, useState } from "react";
import { Card, Text, Group, Button, Checkbox } from "@mantine/core";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import {
  deleteTask,
  setEditingTask,
  toggleComplete,
  reorderTasks,
} from "../features/tasks/taskSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import FilterBar from "./FilterBar";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const reordered = Array.from(filteredTasks);
      const [removed] = reordered.splice(result.source.index, 1);
      reordered.splice(result.destination.index, 0, removed);

      dispatch(reorderTasks(reordered));
    },
    [filteredTasks, dispatch]
  );

  return (
    <div>
      <FilterBar filter={filter} setFilter={setFilter} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTasks.map((task, index) => (
                <Draggable draggableId={task.id} index={index} key={task.id}>
                  {(provided) => (
                    <Card
                      withBorder
                      shadow="sm"
                      my="sm"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Group justify="space-between">
                        <Checkbox
                          checked={task.completed}
                          onChange={() => dispatch(toggleComplete(task.id))}
                          label={<Text fw={500}>{task.title}</Text>}
                        />
                        <Group>
                          <Button
                            size="xs"
                            onClick={() => dispatch(setEditingTask(task))}
                          >
                            Edit
                          </Button>
                          <Button
                            color="red"
                            size="xs"
                            onClick={() => dispatch(deleteTask(task.id))}
                          >
                            Delete
                          </Button>
                        </Group>
                      </Group>
                      <Text size="sm" c="dimmed">
                        {task.description}
                      </Text>
                      <Text size="xs" c="gray">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </Text>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
