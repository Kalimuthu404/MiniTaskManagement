import { Button, Group } from "@mantine/core";
import React from "react";

interface FilterBarProps {
  filter: "all" | "completed" | "pending";
  setFilter: React.Dispatch<
    React.SetStateAction<"all" | "completed" | "pending">
  >;
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter }) => {
  return (
    <Group gap="xs" mt="md" mb="md">
      <Button
        variant={filter === "all" ? "filled" : "light"}
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "completed" ? "filled" : "light"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </Button>
      <Button
        variant={filter === "pending" ? "filled" : "light"}
        onClick={() => setFilter("pending")}
      >
        Pending
      </Button>
    </Group>
  );
};

export default FilterBar;
