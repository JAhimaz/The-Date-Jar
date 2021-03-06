import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const { googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e : any) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/home");
    } catch (error : any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Button variant="primary" size="lg" onClick={e => handleGoogleSignIn(e)}>
        Log In
      </Button>
    </>
  );
};

export default Login;