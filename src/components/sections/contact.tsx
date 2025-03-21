
import React, { useState, useRef } from "react";
import { GlassmorphicCard } from "../ui/glassmorphic-card";
import { GlowingButton } from "../ui/glowing-button";
import { TextReveal } from "../ui/animated-text";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { ParallaxSection } from "../ui/parallax-section";
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    if (!formRef.current) return;

    // Replace with your actual EmailJS service ID, template ID, and public key
    emailjs.sendForm(
      'service_dthfr8k',
      'template_wglgtfk',
      formRef.current,
      'gk8c6UeFIreq7-rPw'
    )
    .then((result) => {
      setSubmitStatus('success');
      setStatusMessage("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    })
    .catch((error) => {
      setSubmitStatus('error');
      setStatusMessage("Failed to send message. Please try again.");
      console.error("EmailJS error:", error);
    })
    .finally(() => {
      setIsSubmitting(false);
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
                      arpabdas02@gmail.com
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
                      +91  8927559821
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
                      Indas, West Bengal
                    </p>
                  </div>
                </div>
              </div>
            </ParallaxSection>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <GlassmorphicCard glowColor="blue" className="p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {submitStatus && (
                  <div className={`p-4 rounded-lg flex items-center space-x-3 ${
                    submitStatus === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span>{statusMessage}</span>
                  </div>
                )}
                
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
                  <GlowingButton 
                    type="submit" 
                    glowColor="purple" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
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
