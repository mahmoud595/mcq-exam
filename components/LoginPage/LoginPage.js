import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Grid, Typography, TextField, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useRouter } from "next/router";

const Login = styled(Grid)(({ theme }) => ({
  background: "#fff",
  borderRadius: "10px",
  padding: "5.5em",
  display: "flex",
  marginTop: 30,
  boxShadow: "12.8811px 7.11487px 75.0136px rgba(134, 134, 134, 0.1)",
  flexDirection: "column",

  "& .loginTitle": {
    textAlign: "center",
    fontWeight: 600,
    marginBottom: 20,
  },
  "& .textField": {
    marginTop: 20,
    "& .MuiOutlinedInput-input": {
      fontSize: "1.2em",
    },
    "& .MuiFormHelperText-root": {
      fontSize: "1em",
      fontWeight: 600,
      textTransform: "capitalize",
      marginTop: 6,
    },
  },
  "& .btn": {
    borderRadius: 20,
    marginTop: 20,
    background: `${theme.palette.primary.main} !important`,
    color: "#fff",
    fontSize: "1.2em",
  },
  "& .form": {
    display: "flex",
    flexDirection: "column",
  },
}));
const defaultValues = {
  name: "",
  email: "",
  password: "",
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const LoginPage = () => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /*check before submitting if there is no values in the input fields if not it shows error that this field is required
  or if it is email it should be valid and if no errors it redirect user to exam page*/

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newErrors = { ...errors };
    for (let field of Object.keys(values)) {
      if (!values[field]) {
        newErrors[field] = `${field} is required`;
      } else if (field === "email" && values[field]) {
        const email = validateEmail(values[field]);
        if (email) {
          newErrors[field] = "";
        } else {
          newErrors[field] = "Enter a valid email";
        }
      } else {
        newErrors[field] = "";
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).every((key) => !newErrors[key])) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        router.push("/exam");
      }, 2000);
    }
  };
  const changeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Login item>
      <Typography variant="h3" className="loginTitle">
        Login
      </Typography>
      <Box component="form" autoComplete="off" className="form" noValidate>
        <TextField
          error={!!errors["name"]}
          label="Name"
          type="text"
          className="textField"
          name="name"
          onChange={changeHandler}
          onBlur={changeHandler}
          helperText={errors["name"]}
        />
        <TextField
          error={!!errors["email"]}
          label="Email"
          type="email"
          className="textField"
          name="email"
          onChange={changeHandler}
          onBlur={changeHandler}
          helperText={errors["email"]}
        />

        <TextField
          error={!!errors["password"]}
          label="Password"
          type="password"
          className="textField"
          name="password"
          onChange={changeHandler}
          onBlur={changeHandler}
          helperText={errors["password"]}
        />
        <LoadingButton
          className="btn"
          type="submit"
          loading={loading}
          loadingPosition="start"
          onClick={onSubmitHandler}
        >
          Login
        </LoadingButton>
      </Box>
    </Login>
  );
};
