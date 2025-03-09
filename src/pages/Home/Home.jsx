import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link to="/users">
        <button>Usuários</button>
      </Link>
      <Link to="/clientes">
        <button>Clientes</button>
      </Link>
    </>
  );
};

export default Home;
