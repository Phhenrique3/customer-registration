import "./App.css";
import { useState, useRef } from "react";
import { findAll, insert, deleteById } from "./ClienteApi.js";

export default function ClienteViwe() {
  const [clientes, setClientes] = useState([]);

  const inputNome = useRef();
  const inputRg = useRef();
  const inputEndereco = useRef();
  const inputTelefone = useRef();
  const inputCep = useRef();
  const inputEmail = useRef();

  const salva = async () => {
    const nome = inputNome.current.value.trim("nome");
    const rg = parseInt(inputRg.current.value, 10);
    const endereco = inputEndereco.current.value.trim("edereco");
    const telefone = inputTelefone.current.value.trim("telefone");
    const cep = inputCep.current.value.trim("cep");
    const email = inputEmail.current.value.trim("email");

    if (!nome || isNaN(rg) || !endereco || !telefone || !cep || !email) {
      alert("Por favor, preencha todos os campos obrigatórios! ");
      return;
    }

    // Validações

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido!");
      return;
    }

    // Limpar campos após salvar
    try {
      await insert(nome, rg, endereco, telefone, cep, email);
      alert(`Cliente salvo com sucesso, ${nome}`);
      limparcampo();
    } catch (error) {
      alert("Erro ao salvar cliente: " + error.message);
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

  const limparcampo = () => {
    inputNome.current.value = "";
    inputRg.current.value = "";
    inputEndereco.current.value = "";
    inputTelefone.current.value = "";
    inputCep.current.value = "";
    inputEmail.current.value = "";
  };

  return (
    <div className="container">
      <div className="formulario">
        <h1>Realizar seu cadastro aqui </h1>
        <input placeholder="Nome" name="nome" type="text" ref={inputNome} />
        <input
          placeholder="RG (apenas números)"
          name="rg"
          type="number"
          ref={inputRg}
        />
        <input
          placeholder="Telefone"
          name="telefone"
          type="text"
          ref={inputTelefone}
        />
        <input placeholder="CEP" name="cep" type="text" ref={inputCep} />
        <input placeholder="E-mail" name="text" type="email" ref={inputEmail} />
        <input
          placeholder="Endereço"
          name="endereco"
          type="text"
          ref={inputEndereco}
        />
        <button onClick={salva}>Salvar</button>
        <button onClick={pesquisar}>Consultar</button>
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
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
