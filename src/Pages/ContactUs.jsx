import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; // Importing from React Icon library

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert("Message Sent! We've received your message and will get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-[#DB4444] sm:text-4xl">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        We'd love to hear from you. Please fill out this form or use our contact information below.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border-gray-300 rounded-md"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border-gray-300 rounded-md"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 w-full border-gray-300 rounded-md"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-[#DB4444] text-white py-2 rounded-md">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 space-y-6">
                            <h2 className="text-2xl font-bold text-[#DB4444]">Our Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FaMapMarkerAlt className="flex-shrink-0 h-6 w-6 text-gray-400" />
                                    <div className="ml-3 text-base text-gray-500">
                                        <p>Chanakyapuri Somnath Chawk</p>
                                        <p>Ahmedabad</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaPhone className="flex-shrink-0 h-6 w-6 text-gray-400" />
                                    <div className="ml-3 text-base text-gray-500">
                                        +91 9510850996
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="flex-shrink-0 h-6 w-6 text-gray-400" />
                                    <div className="ml-3 text-base text-gray-500">
                                    yashgami.it.15@gmail.com
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-6 sm:px-6">
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    className="w-full h-64 rounded-md"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.2839451098214!2d72.57136231479798!3d23.022505684850588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f9f46fbb47%3A0x78f919b636a2b941!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1635173165055!5m2!1sen!2sin"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                ></iframe>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
