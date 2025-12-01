import React, { useState } from "react";

export default function PerformanceAnalyzer() {
  const [form, setForm] = useState({ tenth: "", twelfth: "", cgpa: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showResultPage, setShowResultPage] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const runAssessment = () => {
    const { tenth, twelfth, cgpa } = form;
    if (!tenth || !twelfth || !cgpa) {
      alert("Please fill all fields");
      return;
    }

    setShowResultPage(true);
    setLoading(true);

    setTimeout(() => {
      const cgpaPercent = cgpa * 9.5;
      const finalScore = tenth * 0.2 + twelfth * 0.3 + cgpaPercent * 0.5;
      const xp = Math.round(finalScore * 100);

      // Badge + Hero
      let badge = "", hero = "";
      if (finalScore >= 90) { badge = "🌟" ; hero = "⚡ Thor"; }
      else if (finalScore >= 80) { badge = "🔥"; hero = "🔮 Doctor Strange"; }
      else if (finalScore >= 70) { badge = "🛡️"; hero = "⚔️ Thanos"; }
      else if (finalScore >= 60) { badge = "🎯"; hero = "👹 Red Skull"; }
      else { badge = "🚀"; hero = "👺 Malekith"; }
    

      // Review
      let review = "";
      if (finalScore >= 90) review = "Exceptional student with outstanding consistency.";
      else if (finalScore >= 80) review = "Hard-working student with very strong academic skills.";
      else if (finalScore >= 70) review = "Good performer with stable academic strengths.";
      else if (finalScore >= 60) review = "Average but improving — has potential with guidance.";
      else review = "Needs improvement — focus on basics and consistency.";

      setResult({ score: Math.round(finalScore), xp, badge, hero, review });
      setLoading(false);
    }, 3000); // loading time
  };

  // Input page
  if (!showResultPage)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black to-indigo-500 p-6">
        <div className=  "bg-gradient-to-br from-blue-950 to-gray-600  backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-white/20 animate-fadeIn">
          <h1 className="text-white text-2xl font-semibold font-serif text-center mb-6">📈 Academic Score Analyzer</h1>
          <div className="space-y-4">
            <input type="number" name="tenth" placeholder="10th Percentage (%)" value={form.tenth} onChange={handleChange}
              className="w-full text-center p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-blue-300" />
            <input type="number" name="twelfth" placeholder="12th Percentage (%)" value={form.twelfth} onChange={handleChange}
              className="w-full text-center p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-blue-300" />
            <input type="number" step="0.1" name="cgpa" placeholder="Overall CGPA" value={form.cgpa} onChange={handleChange}
              className="w-full text-center p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <button onClick={runAssessment}
            className="w-full mt-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:scale-105">
            Run Assessment
          </button>
        </div>
      </div>
    );

  // Result Page
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black to-blue-950 p-6 text-white">
      {loading ? (
        <div className="flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-white border-solid mb-4"></div>
          <p className="text-xl font-semibold">Processing Assessment...</p>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-2xl shadow-2xl border border-white/20 animate-fadeIn">
          <h1 className="text-4xl font-serif font-bolder text-center mb-6 text-white">📊 Performance Report</h1>
          <h2 className="text-2xl font-bold text-center">🏆 XP Earned: <span className="text-yellow-300">{result.xp} XP</span></h2>
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-6 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-green-300 transition-all duration-[2000ms] ease-out"
                style={{ width: `${result.score}%` }}></div>
            </div>
            <p className="text-center mt-2 text-lg font-semibold">Performance Score: <span className="text-green-300">{result.score}/100</span></p>
          </div>
          {/* Badge and Hero */}
          <div className="mt-6 text-center">
            <p className="text-8xl font-bold">{result.badge}</p>
            <p className="text-5xl mt-5 font-mono"><span className="text-shadow-white">{result.hero}</span></p>
          </div>
          {/* Review */}
          <p className="mt-6 text-center text-lg bg-black/20 p-4 rounded-lg border border-white/20">{result.review}</p>
        </div>
      )}
    </div>
  );
}
