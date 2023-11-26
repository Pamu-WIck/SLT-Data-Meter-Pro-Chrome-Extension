import "./styles/App.css";
import MainPanel from "./components/MainPanel.tsx";


function App() {

  return (
    <>
      <div className="w-max min-w-[500px] bg-background" >
          <MainPanel/>
      </div>
    </>
  );
}

export default App;
