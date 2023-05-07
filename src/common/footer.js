const Footer = () => {
  return (
    <>
      <div>
        <footer className="text-center text-lg-start bg-dark text-muted">
          <section>
            <a className="btn btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-twitter"></i>
            </a>

            <a className="btn btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-facebook"></i>
            </a>

            <a className="btn btn-outline-light btn-floating m-1" role="button">
              <i className="bi bi-youtube"></i>
            </a>
          </section>
          <div className="text-center p-2">© 2023 Copyright: Reserved</div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
