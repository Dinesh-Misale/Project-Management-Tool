// App.js
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "./App.css";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Task 1" },
    "task-2": { id: "task-2", content: "Task 2" },
    "task-3": { id: "task-3", content: "Task 3" },
    "task-4": { id: "task-4", content: "Task 4" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  columnOrder: ["column-1"],
};

const Board = () => {
  const [data, setData] = useState<any>(initialData);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return; // dropped outside the list
    }

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const column = data.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
    } else {
      // Move between columns
      const sourceColumn = data.columns[source.droppableId];
      const destinationColumn = data.columns[destination.droppableId];

      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      sourceTaskIds.splice(source.index, 1);
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const destinationTaskIds = Array.from(destinationColumn.taskIds);
      destinationTaskIds.splice(destination.index, 0, draggableId);
      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newSourceColumn.id]: newSourceColumn,
          [newDestinationColumn.id]: newDestinationColumn,
        },
      };

      setData(newData);
    }
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId: any) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId: any) => data.tasks[taskId]);

          return (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="column"
                >
                  <h3>{column.title}</h3>
                  {tasks.map((task: any, index: any) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="task"
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default Board;
