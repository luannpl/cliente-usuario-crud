import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
    <div className={styles.main}>
      <h1>Api do supabase</h1>
    <div className={styles.btns}>
    <Link className={styles.btn} to="/users">
        <button >Usuários</button>
      </Link>
      <Link className={styles.btn} to="/clientes">
        <button >Clientes</button>
      </Link>
      </div>
    </div>
      
    </>
  );
};

export default Home;
