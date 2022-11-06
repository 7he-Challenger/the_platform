import { Spinner } from "react-bootstrap";

function LoadingSection() {
  return (
    <div className="section-loader">
      <Spinner animation="border" />
    </div>
  );
}

export default LoadingSection;