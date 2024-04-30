import React from 'react';
import PaymentComponent from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_live_51PBE1RSGpA0wp2oXCbWCFIQdxMiOMzlkh6H9rRIKhwx7Gm9YddZ4vhF9y0nRcr3tpSS36j5s1y8CdoNgPlDRuzJL00OrcUIXJ6');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentComponent amount={50} />
    </Elements>
  );
};

export default App; 