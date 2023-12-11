import { useEffect } from "react";
import { useAuthStore, useForm } from "../../hooks";
import "./login.css";
import Swal from "sweetalert2";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  signinName: "",
  signinEmail: "",
  signinPassword: "",
  signinConfirmPassword: "",
};
export const LoginPage = () => {
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const {
    signinName,
    signinEmail,
    signinPassword,
    signinConfirmPassword,
    onInputChange: onSigninInputChange,
  } = useForm(registerFormFields);

  const {startLogin, errorMessage, startRegister} = useAuthStore();

  useEffect(()=>{
    if(errorMessage!== undefined){
      Swal.fire('Error en la utenticación', errorMessage, 'error');
    }
  },[errorMessage])

  const handleLoginSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    startLogin({ email:loginEmail, password:loginPassword });
  };

  const handleSigninSubmit = (event: React.FormEvent<any>) => {
    event.preventDefault();
    if(signinPassword !== signinConfirmPassword){
      Swal.fire('Error', 'Contraseñas no son iguales', 'error');
      return;
    }
    startRegister({name:signinName,password:signinPassword,email:signinEmail});
    console.log({
      signinName,
      signinEmail,
      signinConfirmPassword,
      signinPassword,
    });
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleSigninSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="signinName"
                value={signinName}
                onChange={onSigninInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="signinEmail"
                value={signinEmail}
                onChange={onSigninInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="signinPassword"
                value={signinPassword}
                onChange={onSigninInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="signinConfirmPassword"
                value={signinConfirmPassword}
                onChange={onSigninInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
