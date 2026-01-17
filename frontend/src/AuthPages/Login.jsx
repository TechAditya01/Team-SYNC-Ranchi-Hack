import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/LandingPages/Navbar';
import Footer from '../../components/LandingPages/Footer';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo.jpeg';

export default function Login() {
    const navigate = useNavigate();
    const { login, googleLogin } = useAuth();

    const [userType, setUserType] = useState('citizen');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173';

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const cleanEmail = email.trim();
            const cleanPassword = password.trim();

            const userCredential = await login(cleanEmail, cleanPassword);
            const uid = userCredential.user.uid;

            const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'email', contact: cleanEmail })
            });

            if (!response.ok) throw new Error("Failed to send verification OTP");

            toast.success('Credentials verified! Please enter OTP sent to your email.');
            navigate('/verify-otp', { state: { email: cleanEmail, mode: 'login', userType, uid } });

        } catch (error) {
            let msg = error.message;
            if (msg.includes('auth')) msg = "Incorrect email or password.";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await googleLogin();
            toast.success('Logged in with Google');
            navigate(userType === 'admin' ? '/admin/dashboard' : '/civic/dashboard');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#0f172a]">
            <Navbar />

            <div className="flex-grow flex w-full">

                {/* LEFT SECTION */}
                <div className="hidden lg:flex w-1/2 relative flex-col justify-center px-12 text-white bg-slate-900">
                    <img
                        src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070"
                        alt="City"
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                    />
                    <div className="relative z-10">
                        <h1 className="text-5xl font-bold mb-6">
                            Empowering Citizens,<br />
                            <span className="text-blue-400">Enabling Authorities.</span>
                        </h1>
                        <p className="text-lg max-w-md text-gray-200">
                            Secure civic issue reporting platform for smarter governance.
                        </p>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="w-full lg:w-1/2 flex justify-center items-center px-6 py-12">
                    <div className="max-w-[440px] w-full">

                        {/* LOGO */}<div className="text-center mb-10">
    {/* Logo */}
    <div className="flex justify-center mb-4">
        <img
            src={logo}
            alt="Nagar Alert Hub Logo"
            className="w-16 h-16 rounded-2xl object-cover shadow-lg"
        />
    </div>

    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex justify-center items-center gap-2">
        <span>नगर</span>
        <span>Alert Hub</span>
    </h2>

    <p className="text-slate-500 dark:text-gray-400 text-sm">
        Secure access for citizens & officials
    </p>
</div>

                        {/* USER TYPE */}
                        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
                            {['citizen', 'admin'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setUserType(type)}
                                    className={`py-2 rounded-lg text-sm font-semibold transition ${
                                        userType === type
                                            ? 'bg-white dark:bg-slate-700 text-black dark:text-white'
                                            : 'text-slate-500'
                                    }`}
                                >
                                    {type === 'citizen' ? 'Citizen' : 'Admin'}
                                </button>
                            ))}
                        </div>

                        {/* FORM */}
                        <form className="space-y-5" onSubmit={handleLogin}>
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full px-4 py-3 rounded-lg border dark:bg-slate-800 dark:text-white"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-lg border dark:bg-slate-800 dark:text-white"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                            >
                                {isLoading ? 'Please wait...' : 'Secure Login'}
                            </button>

                            <div className="text-right">
                                <Link to="/forgot-password" className="text-sm text-blue-600">
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="w-full py-3 border rounded-lg flex justify-center items-center gap-2"
                            >
                                Continue with Google
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            New here?
                            <Link to="/register" className="text-blue-600 font-semibold ml-1">
                                Register
                            </Link>
                        </p>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
