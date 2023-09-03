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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../assets/css/driver.css";
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
  Label,
} from "reactstrap";
import { userService } from "services/driver";
import * as Yup from "yup";
import { Loader } from "components/Loader/Loader";
import { formatDateToInputUpdate } from "../helpers/formatDateToDisplay";
import profileM from "../assets/img/profile-m.jpg";
import profileF from "../assets/img/profile-f.jpg";

import capa from "../assets/img/jan-sendereks.jpg";
function Driver() {
  const [formSubmit, setFormSubmit] = useState({});
  const [driver, setDriver] = useState({});
  const [isView, setIsView] = useState(false); // eslint-disable-line
  const [isUpdate, setIsUpdate] = useState(false); // eslint-disable-line
  const [loading, setLoading] = useState(false); // eslint-disable-line
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "../assets/img/profile-m.jpg"
  ); // eslint-disable-line
  const navigate = useNavigate();
  const id = useLocation().state;

  const uploadProfileImage = (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      alert(e.target.result);
      document.querySelector(".profileImageLabel").src = e.target.result;
    };

    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    console.log(formData);
  };

  useState(() => {
    if (id) {
      setLoading(true);
      userService.getById(id).then((res) => {
        const result = res.data.data;
        console.log(result);
        setDriver(result);
        setIsUpdate(true);
        setFormSubmit({
          id: result.id,
          type: result.type,
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
        setLoading(false);
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
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={onSubmit}>
            <Row>
              <Col
                md="4"
                style={{
                  transition: "0.5s",
                  display: `block`,
                }}
              >
                <Card
                  className="card-user"
                  style={{
                    display: "block",
                  }}
                >
                  <div className="image">
                    <img alt="..." src={capa} />
                  </div>
                  <CardBody>
                    <div className="author">
                      <label for="profileImage">
                        <img
                          alt="..."
                          className="avatar profileImageLabel profileImage"
                          src={profileM}
                        />
                      </label>
                      <input
                        type="file"
                        id="profileImage"
                        style={{
                          display: "none",
                        }}
                        onChange={(e) => {
                          uploadProfileImage(e.target.files[0]);
                        }}
                      />
                    </div>
                    <h5 className="title">{formSubmit.name || ""}</h5>
                    <p className="description">{formSubmit.email || ""}</p>

                    <p className="description text-center">
                      {formSubmit.phone || ""}
                    </p>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <br />

                    {!!id ? (
                      <div className="button-container">
                        <Row>
                          <Col className="ml-auto" lg="6" md="6" xs="6">
                            <h5>
                              {driver?.Vehicle?.length || 0} <br />
                              <small>Veiculos</small>
                            </h5>
                          </Col>
                          <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                            <h5>
                              0 <br />
                              <small>Viagens</small>
                            </h5>
                          </Col>
                        </Row>
                      </div>
                    ) : (
                      <>
                        {" "}
                        <br /> <br />
                      </>
                    )}
                  </CardFooter>
                </Card>
              </Col>

              <Col md={"8"}>
                <Card className="card-user">
                  <CardHeader>
                    <CardTitle tag="h5">
                      {!!id
                        ? "Voce está editando " + formSubmit.name
                        : "Cadastro de Motorista"}
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
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
                            defaultValue={formatDateToInputUpdate(
                              driver?.date_of_birth || new Date().toISOString()
                            )}
                            onChange={(e) => {
                              setFormSubmit({
                                ...formSubmit,
                                date_of_birth: e.target.value,
                              });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <Label for="exampleSelect">Sexo</Label>
                          <Input id="exampleSelect" name="select" type="select">
                            <option>Selecionar</option>
                            <option>Masculino</option>
                            <option>Feminino</option>
                            <option> Não binário </option>
                          </Input>
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
                            defaultValue={formatDateToInputUpdate(
                              formSubmit?.cnhDateOfIssue ||
                                new Date().toISOString()
                            )}
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
                            defaultValue={formatDateToInputUpdate(
                              formSubmit?.cnhExpirationDate ||
                                new Date().toISOString()
                            )}
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
                          disabled={loading}
                        >
                          {isUpdate ? "Atualizar" : "Adicionar"}
                        </Button>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </>
  );
}

export default Driver;
