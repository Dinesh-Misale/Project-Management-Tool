import "./App.css";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    color: "red",
  },
});
function App() {
  const classes = useStyles();
  return <div className="App"></div>;
}

export default App;
