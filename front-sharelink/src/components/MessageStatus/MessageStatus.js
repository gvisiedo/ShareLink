
import { Link } from 'react-router-dom';
import './MessageStatus.css'

const MessageStatus = ({ message, navigate }) => {


    return (
        <div className="bg">
            <section className="fg">
                <h2>¡Felicidades!</h2>
                <p>{message}</p>
                <footer>
                    <Link to={navigate}><button>volver</button></Link>

                </footer>
            </section>
        </div>

    )
}

export default MessageStatus;