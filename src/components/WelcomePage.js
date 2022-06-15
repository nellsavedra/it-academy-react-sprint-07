import { Link } from "react-router-dom";

const WelcomePage = () => {
	return (
		<>
		<h1>Bienvenido a la aplicación de presupuestos</h1>
		<Link to="app">Entrar</Link>
		</>
	);
}

export default WelcomePage;