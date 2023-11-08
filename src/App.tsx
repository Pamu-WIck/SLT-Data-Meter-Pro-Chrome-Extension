import "./styles/App.css";
import MainPanel from "./components/MainPanel.tsx";

function App() {
  return (
    <>
      <div className="w-max min-w-[500px] bg-background px-6 py-4" >
        <MainPanel />
      </div>
    </>
  );
}

export default App;
