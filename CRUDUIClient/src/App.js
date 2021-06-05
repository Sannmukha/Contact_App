import React from "react";
import "./styles.css";
import ContactTable from "./components/ContactTable";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <Container>
      <ContactTable />
    </Container>
  );
}
