import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    const title = "Jady";
    const url = "https://app.rocketseat.com.br/journey-game/gostack-11";
    const techs = "React, Javascript, NodeJs";
    const data = {
      title,
      url,
      techs,
    };

    api.post("repositories", data).then((response) => {
      setRepositories([...repositories, response.data]);
    });
  }
  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  useEffect(() => {
    api.get("repositories").then((result) => {
      setRepositories(result.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository, index) => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button
                onClick={() => handleRemoveRepository(repositories[index].id)}
              >
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
