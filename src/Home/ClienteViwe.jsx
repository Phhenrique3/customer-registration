import "./App.css";
import { useState, useRef } from "react";
import { findAll, insert, deleteById, update } from "./ClienteApi.js";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function ClienteViwe() {
  const [clientes, setClientes] = useState([]);
  const [editingClient, setEditingClient] = useState(null); // Novo estado para armazenar o cliente em edição
  const formRef = useRef(null);

  const inputNome = useRef();
  const inputRg = useRef();
  const inputEndereco = useRef();
  const inputTelefone = useRef();
  const inputCep = useRef();
  const inputEmail = useRef();

  const salva = async () => {
    const nome = inputNome.current.value.trim();
    const rg = parseInt(inputRg.current.value, 10);
    const endereco = inputEndereco.current.value.trim();
    const telefone = inputTelefone.current.value.trim();
    const cep = inputCep.current.value.trim();
    const email = inputEmail.current.value.trim();

    if (!nome || isNaN(rg) || !endereco || !telefone || !cep || !email) {
      alert("Por favor, preencha todos os campos obrigatórios! ");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido!");
      return;
    }

    try {
      if (editingClient) {
        // Se estiver editando, chama a função de update
        await update(
          editingClient.id,
          nome,
          rg,
          endereco,
          telefone,
          cep,
          email
        );
        alert(`Cliente ${nome} atualizado com sucesso!`);
        setEditingClient(null); // Limpa o estado de edição
      } else {
        // Se não estiver editando, insere um novo cliente
        await insert(nome, rg, endereco, telefone, cep, email);
        alert(`Cliente salvo com sucesso, ${nome}`);
      }
      limparcampo();
    } catch (error) {
      alert("Erro ao salvar/atualizar cliente: " + error.message);
    }
    await pesquisar();
  };

  const pesquisar = async () => {
    alert("Cadastro sendo consultados......");
    const dados = await findAll();
    setClientes(dados);
  };

  const excluir = async (id) => {
    await deleteById(id);
    alert(`cadastro excluido com sucesso`);
    pesquisar();
  };

  const edit = (client) => {
    inputNome.current.value = client.nome;
    inputRg.current.value = client.rg;
    inputEndereco.current.value = client.endereco;
    inputTelefone.current.value = client.telefone;
    inputCep.current.value = client.cep;
    inputEmail.current.value = client.email;
    setEditingClient(client);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const limparcampo = () => {
    inputNome.current.value = "";
    inputRg.current.value = "";
    inputEndereco.current.value = "";
    inputTelefone.current.value = "";
    inputCep.current.value = "";
    inputEmail.current.value = "";
    setEditingClient(null); // Limpa o estado de edição ao limpar campos
  };

  return (
    <div className="container">
      <div className="formulario" ref={formRef}>
        <h1>Realize seu cadastro aqui </h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputNome} />
        <input
          placeholder="RG (apenas números)"
          name="rg"
          type="text"
          maxLength="11"
          ref={inputRg}
        />
        <input
          placeholder="Telefone"
          name="telefone"
          type="text"
          maxLength="11"
          ref={inputTelefone}
        />
        <input
          placeholder="CEP"
          name="cep"
          type="text"
          maxLength="8"
          ref={inputCep}
        />
        <input placeholder="E-mail" name="text" type="email" ref={inputEmail} />
        <input
          placeholder="Endereço"
          name="endereco"
          type="text"
          ref={inputEndereco}
        />
        <button onClick={salva}>
          {editingClient ? "Atualizar" : "Salvar"}
        </button>
        <button onClick={pesquisar}>Consultar</button>
        {editingClient && (
          <button onClick={limparcampo}>Cancelar Edição</button>
        )}
      </div>

      {clientes.map((c, index) => (
        <div className="card" key={index}>
          <div>
            <p>
              Nome: <span>{c.nome}</span>
            </p>
            <p>
              RG: <span>{c.rg}</span>
            </p>
            <p>
              Endereço: <span>{c.endereco}</span>
            </p>
            <p>
              CEP: <span>{c.cep}</span>
            </p>
            <p>
              E-mail: <span>{c.email}</span>
            </p>
            <p>
              Telefone: <span>{c.telefone}</span>
            </p>
          </div>
          <div className="buton_delte">
            <button className="delete" onClick={() => excluir(c.id)}>
              <FaTrash /> Excluir
            </button>
            <button className="edit" onClick={() => edit(c)}>
              <FaEdit /> Editar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
