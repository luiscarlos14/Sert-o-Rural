import React, { useState } from "react";

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import H5 from "@material-tailwind/react/Heading5";
import Checkbox from "@material-tailwind/react/Checkbox";
import Button from "@material-tailwind/react/Button";
import Page from "components/login/Page";
import Container from "components/login/Container";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";

import { makeStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { UseAuth } from "../hooks/auth";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
  sizeLabel: {
    width: "25ch",
  },
}));

export default function Login() {
  const { login } = UseAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();

  function logar() {
    return login(email, password);
  }

  return (
    <Page>
      <Container>
        <Card>
          <CardHeader color="teal">
            <H5 color="white" style={{ marginBottom: 0 }}>
              Login
            </H5>
          </CardHeader>

          <CardBody>
            <div className="mb-12 px-4 bg-bb">
              <div className={classes.margin}>
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <MailOutlineIcon style={{ color: "#008080" }} />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.sizeLabel}
                      id="input-with-icon-grid"
                      label="Digite seu email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item>
                    <LockIcon style={{ color: "#008080" }} />
                  </Grid>
                  <Grid item>
                    <TextField
                      className={classes.sizeLabel}
                      id="input-with-icon-grid"
                      type="password"
                      label="Digite sua senha"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
            <div className="mb-2 px-5">
              <Checkbox color="lightBlue" text="Lembre-se" id="remember" />
            </div>
          </CardBody>

          <CardFooter>
            <div className="flex justify-center bg-bb">
              <Button
                color="teal"
                buttonType="default"
                size="lg"
                ripple="dark"
                type="submit"
                onClick={logar}
              >
                Entrar
              </Button>
            </div>

            <div
              style={{ marginTop: "10%" }}
              className="flex justify-center bg-bb"
            >
              <Button
                color="teal"
                buttonType="link"
                size="lg"
                ripple="dark"
                onClick={() => (window.location.href = "/register")}
              >
                Cadastre - se
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Container>
    </Page>
  );
}
