import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/LandingPages/Navbar';
import Footer from '../../components/LandingPages/Footer';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import logo from '../../assets/logo.jpeg';
import lbg from '../../assets/lbg.png';

export default function Register() {
    const [userType, setUserType] = useState('citizen');
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: '',
        department: ''
    });

    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let err = {};
        if (!formData.firstName) err.firstName = true;
        if (!formData.lastName) err.lastName = true;
        if (!/^\d{10}$/.test(formData.mobile)) err.mobile = true;
        if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = true;
        if (formData.password.length < 6) err.password = true;
        if (formData.password !== formData.confirmPassword) err.confirmPassword = true;
        if (userType === 'citizen' && !address) err.address = true;
        if (userType === 'admin' && !formData.department) err.department = true;
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return toast.error("Please fix the errors");

        setLoading(true);
        try {
            const res = await register({
                ...formData,
                address: userType === 'citizen' ? address : null,
                role: userType
            });

            toast.success("Account created successfully");
            navigate('/verify-otp', {
                state: { email: formData.email, mobile: formData.mobile, uid: res.uid }
            });
        } catch (err) {
            toast.error("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#0f172a]">
            <Navbar />

            <div className="flex flex-1">

                {/* LEFT VISUAL PANEL */}
                <div className="hidden lg:flex w-1/2 relative items-center px-16">
                    <img
                        src={lbg}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        alt="city"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/65 to-blue-50/60 dark:from-[#0f172a]/65 dark:to-slate-900/95" />

                    <div className="relative z-10 max-w-xl">
                        <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
                            Join the Movement
                            <br />
                            <span className="text-blue-600 dark:text-blue-400">
                                For Better Cities
                            </span>
                        </h1>

                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                            Help your city respond faster by reporting civic issues
                            through WhatsApp powered by AI.
                        </p>

                        <div className="space-y-4 text-slate-700 dark:text-slate-300 font-medium">
                            <div>📱 No app required</div>
                            <div>⚡ Report issues in seconds</div>
                            <div>🤝 Trusted by municipalities</div>
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
                    <div className="max-w-[460px] w-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">

                        <img src={logo} alt="Logo" className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
                        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-1">
                            Nagar Alert Hub
                        </h2>
                        <p className="text-center text-slate-500 dark:text-gray-400 mb-6">
                            Join as a {userType === 'citizen' ? 'Citizen' : 'Official'}
                        </p>

                        {/* USER TYPE */}
                        <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mb-6">
                            {['citizen', 'admin'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setUserType(type)}
                                    className={`py-2 rounded-lg text-sm font-semibold ${userType === type
                                        ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white'
                                        : 'text-slate-500'
                                        }`}
                                >
                                    {type === 'citizen' ? 'Citizen Portal' : 'Admin / Official'}
                                </button>
                            ))}
                        </div>

                        {/* FORM */}
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="flex gap-4">
                                <input
                                    name="firstName"
                                    placeholder="First Name"
                                    onChange={handleInputChange}
                                    className="w-full flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                />
                                <input
                                    name="lastName"
                                    placeholder="Last Name"
                                    onChange={handleInputChange}
                                    className="w-full flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <input
                                name="mobile"
                                placeholder="Mobile Number"
                                onChange={handleInputChange}
                                className="w-full flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            />

                            {userType === 'citizen' && (
                                <input
                                    placeholder="Full Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                />
                            )}

                            {userType === 'admin' && (
                                <select
                                    name="department"
                                    onChange={handleInputChange}
                                    className="w-full flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                >
                                    <option value="">Select Department</option>
                                    <option>Police</option>
                                    <option>Municipal</option>
                                    <option>Electricity</option>
                                    <option>Water Supply</option>
                                </select>
                            )}

                            <input
                                name="email"
                                placeholder="Email Address"
                                onChange={handleInputChange}
                                className="w-full flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            />

                            <div className="flex gap-4">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                    className="w-full flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm"
                                    onChange={handleInputChange}
                                    className="w-full flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                                />
                            </div>

                            <button
                                disabled={loading}
                                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/40 transition"
                            >
                                {loading ? <Loader2 className="mx-auto animate-spin" /> : 'Create My Account'}
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500 dark:text-gray-400 mt-6">
                            Already a member?
                            <Link to="/login" className="text-blue-600 font-semibold ml-1">
                                Login
                            </Link>
                        </p>

                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
}
