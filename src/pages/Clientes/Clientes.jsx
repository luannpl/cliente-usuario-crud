import { useState } from "react";
import styles from "./Clientes.module.css";
const Clientes = () => {
  const [modo, setModo] = useState("home");
  const [cliente_id, setCliente_id] = useState("");
  const [cpf, setCpf] = useState("");
  const [nome_cliente, setNome_cliente] = useState("");
  const [email_cliente, setEmail_cliente] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])

  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log(cliente_id, cpf, nome_cliente, email_cliente, endereco, telefone)

    const url = "https://fbjqsxldnbfwccwvlscl.supabase.co/rest/v1/cliente"
    const config = {
      method: "POST",
      body: JSON.stringify({
        cliente_id,
        cpf,
        nome_cliente,
        email_cliente,
        endereco,
        telefone,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZianFzeGxkbmJmd2Njd3Zsc2NsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQwMDU5OSwiZXhwIjoyMDU0OTc2NTk5fQ.WjgSSTKtgTL33Gv3pnJ0w75KosQnQaH0osE8hwz72ik",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZianFzeGxkbmJmd2Njd3Zsc2NsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQwMDU5OSwiZXhwIjoyMDU0OTc2NTk5fQ.WjgSSTKtgTL33Gv3pnJ0w75KosQnQaH0osE8hwz72ik",
      },   
    };

    try{
      const response = await fetch(url, config);
      if(!response.ok){
        throw new Error("Erro ao cadastrar usuário "+ response.statusText)
      }
      setMensagem("Cliente cadastrado com sucesso")
      setCliente_id("")
      setCpf("")
      setNome_cliente("")
      setEmail_cliente("")
      setEndereco("")
      setTelefone("")
      
    }catch(error){
      console.log(error)
      setMensagem("Erro ao cadastar cliente")
    }
  }

  const handleData = async () => {
    setModo("listar")
    setLoading(true)
    const url = "https://fbjqsxldnbfwccwvlscl.supabase.co/rest/v1/cliente"
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZianFzeGxkbmJmd2Njd3Zsc2NsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQwMDU5OSwiZXhwIjoyMDU0OTc2NTk5fQ.WjgSSTKtgTL33Gv3pnJ0w75KosQnQaH0osE8hwz72ik",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZianFzeGxkbmJmd2Njd3Zsc2NsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQwMDU5OSwiZXhwIjoyMDU0OTc2NTk5fQ.WjgSSTKtgTL33Gv3pnJ0w75KosQnQaH0osE8hwz72ik",
      },  
    };

    try{
      const response = await fetch(url, config)
      const dados = await response.json()
      setData(dados)
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  const voltar = () =>{
    location.reload()
  }

  return (
    <>
    {modo === "home" && (
      <>
      <div className={styles.btnHome}>
      <button onClick={() => setModo("cadastro")}>Cadastrar Cliente</button>
      <button onClick={handleData}>Listar Clientes</button>
      </div>
      </>
    )}

    {modo === "cadastro" &&(
      <>
      <h1>Cadastro de Clientes</h1>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <input type="number" name="cliente_id" id="cliente_id" placeholder="ID" value={cliente_id} onChange={(e) => setCliente_id(e.target.value)}/>
        <input type="text" name="cpf" id="cpf" placeholder="Digite seu cpf" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
        <input type="text" name="nome_cliente" id="nome_cliente" placeholder="Digite seu nome" value={nome_cliente} onChange={(e) => setNome_cliente(e.target.value)}/>
        <input type="email" name="email_cliente" id="email_cliente" placeholder="Digite seu email" value={email_cliente} onChange={(e) => setEmail_cliente(e.target.value)}/>
        <input type="text" name="endereco" id="endereco" placeholder="Digite sua cidade" value={endereco} onChange={(e) => setEndereco(e.target.value)}/>
        <input type="text" name="telefone" id="telefone" placeholder="Digite seu telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
        <div className={styles.btns}>
        <button onClick={voltar} className={styles.btn}>Voltar</button>
        <button type="submit" className={styles.btn}>Cadastrar Cliente</button>
        </div>
      </form>
      {mensagem && <p>{mensagem}</p>}
      </>
    )}

    {modo === "listar" && loading? (
      <>
      <div class={styles.customloader}></div>
      </>
    ): modo === "listar" && !loading ?(
      <>
        <table>
          <thead>
            <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>CIDADE</th>
            <th>TELEFONE</th>
            </tr>
          </thead>
        <tbody>
      {data.map((dados) => (
          <tr key={dados.cliente_id}>
            <td>{dados.cliente_id}</td>
            <td>{dados.nome_cliente}</td>
            <td>{dados.email_cliente}</td>
            <td>{dados.endereco}</td>
            <td>{dados.telefone}</td>
          </tr>
      ))}
        </tbody>
        </table>
      </>
    ): null} 

      
    </>
  );
};

export default Clientes;
