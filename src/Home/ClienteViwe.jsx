import "./App.css";
import { useState, useRef } from "react";
import { findAll, insert, deleteById} from "./ClienteApi.js";

export default function ClienteViwe() {
  const [clientes, setClientes] = useState([]);

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

    // Validações
    if (!nome || isNaN(rg) || !endereco || !telefone || !cep || !email) {
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido!");
      return;
    }
    
    alert("Cliente salvo com sucesso");

    // Limpar campos após salvar
    try {
      await insert(nome, rg, endereco, telefone, cep, email);
      alert("Cliente salvo com sucesso");
      await pesquisar(); // Atualizar a lista de clientes após salvar
    } catch (error) {
      alert("Erro ao salvar cliente: " + error.message);
    }
    await pesquisar();
  };

  const pesquisar = async () => {
    console.log("Consultando os clientes");
    const dados = await findAll();
    setClientes(dados);
  };

  const excluir = async (id)=>{
    console.log("excluindo com sucesso,",id)
    await deleteById(id)
    alert("cadastro excluido com sucesso")
    pesquisar()
  }

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
          <button className="delete" onClick={() => excluir(c.id)}>Excluir</button>
          </div>
        </div>
      ))}
    </div>
  );
}
