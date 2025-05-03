
import React from "react";
import ContactHeader from "./components/ContactHeader";
import ContactInfoCards from "./components/ContactInfoCards";
import ContactForm from "./components/ContactForm";
import LocationMap from "./components/LocationMap";

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <ContactHeader />
      <ContactInfoCards />
      <ContactForm />
      <LocationMap />
    </div>
  );
};

export default ContactPage;
