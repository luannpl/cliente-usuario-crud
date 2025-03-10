import { useState } from "react";
import styles from "./Usuarios.module.css";

const Usuarios = () => {
  const [text, setText] = useState("home");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateNascimento, setDateNascimento] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const voltar = () => {
    location.reload();
  };

  const cadastrarUsuario = () => {
    setText("cadastro");
  };

  const listarUsuario = async () => {
    setText("listar");
    setLoading(true);
    const url = "https://fbjqsxldnbfwccwvlscl.supabase.co/rest/v1/user";
    const config = {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZianFzeGxkbmJmd2Njd3Zsc2NsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQwMDU5OSwiZXhwIjoyMDU0OTc2NTk5fQ.WjgSSTKtgTL33Gv3pnJ0w75KosQnQaH0osE8hwz72ik",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZianFzeGxkbmJmd2Njd3Zsc2NsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQwMDU5OSwiZXhwIjoyMDU0OTc2NTk5fQ.WjgSSTKtgTL33Gv3pnJ0w75KosQnQaH0osE8hwz72ik",
      },
    };

    try {
      const response = await fetch(url, config);
      const dado = await response.json();
      console.log(dado);
      setData(dado);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formCadastroUser = async (e) => {
    e.preventDefault();
    console.log(id, name, email, dateNascimento);
    const url = "https://fbjqsxldnbfwccwvlscl.supabase.co/rest/v1/user";
    const configPost = {
      method: "POST",
      body: JSON.stringify({
        id: id,
        name: name,
        email: email,
        date_nascimento: dateNascimento,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZianFzeGxkbmJmd2Njd3Zsc2NsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQwMDU5OSwiZXhwIjoyMDU0OTc2NTk5fQ.WjgSSTKtgTL33Gv3pnJ0w75KosQnQaH0osE8hwz72ik",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZianFzeGxkbmJmd2Njd3Zsc2NsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTQwMDU5OSwiZXhwIjoyMDU0OTc2NTk5fQ.WjgSSTKtgTL33Gv3pnJ0w75KosQnQaH0osE8hwz72ik",
      },
    };

    try {
      const response = await fetch(url, configPost);
      if (!response.ok) {
        throw new Error(`Erro ao cadastrar: ${response.statusText}`);
      }
      setMensagem("Usuário cadastrado com sucesso");
      setId("");
      setName("");
      setEmail("");
      setDateNascimento("");
    } catch (error) {
      console.log(error);
      setMensagem("Erro ao cadastra usuário");
    }
  };

  return (
    <>
      {text === "home" && (
        <>
        <div className={styles.btnHome}>
          <button onClick={cadastrarUsuario}>Cadastrar Usuario</button>
          <button onClick={listarUsuario}>Listar Usuario</button>
        </div>
        </>
      )}

      {text === "cadastro" && (
        <>
          <h1>Cadastrar Usuário</h1>
          <form className={styles.formulario} onSubmit={formCadastroUser}>
            <input
              type="number"
              name="id"
              id="id"
              placeholder="Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="date"
              name="date_nascimento"
              id="date_nascimento"
              value={dateNascimento}
              onChange={(e) => setDateNascimento(e.target.value)}
            />
            <div className={styles.btns}>
              <button className={styles.btn} onClick={voltar}>
                Voltar
              </button>
              <button className={styles.btn} type="submit">
                Cadastrar
              </button>
            </div>
          </form>
          {mensagem && <p>{mensagem}</p>}
        </>
      )}

      {text === "listar" && loading ? (
        <>
          <div class={styles.customloader}></div>
        </>
      ) : text === "listar" && !loading ? (
        <>
        <h1>Lista de usuários</h1>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
              </tr>
            </thead>
            <tbody>
                {data.map((dados) =>(
                  <tr key={dados.id}>
                  <td>{dados.id}</td>
                  <td>{dados.name}</td>
                  <td>{dados.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          </>
      ) : null}
    </>
  );
};

export default Usuarios;
