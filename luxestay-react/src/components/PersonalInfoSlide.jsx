import React, { useState } from 'react';
import { X, ChevronLeft, Save, CheckCircle2 } from 'lucide-react';

const PersonalInfoSlide = ({ onClose, onBack, user, updateUser }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
    });
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            updateUser(formData);
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }, 1500);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="notif-slide-overlay" onClick={onClose}>
            <div className="notif-slide-container profile-sub-slide" onClick={e => e.stopPropagation()}>
                <div className="notif-slide-header">
                    <button className="notif-slide-close" onClick={onBack}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <span className="notif-category">PERSONAL INFO</span>
                </div>

                <div className="notif-slide-content">
                    <div className="sub-slide-intro">
                        <h1>Personal Information</h1>
                        <p className="muted">Update your details to keep your account secure and up to date.</p>
                    </div>

                    <div className="form-group">
                        <label>Legal Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name} 
                            onChange={handleChange}
                            className="form-input" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email} 
                            onChange={handleChange}
                            className="form-input" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone} 
                            onChange={handleChange}
                            className="form-input" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Home Address</label>
                        <textarea 
                            name="address"
                            className="form-input" 
                            rows="3" 
                            value={formData.address} 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="sub-slide-actions">
                        <button 
                            className={`btn btn-dark w-100 ${loading ? 'loading' : ''}`} 
                            onClick={handleSave}
                            disabled={loading || saved}
                        >
                            {loading ? 'Saving...' : saved ? <><CheckCircle2 size={18} /> Changes Saved</> : <><Save size={18} /> Save Changes</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoSlide;
