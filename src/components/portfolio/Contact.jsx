import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const sendMessage = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "service_nqn4ckw", 
        "template_l0pds18", 
        {
          name: form.name,
          email: form.email,  
          message: form.message,
        },
        "VeTLFbZiZAA1s-PBp"
      )
      .then(() => {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setStatus("Failed to send message. Please try again.");
      });
  };

  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </section>
  );
}
