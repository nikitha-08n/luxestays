import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle2, ArrowRight, Apple, AlertCircle, X, Lock } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';

const AuthView = ({ onLogin, registeredUsers, onSignUp, onClose, onGoogleLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSavePrompt, setShowSavePrompt] = useState(false);
    const [pendingUser, setPendingUser] = useState(null);
    const [rememberMe, setRememberMe] = useState(false);

    // Load saved credentials if they exist
    useEffect(() => {
        const savedCreds = localStorage.getItem('luxe_saved_creds');
        if (savedCreds) {
            const { email: savedEmail, password: savedPassword } = JSON.parse(savedCreds);
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const loginWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                setLoading(true);
                setError('');
                console.log('Google login token received:', tokenResponse);

                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });

                if (!userInfoRes.ok) {
                    throw new Error(`Failed to fetch user info: ${userInfoRes.statusText}`);
                }

                const profile = await userInfoRes.json();
                console.log('Google profile fetched:', profile);

                if (onGoogleLogin) {
                    onGoogleLogin(profile);
                }
            } catch (err) {
                console.error('Google sign-in error:', err);
                setError('Google sign-in failed. Please try again.');
                setLoading(false);
            }
        },
        onError: (error) => {
            console.error('Google sign-in cancelled or failed:', error);
            setError('Google sign-in was cancelled or failed.');
        }
    });
    
    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleAuth = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        setTimeout(() => {
            if (isLogin) {
                // Dynamic Login Check
                const user = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
                if (user) {
                    setLoading(false);
                    if (rememberMe) {
                        localStorage.setItem('luxe_saved_creds', JSON.stringify({ email, password }));
                        onLogin(user);
                    } else {
                        // Ask to save if not already saved
                        const saved = localStorage.getItem('luxe_saved_creds');
                        if (!saved) {
                            setPendingUser(user);
                            setShowSavePrompt(true);
                        } else {
                            onLogin(user);
                        }
                    }
                } else {
                    setLoading(false);
                    setError('Invalid email or password. Please try again.');
                }
            } else {
                // Dynamic Sign Up flow
                const existingUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
                if (existingUser) {
                    setLoading(false);
                    setError('This email is already registered. Please sign in instead.');
                    return;
                }

                const newUserObj = { name, email, password };
                onSignUp(newUserObj);
                setLoading(false);
                setSuccess('Your LuxeStay account is ready!');
                
                // Ask to save after signup
                setPendingUser(newUserObj);
                setShowSavePrompt(true);
            }
        }, 1200);
    };

    const handleSavePasswordResponse = (save) => {
        if (save && pendingUser) {
            localStorage.setItem('luxe_saved_creds', JSON.stringify({ 
                email: pendingUser.email, 
                password: pendingUser.password 
            }));
        }
        setShowSavePrompt(false);
        onLogin(pendingUser);
    };

    return (
        <div className="auth-overlay-fixed" onClick={onClose}>
            <div className="auth-container" onClick={e => e.stopPropagation()}>
                {onClose && (
                    <button className="auth-close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                )}
            {/* Left: Brand & Visual */}
            <div className="auth-visual">
                <div className="auth-overlay"></div>
                <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                    alt="Luxury Home" 
                    className="auth-bg"
                />
                <div className="auth-brand-content">
                    <h1>LUXESTAY</h1>
                    <p>Quality living meets effortless booking. Discover curated homes that fit your lifestyle and budget.</p>
                    <div className="auth-badges">
                        <div className="auth-badge">
                            <CheckCircle2 size={16} />
                            <span>Vetted Collections</span>
                        </div>
                        <div className="auth-badge">
                            <CheckCircle2 size={16} />
                            <span>24/7 Concierge</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Forms */}
            <div className="auth-form-side">
                <div className="auth-form-wrapper">
                    <div className="auth-form-header">
                        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                        <p className="muted">
                            {isLogin 
                                ? 'Sign in to access your exclusive stays.' 
                                : 'Join our community of smart travelers.'}
                        </p>
                    </div>

                    {success && (
                        <div className="auth-success-alert">
                            <CheckCircle2 size={18} />
                            <span>{success}</span>
                        </div>
                    )}

                    {error && (
                        <div className="auth-error-alert">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleAuth}>
                        {!isLogin && (
                            <div className="form-group">
                                <label>Full Legal Name</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    placeholder="e.g. Jonathan Wick" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required 
                                />
                            </div>
                        )}
                        
                        <div className="form-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                className="form-input" 
                                placeholder="name@luxury.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="password-input-wrap">
                                <input 
                                    type={showPass ? 'text' : 'password'} 
                                    className="form-input" 
                                    placeholder="••••••••" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                                <button type="button" className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-utils">
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span>Remember me</span>
                            </label>
                            {isLogin && (
                                <a href="#" className="forgot-pass">Forgot Password?</a>
                            )}
                        </div>

                        <button className={`btn btn-dark w-100 auth-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                            {loading ? (
                                <>
                                    <div className="key-spinner"></div>
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <span>{isLogin ? 'Sign In to Account' : 'Join the Elite'}</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or continue with</span>
                    </div>

                    <div className="social-auth">
                        <button className="social-btn">
                            <Apple size={20} fill="currentColor" />
                            <span>Apple</span>
                        </button>
                        <button type="button" className="social-btn" onClick={() => loginWithGoogle()}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span>Google</span>
                        </button>
                    </div>

                    <div className="auth-footer">
                        <p>
                            {isLogin ? "New to LuxeStay?" : "Already a member?"}
                            <button className="text-btn" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Create an Account' : 'Sign In Now'}
                            </button>
                        </p>
                        
                        <div style={{ marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                            <button 
                                type="button"
                                className="text-btn" 
                                style={{ color: '#64748b', fontSize: '0.8rem', textDecoration: 'underline' }}
                                onClick={() => onLogin({ name: 'Guest User', email: 'guest@luxestay.com', photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80' })}
                            >
                                Continue as Guest (Development Bypass)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Save Password Prompt Overlay */}
        {showSavePrompt && (
            <div className="save-password-overlay">
                <div className="save-password-card">
                    <div className="save-icon-circle">
                        <Lock size={32} />
                    </div>
                    <h3>Save Password?</h3>
                    <p>Would you like LuxeStay to remember your credentials for faster access next time?</p>
                    <div className="save-actions">
                        <button className="btn btn-dark w-100" onClick={() => handleSavePasswordResponse(true)}>
                            Yes, Save Password
                        </button>
                        <button className="btn btn-outline w-100" onClick={() => handleSavePasswordResponse(false)}>
                            Not Now
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
    );
};

export default AuthView;
