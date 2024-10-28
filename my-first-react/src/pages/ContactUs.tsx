
function ContactUs() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', color: '#333' }}>
            <h2 style={{ textAlign: 'center', color: '#1e90ff' }}>Get in Touch with Us!</h2>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
                {/* Contact Form */}
                <div style={{ width: '45%' }}>
                    <h3>Contact Form</h3>
                    <form style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Name</label>
                        <input type="text" placeholder="Your Name" style={inputStyle} required />

                        <label>Email</label>
                        <input type="email" placeholder="Your Email" style={inputStyle} required />

                        <label>Message</label>
                        <textarea placeholder="Your Message" style={{ ...inputStyle, height: '100px' }} required></textarea>

                        <button type="submit" style={buttonStyle}>Send Message</button>
                    </form>
                </div>

                {/* Contact Details */}
                <div style={{ width: '45%', textAlign: 'center' }}>
                    <h3>Contact Information</h3>
                    <p>📍 123 Main St, Anytown, USA</p>
                    <p>📞 (123) 456-7890</p>
                    <p>📧 contact@example.com</p>

                    {/* Social Media Links */}
                    <div style={{ marginTop: '20px' }}>
                        <h4>Follow Us</h4>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const inputStyle = {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc'
};

const buttonStyle = {
    padding: '10px',
    backgroundColor: '#1e90ff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
};

export default ContactUs;
