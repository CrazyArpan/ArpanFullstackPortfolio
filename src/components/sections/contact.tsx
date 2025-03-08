
import React, { useState } from "react";
import { GlassmorphicCard } from "../ui/glassmorphic-card";
import { GlowingButton } from "../ui/glowing-button";
import { TextReveal } from "../ui/animated-text";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { ParallaxSection } from "../ui/parallax-section";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to your backend or email service
    
    // For now, we'll just reset the form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-[15%] w-72 h-72 bg-glow-cyan/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-glow-blue/5 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
            Contact Me
          </div>

          <TextReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's work together on your next project
            </h2>
          </TextReveal>

          <TextReveal>
            <p className="text-foreground/70">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2">
            <ParallaxSection strength={15}>
              <div className="space-y-8">
                <h3 className="text-2xl font-bold mb-6">Get in touch</h3>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a href="mailto:hello@portfolio.com" className="text-foreground/70 hover:text-primary transition-colors">
                      hello@portfolio.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <a href="tel:+1(555)1234567" className="text-foreground/70 hover:text-primary transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-foreground/70">
                      San Francisco, CA
                    </p>
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <GlassmorphicCard glowColor="blue" className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-background/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-background/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-background/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder="Subject"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-background/50 backdrop-blur-sm border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Your message"
                    required
                  />
                </div>
                
                <div>
                  <GlowingButton type="submit" glowColor="purple" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </GlowingButton>
                </div>
              </form>
            </GlassmorphicCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
