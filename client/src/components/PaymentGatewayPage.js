import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    useStripe,
    useElements,
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from '@stripe/react-stripe-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import '../styles/PaymentGatewayPage.css';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(
  'pk_test_51NYmPkSCfYsS3TchcSObjNfzHWpWXIkcjrKAT9KNe5bxLD5PVAtcYQ2VtNDXpUMsqDNhBx075XhBhB8CD3NLC5XK00gzVu1aFf'
); // Stripe public key

const PaymentForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const {totalAmount,filteredProductDetail}=location.state;
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
    const [cardholderName, setCardholderName] = useState('');

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
  
    console.log(totalAmount)
    const handlePayment  = async (event) => {
      event.preventDefault();
      setIsPaymentProcessing(true);
    
      try {
        const response = await fetch('http://localhost:8080/wedease/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalAmount,
            currency: 'INR',
            cardholderName: cardholderName,
          }),
        });
    
        const { clientSecret } = await response.json();
        console.log(totalAmount)
    
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: cardholderName,
              email: email,
              phone: phoneNumber,
              address: {
                line1: streetAddress,
                city: city,
                state: state,
                postal_code: pincode,
              },
            },
          },
        });
    
        if (result.error) {
          console.error(result.error.message);
          sendPaymentStatusToBackend(false);
          alert('Payment not successful. Please try again.');
        } else {
          console.log('Payment succeeded:', result.paymentIntent);
          alert('Payment Successful!');
          sendPaymentStatusToBackend(true);
          if (result.paymentIntent.status === 'succeeded') {
            // If payment was successful, send and store the address
            const addressResponse = await fetch('http://localhost:8080/wedease/Address', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                Username: cardholderName,
                phoneNumber: phoneNumber,
                streetAddress: streetAddress,
                city: city,
                state: state,
                pincode: pincode,
                filteredProductDetail: filteredProductDetail,
              }),
            });
    
            if (addressResponse.ok) {
              console.log('Address details sent and stored successfully');
            } else {
              console.error('Failed to send and store address details');
            }
          }
          navigate("/OrderPage");
        }
      } catch (error) {
        console.error('Error processing payment: ', error);
        sendPaymentStatusToBackend(false);
      }
    
      setIsPaymentProcessing(false);
    };
    
    const sendPaymentStatusToBackend = async (isSuccessful) => {
      try {
        const response = await fetch('http://localhost:8080/wedease/status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isSuccessful: isSuccessful,
            filteredProductDetail: filteredProductDetail,
          }),
        });
        
        if (response.ok) {
          console.log('Payment status sent successfully');
        } else {
          console.error('Failed to send payment status to the backend');
        }
      } catch (error) {
        console.error('Error sending payment status to the backend: ', error);
      }
      if(isSuccessful){
       await fetch("http://localhost:8080/wedease/quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({filteredProductDetail:filteredProductDetail}),
      });
    }
    };
    

    return (
        <div className="payment-container">
          
        <div className="address-container">
          
          <h3>Address Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={cardholderName}
            onChange={(event) => setCardholderName(event.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={streetAddress}
            onChange={(event) => setStreetAddress(event.target.value)}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={pincode}
            onChange={(event) => setPincode(event.target.value)}
          />
        </div>
        <div className="payment-form-container">
          <h3>Payment Details</h3>
          <form className="payment-form" onSubmit={handlePayment }>
             <div className="card-details">
              <CardNumberElement options={{}} className='card-exp' />
              <input
              type="text"
             name="name"
             placeholder="Cardholder Name"
             value={cardholderName}
             onChange={(event) => setCardholderName(event.target.value)}
             />
             </div>
             <div className="expiry-cvc">
              <CardExpiryElement options={{}} className='card-exp' />
              <CardCvcElement options={{}} className='card-exp' />
             </div>
             <button
              className="buy-now-button"
              type="submit"
              disabled={!stripe || isPaymentProcessing}
             >
              {isPaymentProcessing ? 'Processing...' : 'Buy Now'}
             </button>
             </form>
        </div>
      
      </div>
    );
  };
  

const PaymentGatewayPage = () => {
  const location = useLocation();
  const { totalAmount } = location.state || {};

  return (
    <div className='back-img'><Header />
    <div className="payment-gateway-page">
      <h2 className='gateway'>
        <FontAwesomeIcon icon={faCreditCard} /> Payment Gateway
      </h2>
      <div className="payment-details">
        <p>Total Amount: ₹{totalAmount}</p>
        <Elements stripe={stripePromise}>
          <PaymentForm totalAmount={totalAmount}  />
        </Elements>
      </div>
    </div><Footer />
    </div>
  );
};

export default PaymentGatewayPage;
