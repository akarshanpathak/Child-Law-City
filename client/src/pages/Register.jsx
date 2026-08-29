import React, { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { register } from "../services/user.services";

const BUILDINGS = [
    {
        key: "name",
        label: "Statue Square",
        color: "#34C3FF",
        x: 55,
        width: 95,
        height: 190,
    },
    {
        key: "email",
        label: "Message Tower",
        color: "#FF6F91",
        x: 285,
        width: 80,
        height: 260,
    },
    {
        key: "gender",
        label: "Hero House",
        color: "#8C6FFF",
        x: 505,
        width: 85,
        height: 150,
    },
    {
        key: "dateOfBirth",
        label: "Birthday Bakery",
        color: "#5FD068",
        x: 725,
        width: 95,
        height: 210,
    },
    {
        key: "password",
        label: "Secret Vault",
        color: "#FFCB3D",
        x: 945,
        width: 100,
        height: 245,
    },
];

function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function lerpColor(hexA, hexB, t) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    const r = Math.round(a.r + (b.r - a.r) * t);
    const g = Math.round(a.g + (b.g - a.g) * t);
    const bl = Math.round(a.b + (b.b - a.b) * t);
    return `rgb(${r}, ${g}, ${bl})`;
}

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "Male",
        dateOfBirth: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const filled = useMemo(
        () => ({
            name: formData.name.trim().length > 0,
            email: formData.email.trim().length > 3,
            gender: true,
            dateOfBirth: formData.dateOfBirth.length > 0,
            password: formData.password.length > 0,
        }),
        [formData],
    );

    const defeatedCount = Object.values(filled).filter(Boolean).length;
    const t = defeatedCount / BUILDINGS.length;

    const skyTop = lerpColor("#5B5F73", "#2D2350", t);
    const skyBottom = lerpColor("#9CA3AF", "#F98D5B", t);
    const sunColor = lerpColor("#B7BAC4", "#FFD166", t);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await register(formData);
            alert("Yay! Registration Successful! 🎈");
            navigate("/");
        } catch (err) {
            console.error("Registration Error:", err);
            setError(
                err.response?.data?.message || "Oops! Something went wrong. Try again!",
            );
        } finally {
            setLoading(false);
        }
    };

    const today = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ fontFamily: "'Noto Sans', sans-serif" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@600;700&family=Noto+Sans:wght@400;600;700&family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;600;700;800&display=swap');
        .ccl-serif { font-family: 'Noto Serif', serif; }
        .ccl-display { font-family: 'Baloo 2', 'Nunito', sans-serif; }
        .ccl-body { font-family: 'Nunito', sans-serif; }
        .ccl-building { transition: filter 0.7s ease, transform 0.4s ease; }
        .ccl-building.grumbled { filter: grayscale(1) brightness(0.85); }
        .ccl-building.popped { animation: ccl-pop 0.55s ease; }
        .ccl-grumble { transition: opacity 0.5s ease, transform 0.5s ease; transform-origin: center; }
        .ccl-input:focus { outline: 3px solid var(--focus-color, #8C6FFF); outline-offset: 2px; }
        .ccl-dot { transition: background-color 0.5s ease, transform 0.3s ease; }
        .ccl-glass { background: rgba(255,255,255,0.20); backdrop-filter: blur(22px) saturate(140%); -webkit-backdrop-filter: blur(22px) saturate(140%); box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), inset 0 0 0 1px rgba(255,255,255,0.15); }
        .ccl-glass-dark { background: rgba(11,53,88,0.32); backdrop-filter: blur(14px) saturate(140%); -webkit-backdrop-filter: blur(14px) saturate(140%); }
        .ccl-field-glass { background: rgba(255,255,255,0.55); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
        @keyframes ccl-pop { 0% { transform: scale(0.85); } 60% { transform: scale(1.08); } 100% { transform: scale(1); } }
        @keyframes ccl-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .ccl-float { animation: ccl-float 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ccl-float, .ccl-building, .ccl-grumble { animation: none !important; transition: none !important; }
        }
      `}</style>

            <div className="w-full h-1.5 flex">
                <div className="flex-1" style={{ backgroundColor: "#FF9933" }} />
                <div className="flex-1 bg-white" />
                <div className="flex-1" style={{ backgroundColor: "#128807" }} />
            </div>

            <div
                className="w-full text-white text-xs ccl-body"
                style={{ backgroundColor: "#07263F" }}
            >
                <div className="max-w-6xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
                    <span>
                        Skip to Main Content &nbsp;|&nbsp; Screen Reader Access
                        &nbsp;|&nbsp; अ- अ अ+
                    </span>
                    <span>हिन्दी &nbsp;|&nbsp; English &nbsp;|&nbsp; {today}</span>
                </div>
            </div>

            <header className="w-full" style={{ backgroundColor: "#0B3558" }}>
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
                    <svg width="56" height="56" viewBox="0 0 100 100" aria-hidden="true">
                        <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke="#FFCB3D"
                            strokeWidth="3"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="38"
                            fill="none"
                            stroke="#FFCB3D"
                            strokeWidth="1.5"
                            strokeDasharray="2 4"
                        />
                        <path
                            d="M50 22 L58 42 L80 42 L62 55 L69 76 L50 63 L31 76 L38 55 L20 42 L42 42 Z"
                            fill="#FFCB3D"
                            opacity="0.9"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="10"
                            fill="#0B3558"
                            stroke="#FFCB3D"
                            strokeWidth="2"
                        />
                    </svg>
                    <div>
                        <h1 className="ccl-serif text-white text-xl md:text-2xl font-bold leading-tight">
                            बाल कानून नगर | Child Law City
                        </h1>
                        <p className="ccl-serif text-slate-200 text-xs md:text-sm">
                            Ministry of Playful Justice &nbsp;•&nbsp; Official Player
                            Registration Portal
                        </p>
                    </div>
                </div>
            </header>

            <main className="relative flex-1 flex items-center justify-center overflow-hidden py-10 px-4">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(180deg, ${skyTop} 0%, ${skyBottom} 100%)`,
                    }}
                >
                    <svg
                        viewBox="0 0 1200 400"
                        className="absolute bottom-0 w-full h-full"
                        preserveAspectRatio="xMidYMax meet"
                        aria-hidden="true"
                    >
                        <circle
                            cx="1130"
                            cy="60"
                            r="34"
                            fill={sunColor}
                            className="ccl-float"
                        />
                        <rect x="0" y="380" width="1200" height="20" fill="#241B3A" />
                        {BUILDINGS.map((b) => {
                            const isFilled = filled[b.key];
                            const winRows = Math.max(1, Math.floor((b.height - 20) / 34));
                            return (
                                <g
                                    key={b.key}
                                    transform={`translate(${b.x}, ${380 - b.height})`}
                                >
                                    <rect
                                        width={b.width}
                                        height={b.height}
                                        rx="12"
                                        fill={b.color}
                                        className={`ccl-building ${isFilled ? "popped" : "grumbled"}`}
                                    />
                                    {Array.from({ length: winRows }).map((_, i) => (
                                        <rect
                                            key={i}
                                            x={b.width / 2 - 9}
                                            y={16 + i * 34}
                                            width="18"
                                            height="18"
                                            rx="3"
                                            fill="rgba(255,255,255,0.85)"
                                        />
                                    ))}
                                    <g
                                        className="ccl-grumble ccl-float"
                                        transform={`translate(${b.width / 2}, -18)`}
                                        style={{
                                            opacity: isFilled ? 0 : 1,
                                            transform: isFilled ? "scale(0)" : "scale(1)",
                                        }}
                                    >
                                        <ellipse cx="0" cy="0" rx="17" ry="14" fill="#9CA3AF" />
                                        <circle cx="-6" cy="-2" r="2.6" fill="#1B1F3B" />
                                        <circle cx="6" cy="-2" r="2.6" fill="#1B1F3B" />
                                        <path
                                            d="M -6 7 Q 0 3 6 7"
                                            stroke="#1B1F3B"
                                            strokeWidth="1.5"
                                            fill="none"
                                            strokeLinecap="round"
                                        />
                                    </g>
                                </g>
                            );
                        })}
                    </svg>
                </div>

                <div className="relative z-10 w-full max-w-3xl">
                    <div className="ccl-glass rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                        <div className="ccl-glass-dark px-6 py-3 flex items-center justify-between flex-wrap gap-2">
                            <p className="text-white font-bold text-sm ccl-body">
                                {defeatedCount} of {BUILDINGS.length} Grumbles defeated!
                            </p>
                            <div className="flex gap-2">
                                {BUILDINGS.map((b) => (
                                    <span
                                        key={b.key}
                                        className="ccl-dot w-3 h-3 rounded-full"
                                        style={{
                                            backgroundColor: filled[b.key] ? b.color : "#94A3B8",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="p-6 md:p-8">
                            <div className="text-center mb-6">
                                <h2
                                    className="ccl-display text-2xl md:text-3xl font-extrabold"
                                    style={{ color: "#0B3558" }}
                                >
                                    Create your player profile!
                                </h2>
                                <p className="ccl-body text-slate-700 font-semibold text-sm mt-1">
                                    Every answer wakes up a piece of the city.
                                </p>
                            </div>

                            {error && (
                                <div
                                    className="border-l-4 p-3 rounded-lg mb-5 font-bold flex items-center gap-2 text-sm ccl-body"
                                    style={{
                                        backgroundColor: "rgba(255,227,234,0.9)",
                                        borderColor: "#FF6F91",
                                        color: "#9C2B47",
                                    }}
                                >
                                    <span>⚠️</span> {error}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="ccl-body grid grid-cols-1 md:grid-cols-2 gap-4"
                                style={{ color: "#1B1F3B" }}
                            >
                                <div>
                                    <label className="block text-sm font-bold mb-1.5">
                                        What's your name?  
                                        <span
                                            className="block text-xs font-semibold"
                                            style={{ color: "#1E86C7" }}
                                        >
                                            Raises Statue Square 🗽
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="ccl-input w-full p-3.5 bg-white/70 border-2 rounded-xl text-base placeholder-slate-400"
                                        style={{
                                            borderColor: "rgba(255,255,255,0.8)",
                                            "--focus-color": "#34C3FF",
                                        }}
                                        placeholder="e.g., Arnav"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-1.5">
                                        Parent's Email  
                                        <span
                                            className="block text-xs font-semibold"
                                            style={{ color: "#D6416B" }}
                                        >
                                            Wakes the Message Tower 📨
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="ccl-input w-full p-3.5 bg-white/70 border-2 rounded-xl text-base placeholder-slate-400"
                                        style={{
                                            borderColor: "rgba(255,255,255,0.8)",
                                            "--focus-color": "#FF6F91",
                                        }}
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-1.5">
                                        I am a... 
                                        <span
                                            className="block text-xs font-semibold"
                                            style={{ color: "#6C4CD9" }}
                                        >
                                            Builds Hero House 🦸
                                        </span>
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="ccl-input w-full p-3.5 bg-white/70 border-2 rounded-xl text-base cursor-pointer font-semibold"
                                        style={{
                                            borderColor: "rgba(255,255,255,0.8)",
                                            "--focus-color": "#8C6FFF",
                                        }}
                                        required
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-1.5">
                                        When's your birthday? 🎂
                                        <span
                                            className="block text-xs font-semibold"
                                            style={{ color: "#3F9E4E" }}
                                        >
                                            Opens Birthday Bakery 🎂
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        className="ccl-input w-full p-3.5 bg-white/70 border-2 rounded-xl text-base text-slate-700"
                                        style={{
                                            borderColor: "rgba(255,255,255,0.8)",
                                            "--focus-color": "#5FD068",
                                        }}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold mb-1.5">
                                        Secret Password 🔐
                                        <span
                                            className="ml-2 text-xs font-semibold"
                                            style={{ color: "#B5860A" }}
                                        >
                                            Unlocks the Secret Vault 🔐
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="ccl-input w-full p-3.5 bg-white/70 border-2 rounded-xl text-base placeholder-slate-400"
                                        style={{
                                            borderColor: "rgba(255,255,255,0.8)",
                                            "--focus-color": "#FFCB3D",
                                        }}
                                        placeholder="Keep it a secret!"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="cursor-pointer md:col-span-2 mt-1 p-3.5 rounded-xl font-black text-lg transition-all duration-150 active:translate-y-1 flex justify-center items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        backgroundColor: "#FFCB3D",
                                        color: "#5A3E00",
                                        borderBottom: "4px solid #D9A116",
                                    }}
                                >
                                    {loading ? "Building your city..." : "Start Adventure! 🚀"}
                                </button>

                                <div className="md:col-span-2 w-full flex justify-center items-center">
                                    <button
                                        type="button"
                                        onClick={() => navigate("/login")}
                                        className="cursor-pointer mt-1 font-extrabold hover:underline"
                                        style={{ color: "#0B6FA4" }}
                                    >
                                        Already have account? Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <footer
                className="w-full text-slate-200 ccl-body"
                style={{ backgroundColor: "#07263F" }}
            >
                <div className="max-w-6xl mx-auto px-4 py-3 text-xs flex flex-wrap items-center justify-between gap-1">
                    <span>
                        © 2026 Child Law City. Content owned by the Ministry of Playful
                        Justice.
                    </span>
                    <span>Portal last reviewed & updated on {today}</span>
                </div>
            </footer>
        </div>
    );
}
