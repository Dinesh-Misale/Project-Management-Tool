import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";

interface TaskStateProps {
  type: string;
  count: number;
}

const TaskStateCard = ({ type, count }: TaskStateProps) => {
  const RenderIcon = () => {
    switch (type) {
      case "done":
        return (
          <CheckCircleIcon
            fontSize="medium"
            className="iconStyle"
            sx={{
              color: count > 0 ? "#279EFF" : "",
              background: count > 0 ? "#AED2FF" : "",
            }}
          />
        );

      case "update":
        return (
          <EditIcon
            fontSize="medium"
            className="iconStyle"
            sx={{
              color: count > 0 ? "#9D44C0" : "",
              background: count > 0 ? "#9D76C1" : "",
            }}
          />
        );

      case "create":
        return (
          <AddCircleIcon
            fontSize="medium"
            className="iconStyle"
            sx={{
              color: count > 0 ? "#35A29F" : "",
              background: count > 0 ? "#F4EEEE" : "",
            }}
          />
        );

      case "due-date":
        return (
          <CalendarMonthIcon
            fontSize="medium"
            className="iconStyle"
            sx={{
              color: count > 0 ? "#BB2525" : "",
              background: count > 0 ? "#FF6969" : "",
            }}
          />
        );

      default:
        console.log("invalid type");
        break;
    }
  };

  const renderText = () => {
    switch (type) {
      case "done":
        return "done";

      case "update":
        return "updated";

      case "create":
        return "created";

      case "due-date":
        return "due";

      default:
        console.log("invalid type");
        break;
    }
  };
  return (
    <Box className="taskStateContainer">
      <Box className="taskicon">{RenderIcon()}</Box>
      <Box className="tasktext">
        <p style={{ margin: 0 }}>
          {count} {renderText()}
        </p>
        <p style={{ margin: 0 }}>in this sprint</p>
      </Box>
    </Box>
  );
};

export default TaskStateCard;
