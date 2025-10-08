import { Container, Row, Col, Button, Card } from "react-bootstrap";
import  { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate(); 

    return (
         <Container
         fluid
         className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center"
       >
        <Card className="p-5 shadow-lg border-0" style={{ maxWidth: '500px' }}>
            <h1 className="text-secondary mb-5">Sistema de reservas</h1>
            <p>Bienvenido al sistema de reservas. Selecciona tu tipo de acceso</p>

            <Row className="g-3">
                <Col>
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-100"
                        onClick={() => navigate('/login-user')}
                    >
                        soy usuario
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="w-100"
                        onClick={() => navigate('/login-admin')}
                    >
                        soy administrador
                    </Button>
                </Col>
            </Row>
             <div className="mt-4 text-muted" style={{ fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} Sistema de reservas.
             </div>


          </Card>
       </Container>
    )
}


export default LandingPage