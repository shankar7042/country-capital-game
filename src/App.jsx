import Game from "./Game";
import { DATA } from "./data";

function App() {
  return (
    <div className="container mx-auto max-w-3xl">
      <Game data={DATA} />
    </div>
  );
}

export default App;
