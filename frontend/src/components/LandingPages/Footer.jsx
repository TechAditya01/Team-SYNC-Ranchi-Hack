import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[#0b1224] text-slate-300 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-20">

                {/* Top Grid */}
                <div className="grid gap-12 md:grid-cols-4 mb-16">

                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                ⚡
                            </div>
                            <span className="text-xl font-bold text-white">
                                नगर Alert Hub
                            </span>
                        </Link>
                        <p className="text-sm text-white/70 leading-relaxed">
                            A civic intelligence platform enabling citizens and local authorities
                            to collaborate for cleaner, safer, and smarter cities.
                        </p>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 tracking-wide">
                            Platform
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/how-it-works" className="hover:text-white transition">How it Works</Link></li>
                            <li><a href="/#features" className="hover:text-white transition">Features</a></li>
                            <li><Link to="/municipalities" className="hover:text-white transition">For Municipal Bodies</Link></li>
                            <li><Link to="/success-stories" className="hover:text-white transition">Impact Stories</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 tracking-wide">
                            Company
                        </h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="/#about" className="hover:text-white transition">About Us</a></li>
                            <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service" className="hover:text-white transition">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-white font-semibold mb-6 tracking-wide">
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"
                                aria-label="Twitter"
                            >
                                X
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition"
                                aria-label="LinkedIn"
                            >
                                in
                            </a>
                        </div>
                        <p className="text-xs text-white/50 mt-4">
                            Follow updates & civic initiatives
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/50">
                    <p>© 2026 Nagar Alert Hub. All rights reserved.</p>
                    <span className="mt-4 md:mt-0">
                        Built for Smart Cities of India 🇮🇳
                    </span>
                </div>
            </div>
        </footer>
    );
}
