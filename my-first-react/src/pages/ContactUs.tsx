
function ContactUs() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080)' }}>
            <div className="backdrop-blur-lg bg-black bg-opacity-60 p-10 rounded-xl w-11/12 max-w-2xl text-white">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-cyan-300 mb-8">Get in Touch with Us!</h2>
                
                <div className="flex flex-col items-center space-y-6">
                    {/* Contact Information */}
                    <div className="text-center">
                        <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                        <p>📍 University of Moratuwa</p>
                        <p>📞 (+94) 712345678</p>
                        <p>📧 sameenindula@gmail.com</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="mt-6">
                        <h4 className="text-xl font-semibold mb-4 text-center">Follow Us</h4>
                        <div className="flex space-x-4 justify-center">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-white transition">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-white transition">Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-white transition">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
