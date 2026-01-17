import React from 'react';

export default function About() {
    return (
        <section
            id="about"
            className="py-20 bg-white dark:bg-slate-950 transition-colors"
        >
            <div className="max-w-6xl mx-auto px-6">

                {/* Badge */}
                <div className="text-center mb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        National Civic Tech Initiative
                    </span>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                        Empowering Citizens.
                        <br />
                        <span className="text-blue-600 dark:text-blue-500">Transforming Cities.</span>
                    </h2>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-6">
                        Real-time civic issue reporting — powered by WhatsApp & AI.
                    </p>
                </div>

                {/* Pillars (Closer + Bigger Text) */}
                <div className="grid md:grid-cols-3 gap-8 mb-14 text-center">
                    {[
                        {
                            emoji: "📱",
                            title: "Simple for Everyone",
                            desc: "No apps. No forms. Just WhatsApp."
                        },
                        {
                            emoji: "🧠",
                            title: "AI-Powered Action",
                            desc: "Smart verification & routing."
                        },
                        {
                            emoji: "🤝",
                            title: "Built with Cities",
                            desc: "Partnered with municipalities."
                        }
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="text-3xl mb-2">{item.emoji}</div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                                {item.title}
                            </h3>

                            <p className="text-base text-slate-500 dark:text-slate-400">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Soft Divider */}
                <div className="h-px bg-slate-200 dark:bg-slate-800 mb-12"></div>

                {/* Stats (Grouped + Larger Text) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {[
                        { value: "50k+", label: "Citizens Active", emoji: "👥" },
                        { value: "12k+", label: "Issues Resolved", emoji: "✅" },
                        { value: "24h", label: "Avg Response", emoji: "⏱️" },
                        { value: "15+", label: "Cities Covered", emoji: "🏙️" }
                    ].map((stat, i) => (
                        <div
                            key={i}
                            className="py-4"
                        >
                            <div className="text-2xl mb-1">{stat.emoji}</div>

                            <div className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-500 leading-tight">
                                {stat.value}
                            </div>

                            <div className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-semibold mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
