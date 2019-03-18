import React from 'react';
import FormWithControlled from './FormWithControlled';
import './index.css';

export default () => (
  <section className="center">
    <h1 className="text-center">Examples</h1>
    <div className="example center">
      <h2 className="text-center">Simple form</h2>
      <FormWithControlled handleSubmit={() => alert('Submit')}/>
    </div>
  </section>
);
