import logoApp from "../../assets/images/logo_png.png"
import "./AqueductoLogo.css"
import config from "../../config/Config.js"

const AqueductLogo = () =>{
    return (
        <div className="Aqueduct-logo">
            <div className="Aqueduct-logo-circle">
                <img src={logoApp} width={180}></img>
            </div>
            <div className="Aqueduct-name">
                <p><b>{config.title_System}<br></br>{config.name_factory}</b></p>
            </div>
        </div>
    )
}

export default AqueductLogo