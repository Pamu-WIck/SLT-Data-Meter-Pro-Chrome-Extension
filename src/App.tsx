import "./styles/App.css";
import Login from "./components/Login.tsx";
import MainPanel from "./components/MainPanel.tsx";

function App() {

    const token = localStorage.getItem("token");
    // console.log(token);

  return (
    <>
      <div className="w-max min-w-[500px] bg-background" >
            {token ? <MainPanel /> : <Login />}
      </div>
    </>
  );
}

export default App;
