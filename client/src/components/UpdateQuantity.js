import React, { useState, useContext } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/forms.css";
import AuthContext from "../context/AuthProvider";
import { useNavigate , useParams} from "react-router-dom";

const UpdateQuantity = () => {
  const navigate = useNavigate();
  const { productID } = useParams();
  const { auth } = useContext(AuthContext);
  const [qty, setQty] = useState(""); 

  const handleQtyChange = (e) => {
    const { value } = e.target;
    setQty(value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log(qty)
    try {
      const response = await fetch(`http://localhost:8080/wedease/Qty/${productID}`, {
        method: "POST",
        body:JSON.stringify({qty}),
        headers: {
         "Content-Type": "application/json",
          Authentication: `Bearer ${auth}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Quantity updated");
        navigate("/catelog2");
      } else {
        alert("Quantity not updated");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="back">
      <Header />
      <Container className="registration-form-container">
        <h2 className="mt-5 mb-4 text-center">Edit Quantity</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="Qty">Quantity</Label>
            <Input
              type="number"
              name="qty"
              id="qty"
              value={qty}
              onChange={handleQtyChange}
              placeholder="Enter the product quantity."
              className="input-field"
              required
            />
          </FormGroup>

          <Button color="primary" block className="submit-button">
            Submit
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default UpdateQuantity;
