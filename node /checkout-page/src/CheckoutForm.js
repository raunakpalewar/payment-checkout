import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import pic1 from './keyboard.png'; // Import your images here
import image1 from './keyboard2.png';
import image2 from './keyboard3.png';
import image3 from './keyboard4.png';

const PaymentComponent = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([pic1, image1, image2, image3]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    email: ''
  });

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !isFormValid()) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token } = await stripe.createToken(cardElement);
      if (token) {
        const response = await fetch('http://localhost:3001/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount * 100,
            token,
            formData
          }),
        });
      
        if (response.ok) {
          setPaymentSuccess(true);
        } else {
          setError('Payment failed. Please try again.');
          setPaymentSuccess(false);
        }
      } else {
        setError('Please enter your card details.');
        setPaymentSuccess(false);
      }
    } catch (error) {
      setError(error.message);
      setPaymentSuccess(false);
    }
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  return (
    <div>
      <h1 className="page-heading">Secure Payment</h1>
      <div className="payment-container">
        <div className="product-info">
          <h2>Product: Mechanical Keyboard</h2>
          <img
            src={pic1}
            alt="Keyboard"
            className="product-image"
            onClick={handleImageClick} // Open modal on image click
          />
          <p className="product-description">
            The Mechanical Keyboard is designed for ultimate typing experience with responsive keys and customizable RGB lighting.
          </p>
          <p className="product-price">Price: ${amount}</p>
        </div>
        {!paymentSuccess ? (
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <CardElement className="card-element" />
            </div>
            <div className="form-row">
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            </div>
            <button type="submit" className="pay-button" disabled={!stripe}>
              Pay ${amount}
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        ) : (
          <div className="success-message">
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase.</p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="modal">
          <span className="close-icon" onClick={handleCloseModal}>×</span>
          <button className="prev-button" onClick={handlePreviousImage}>{'<'}</button>
          <div className="modal-content">
            <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} className="modal-image" />
          </div>
          <button className="next-button" onClick={handleNextImage}>{'>'}</button>
        </div>
      )}
    </div>
  );
};

export default PaymentComponent;
