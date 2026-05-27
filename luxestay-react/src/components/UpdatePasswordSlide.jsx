import React, { useState } from 'react';
import { X, ChevronLeft, Eye, EyeOff, ShieldCheck, Lock } from 'lucide-react';

const UpdatePasswordSlide = ({ onClose, onBack }) => {
    const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const toggleShow = (field) => {
        setShowPass(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleUpdate = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <div className="notif-slide-overlay" onClick={onClose}>
                <div className="notif-slide-container profile-sub-slide success-state" onClick={e => e.stopPropagation()}>
                    <div className="success-content">
                        <div className="success-icon-animate">
                            <ShieldCheck size={64} color="#10b981" />
                        </div>
                        <h2>Password Updated</h2>
                        <p className="muted">Your security credentials have been successfully refreshed.</p>
                        <button className="btn btn-dark mt-2rem" onClick={onBack}>
                            Back to Security
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="notif-slide-overlay" onClick={onClose}>
            <div className="notif-slide-container profile-sub-slide" onClick={e => e.stopPropagation()}>
                <div className="notif-slide-header">
                    <button className="notif-slide-close" onClick={onBack}>
                        <ChevronLeft size={20} /> Back
                    </button>
                    <span className="notif-category">UPDATE PASSWORD</span>
                </div>

                <div className="notif-slide-content">
                    <div className="sub-slide-intro">
                        <h1>Update Password</h1>
                        <p className="muted">Enter your current password and choose a new secure one.</p>
                    </div>

                    <div className="form-group">
                        <label>Current Password</label>
                        <div className="password-input-wrap">
                            <input 
                                type={showPass.current ? 'text' : 'password'} 
                                className="form-input" 
                                placeholder="Enter current password"
                            />
                            <button className="pass-toggle" onClick={() => toggleShow('current')}>
                                {showPass.current ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <div className="password-input-wrap">
                            <input 
                                type={showPass.new ? 'text' : 'password'} 
                                className="form-input" 
                                placeholder="Create new password"
                            />
                            <button className="pass-toggle" onClick={() => toggleShow('new')}>
                                {showPass.new ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <div className="password-strength-bar">
                            <div className="strength-fill strong"></div>
                        </div>
                        <span className="strength-text">Password strength: <strong>Strong</strong></span>
                    </div>

                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <div className="password-input-wrap">
                            <input 
                                type={showPass.confirm ? 'text' : 'password'} 
                                className="form-input" 
                                placeholder="Repeat new password"
                            />
                            <button className="pass-toggle" onClick={() => toggleShow('confirm')}>
                                {showPass.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="sub-slide-actions mt-3rem">
                        <button 
                            className={`btn btn-dark w-100 ${loading ? 'loading' : ''}`}
                            onClick={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>

                    <div className="security-tip">
                        <Lock size={16} />
                        <p>Tip: Use a combination of letters, numbers, and symbols for a stronger password.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePasswordSlide;
