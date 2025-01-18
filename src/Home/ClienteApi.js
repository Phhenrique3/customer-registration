const url =
  "https://api-cliente-dot-api-samples-423102.uc.r.appspot.com/api/clientes";

export async function findAll() {
  console.log("Executando findAll");

  const requestInfo = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 12119065",
    },
  };
  const responseHttp = await fetch(url, requestInfo);
  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    console.log("falha ao busca os clientes");
    throw new Error("falha ao busca os contatos");
  }
}

export async function insert(nome, rg, endereco, telefone, cep, email) {
  console.log(
    `Executando insert(${nome},${rg},${endereco},${telefone},${cep},${email})`
  );

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, insira um e-mail válido!");
    return; // Impede o envio do formulário
  }

  const requestInfo = {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 12119065",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      rg,
      endereco,
      telefone,
      cep,
      email,
    }),
  };

  const responseHttp = await fetch(url, requestInfo);
  if (responseHttp.ok) {
    return await responseHttp.json();
  } else if (responseHttp.status === 400) {
    const error = await responseHttp.json({ email });
    console.log(error);
    throw new Error(JSON.stringify(error));
  } else {
    console.log("falha ao tenta inserir os clientes");
    throw new Error("falha ao tenta inserir os clientes");
  }
}

export async function deleteById(id) {
  console.log(`deletando os contatos(${id})`);

  const requestInfo = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: "Bearer 12119065",
    },
  };
  const resposeHttp = await fetch(url + "/" + id, requestInfo);

  if (resposeHttp.ok) {
    return await resposeHttp.json();
  } else {
    console.log("falha ao buscar os contatos");
    throw new Error("falha ao tentar busca contato");
  }
}
