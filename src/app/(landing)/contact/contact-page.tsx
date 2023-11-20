"use client";

import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Backend_URL } from "@/lib/Constants";
import { useState } from "react";

const ContactForm = () => {
  const { toast } = useToast();
  async function handleSubmit(event: any) {
    event.preventDefault();
    const data = {
      name: String(event.target.name.value),
      email: String(event.target.email.value),
      message: String(event.target.message.value),
    };

    const response = await fetch(`${Backend_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast({
        title: "Message sent successfully",
        description: "We will get back to you soon",
      });
      // reset the form
      event.target.name.value = "";
      event.target.email.value = "";
      event.target.message.value = "";
    }
    if (!response.ok) {
      toast({
        title: "Error sending message",
        description: "Please check the form value",
      });
    }
  }
  return (
    <section className="min-h-screen">
      <form onSubmit={handleSubmit} className="w-11/12 mx-auto my-2">
        <div className="w-full max-h-screen flex flex-col my-4">
          <label className="font-bold" htmlFor="name">
            Name
          </label>
          <Input
            type="text"
            minLength={3}
            maxLength={150}
            required
            className="border border-gray-100 "
            autoComplete="off"
            id="name"
            placeholder="Your name"
          />
        </div>
        <div className="w-full flex flex-col my-4">
          <label className="font-bold" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            minLength={5}
            maxLength={150}
            required
            className="border border-gray-100 "
            autoComplete="off"
            id="email"
            placeholder="Your email"
          />
        </div>
        <div>
          <label className="font-bold" htmlFor="message">
            Message
          </label>
          <Textarea
            rows={4}
            required
            minLength={10}
            maxLength={500}
            name="message"
            className="w-full border border-gray-100 "
            placeholder="Your message"
          />
        </div>
        <Button
          type="submit"
          className="px-4 py-2 w-40 bg-red-550 rounded disabled:bg-gray-400 disabled:text-gray-100 text-white font-medium mt-4"
        >
          Send Message
        </Button>
      </form>
      <div className="my-5">
        <Map />
      </div>
    </section>
  );
};

export default ContactForm;
