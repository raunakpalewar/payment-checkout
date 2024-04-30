# Secure Payment Checkout System

This project is a secure payment checkout system built using React.js for the front-end and Node.js with the Express framework for the back-end. It integrates with the Stripe API for processing payments securely.

## Features

- User-friendly interface for entering billing information and processing payments.
- Integration with the Stripe API for secure payment processing.
- Modal gallery for showcasing product images.
- Validation to ensure all required fields are filled before processing payment.
- Responsive design for compatibility across different devices.

![Image Alt Text](./Untitled%203.png)

## Technologies Used

- **Front-End:** React.js, Stripe.js, CSS
- **Back-End:** Node.js, Express.js
- **Payment Processing:** Stripe API

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/raunakpalewar/payment-checkout.git
   ```

2. Install dependencies for both front-end and back-end:
   ```
   cd secure-payment-checkout/frontend
   npm install
   cd ../backend
   npm install
   ```

3. Start the development servers:
   ```
   cd ../frontend
   npm start
   ```
   ```
   cd ../backend
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Enter the billing information, including name, address, mobile number, email, and card details.
- Click on the product image to view additional images in a modal gallery.
- Ensure all required fields are filled before submitting the payment.
- Upon successful payment processing, a success message will be displayed.

