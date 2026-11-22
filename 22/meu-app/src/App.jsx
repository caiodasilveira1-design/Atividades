
import { useState } from 'react';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [input, setInput] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");

  // Adicionar tarefa
  const adicionarTarefa = () => {
    if (input.trim()) {
      const novaTarefa = {
        id: Date.now(),
        texto: input,
        concluida: false
      };

      setTarefas([...tarefas, novaTarefa]);
      setInput("");
    }
  };

  // Remover tarefa
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  // Iniciar edição
  const iniciarEdicao = (tarefa) => {
    setEditandoId(tarefa.id);
    setTextoEditado(tarefa.texto);
  };

  // Salvar edição
  const salvarEdicao = (id) => {
    if (textoEditado.trim()) {
      setTarefas(
        tarefas.map(tarefa =>
          tarefa.id === id
            ? { ...tarefa, texto: textoEditado.trim() }
            : tarefa
        )
      );

      setEditandoId(null);
      setTextoEditado("");
    }
  };

  // Cancelar edição
  const cancelarEdicao = () => {
    setEditandoId(null);
    setTextoEditado("");
  };

  // Marcar ou desmarcar tarefa
  const alternarConcluida = (id) => {
    setTarefas(
      tarefas.map(tarefa =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  };

  return (
    <div>
      <h1>Lista de Tarefas</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite uma tarefa"
      />

      <button onClick={adicionarTarefa}>
        Adicionar
      </button>

      <h3>Total de tarefas: {tarefas.length}</h3>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>

            {editandoId === tarefa.id ? (
              <>
                <input
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                />

                <button onClick={() => salvarEdicao(tarefa.id)}>
                  Salvar
                </button>

                <button onClick={cancelarEdicao}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => alternarConcluida(tarefa.id)}
                />

                <span
                  style={{
                    textDecoration: tarefa.concluida
                      ? 'line-through'
                      : 'none'
                  }}
                >
                  {tarefa.texto}
                </span>

                <button onClick={() => iniciarEdicao(tarefa)}>
                  Editar
                </button>

                <button onClick={() => removerTarefa(tarefa.id)}>
                  Remover
                </button>
              </>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
