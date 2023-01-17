import Button from "./components/Button"
import "./sass/App.scss"
import { CiFaceFrown } from "react-icons/ci";
import { CiFaceSmile } from "react-icons/ci";


const App = () => {
    return (
        <>
            <h1>Hola desde componente APP</h1>
            <div className="btn__container">
                <Button icon={<CiFaceFrown />} handleClick={()=>alert("pepe")} />
                <Button icon={<CiFaceSmile/>} />
            </div>
        </>
    )
}
export { App }