/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
import { userService } from "services/driver";
import * as Yup from "yup";
function Driver() {
  const [formSubmit, setFormSubmit] = useState({
    date_of_birth: new Date(),
  });
  const [driver, setDriver] = useState({});
  const [isView, setIsView] = useState(false); // eslint-disable-line
  const [isUpdate, setIsUpdate] = useState(false); // eslint-disable-line
  const navigate = useNavigate();
  const { id } = useParams();

  useState(() => {
    if (id) {
      userService.getById(id).then((res) => {
        const result = res.data.data;
        setDriver(result);
        setIsUpdate(true);
        setFormSubmit({
          name: result.name,
          email: result.email,
          password: result.password,
          cpf: result.cpf,
          phone: result.phone,
          date_of_birth: result.date_of_birth,
          cnh: result.Driver[0].cnh,
          cnhDateOfIssue: result.Driver[0].cnhDateOfIssue,
          cnhExpirationDate: result.Driver[0].cnhExpirationDate,
        }); // eslint-disable-line
      });
    }
  }, [id]);
  const onSubmit = (e) => {
    try {
      e.preventDefault();
      Yup.object({
        name: Yup.string().required("Nome é obrigatório"),
        email: Yup.string().required("Email é obrigatório"),
        password: Yup.string().required("Senha é obrigatório"),
        cpf: Yup.string().required("CPF é obrigatório"),
        phone: Yup.string().required("Telefone é obrigatório"),
        date_of_birth: Yup.string().required(
          "Data de Nascimento é obrigatório"
        ),
        cnh: Yup.string().required("CNH é obrigatório"),
        cnhDateOfIssue: Yup.string().required(
          "Data de Emissão da CNH é obrigatório"
        ),
        cnhExpirationDate: Yup.string().required(
          "Data de Validade da CNH é obrigatório"
        ),
      }).validateSync(formSubmit, { abortEarly: true });

      if (!id) {
        userService.create(formSubmit).then((res) => {
          toast.success("Motorista cadastrado com sucesso!");
          setTimeout(() => {
            navigate("/drivers");
          }, 2000);
        });
      } else {
        userService.update(formSubmit).then((res) => {
          toast.success("Motorista Atualizado com sucesso!");
          setTimeout(() => {
            navigate("/drivers");
          }, 2000);
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col
            md="4"
            style={{
              transition: "0.5s",
              display: `${isUpdate ? "block" : "none"}`,
            }}
          >
            <Card
              className="card-user"
              style={{
                transition: "0.5s",
                display: `${isUpdate ? "block" : "none"}`,
              }}
            >
              <div className="image">
                <img alt="..." src={require("assets/img/damir-bosnjak.jpg")} />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/mike.jpg")}
                    />
                    <h5 className="title">{formSubmit.name || ""}</h5>
                  </a>
                  <p className="description">{formSubmit.email || ""}</p>
                </div>
                <p className="description text-center">
                  {formSubmit.phone || ""}
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="6" md="6" xs="6">
                      <h5>
                        178 <br />
                        <small>Viagens</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                      <h5>
                        7 <br />
                        <small>Veiculos</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>

          <Col md={formSubmit.name ? "8" : "12"}>
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Cadastro de Motorista</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Nome*</label>
                        <Input
                          placeholder="Nome"
                          value={formSubmit.name || ""}
                          type="text"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              name: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Email*</label>
                        <Input
                          placeholder="Email"
                          type="email"
                          value={formSubmit.email || ""}
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              email: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Senha*</label>
                        <Input
                          placeholder="Senha"
                          type="password"
                          value={formSubmit.password || ""}
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              password: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>CPF*</label>
                        <Input
                          placeholder="09878912343"
                          type="text"
                          value={formSubmit.cpf || ""}
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              cpf: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Telefone</label>
                        <Input
                          placeholder="88997017654"
                          type="text"
                          value={formSubmit.phone || ""}
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              phone: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Data de Nascimento</label>
                        <Input
                          type="date"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              date_of_birth: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>CNH</label>
                        <Input
                          placeholder=""
                          type="text"
                          value={formSubmit.cnh || ""}
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              cnh: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Data de Emissao*</label>
                        <Input
                          type="date"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              cnhDateOfIssue: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Data de Validade*</label>
                        <Input
                          type="date"
                          onChange={(e) => {
                            setFormSubmit({
                              ...formSubmit,
                              cnhExpirationDate: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row></Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        {isUpdate ? "Atualizar" : "Adicionar"}
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Driver;
