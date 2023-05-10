import { Container, Row, Col, Button } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const Footer = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      <footer className="text-center text-lg-start bg-dark text-muted">
        <Container>
          {isSmallScreen ? (
            <>
              <Col>
                <div className="text-center p-2">
                  © 2023 Copyright: Reserved
                </div>
                <section>
                  <a
                    className="btn btn-outline-light btn-floating m-1"
                    role="button"
                  >
                    <i className="bi bi-twitter"></i>
                  </a>

                  <a
                    className="btn btn-outline-light btn-floating m-1"
                    role="button"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>

                  <a
                    className="btn btn-outline-light btn-floating m-1"
                    role="button"
                  >
                    <i className="bi bi-youtube"></i>
                  </a>
                </section>

                <div>
                  <Button variant="link">Contact Us</Button>
                  <Button variant="link">Privacy Police</Button>
                  <Button variant="link">Help</Button>
                </div>
              </Col>
            </>
          ) : (
            <>
              <Row justify="space-between">
                <Col>
                  <div className="text-center p-2">
                    © 2023 Copyright: Reserved
                  </div>
                </Col>
                <Col>
                  <section>
                    <a
                      className="btn btn-outline-light btn-floating m-1"
                      role="button"
                    >
                      <i className="bi bi-twitter"></i>
                    </a>

                    <a
                      className="btn btn-outline-light btn-floating m-1"
                      role="button"
                    >
                      <i className="bi bi-facebook"></i>
                    </a>

                    <a
                      className="btn btn-outline-light btn-floating m-1"
                      role="button"
                    >
                      <i className="bi bi-youtube"></i>
                    </a>
                  </section>
                </Col>

                <Col>
                  <Row>
                    <Button variant="link">Contact Us</Button>
                    <Button variant="link">Privacy Police</Button>
                    <Button variant="link">Help</Button>
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </footer>
    </>
  );
};

export default Footer;
