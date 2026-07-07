import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle2, ChevronRight, Info, Droplets, RotateCcw } from 'lucide-react';

const API_BASE_URL = 'https://ml-inference-api.onrender.com';

const FEATURES_CONFIG = [
  { name: 'age', label: 'Age', tooltip: 'Age (scaled)', min: -0.2, max: 0.2, step: 0.001 },
  { name: 'sex', label: 'Sex', tooltip: 'Sex (scaled)', min: -0.2, max: 0.2, step: 0.001 },
  { name: 'bmi', label: 'Body Mass Index (BMI)', tooltip: 'BMI (scaled)', min: -0.2, max: 0.2, step: 0.001 },
  { name: 'bp', label: 'Blood Pressure', tooltip: 'Average blood pressure (scaled)', min: -0.2, max: 0.2, step: 0.001 },
  { name: 's1', label: 'Total Serum Cholesterol (S1)', tooltip: 'tc, T-Cells (scaled)', min: -0.2, max: 0.2, step: 0.001 },
  { name: 's2', label: 'Low-Density Lipoproteins (S2)', tooltip: 'ldl (scaled)', min: -0.2, max: 0.2, step: 0.001 },
  { name: 's3', label: 'High-Density Lipoproteins (S3)', tooltip: 'hdl (scaled)', min: -0.2, max: 0.2, step: 0.001 },
  { name: 's4', label: 'Total Cholesterol / HDL (S4)', tooltip: 'tch (scaled)', min: -0.2, max: 0.2, step: 0.001 },
  { name: 's5', label: 'Log of Serum Triglycerides (S5)', tooltip: 'ltg (scaled)', min: -0.2, max: 0.2, step: 0.001 },
  { name: 's6', label: 'Blood Sugar Level (S6)', tooltip: 'glu (scaled)', min: -0.2, max: 0.2, step: 0.001 },
];

const SAMPLE_DATA = [0.038, 0.050, 0.061, 0.021, -0.044, -0.034, -0.043, -0.002, 0.019, -0.017];

export default function App() {
  const [formData, setFormData] = useState(Array(10).fill(''));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (index, value) => {
    const newData = [...formData];
    newData[index] = value;
    setFormData(newData);
    // Clear errors when user types
    if (error) setError(null);
  };

  const loadSampleData = () => {
    setFormData(SAMPLE_DATA.map(String));
    setResult(null);
    setError(null);
  };

  const predictRisk = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const features = formData.map((val) => {
        const parsed = parseFloat(val);
        if (isNaN(parsed)) throw new Error("All fields must be valid numbers.");
        return parsed;
      });

      if (features.length !== 10) throw new Error("Exactly 10 features are required.");

      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      });

      if (!response.ok) {
        let errorMsg = `API Error: ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData.detail) errorMsg = JSON.stringify(errorData.detail);
        } catch (e) {}
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to connect to the prediction server.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(Array(10).fill(''));
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-200">
      {/* Header / Hero */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Diabetes Risk Predictor</h1>
              <p className="text-sm text-slate-500 font-medium">An AI-powered tool that estimates diabetes risk from health indicators.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200 shadow-inner">
            <span>Powered by Logistic Regression</span>
            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
            <span>FastAPI</span>
            <span className="w-1 h-1 rounded-full bg-slate-400"></span>
            <span>Docker</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Section */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-teal-500" />
                  Health Indicators
                </h2>
                <button
                  type="button"
                  onClick={loadSampleData}
                  className="text-sm font-medium text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Load Sample Data
                </button>
              </div>

              <form onSubmit={predictRisk} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  {FEATURES_CONFIG.map((config, idx) => (
                    <div key={config.name} className="relative group">
                      <label htmlFor={config.name} className="block text-sm font-medium text-slate-700 mb-1 flex justify-between items-center">
                        {config.label}
                        <div className="relative flex items-center">
                          <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                          <div className="absolute right-0 w-48 p-2 mt-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 bottom-full mb-2">
                            {config.tooltip}
                            <svg className="absolute text-slate-800 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                          </div>
                        </div>
                      </label>
                      <div className="relative">
                        <input
                          id={config.name}
                          type="number"
                          step={config.step}
                          min={config.min}
                          max={config.max}
                          placeholder={`e.g. ${config.min} to ${config.max}`}
                          value={formData[idx]}
                          onChange={(e) => handleInputChange(idx, e.target.value)}
                          required
                          className="block w-full rounded-lg border-slate-300 border px-3 py-2 text-slate-900 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm transition-colors"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="rounded-lg bg-red-50 p-4 border border-red-100 flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Error predicting risk</h3>
                      <p className="mt-1 text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <>Predict Risk <ChevronRight className="ml-1 w-4 h-4" /></>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="py-3 px-4 border border-slate-300 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Result Section */}
          <div className="lg:col-span-5 relative">
            <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-32 transition-all duration-500 transform ${result ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'}`}>
              
              {result && (
                <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                  <h2 className="text-sm font-semibold text-slate-500 tracking-wide uppercase mb-6">Assessment Result</h2>
                  
                  {/* Gauge visualization (simplified circle) */}
                  <div className="relative w-40 h-40 mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-100"
                        strokeWidth="3"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`${result.prediction === 1 ? 'text-rose-500' : 'text-emerald-500'} transition-all duration-1000 ease-out`}
                        strokeWidth="3"
                        strokeDasharray={`${(result.risk_probability || result.probability) * 100}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-slate-800">{Math.round((result.risk_probability || result.probability) * 100)}%</span>
                      <span className="text-xs text-slate-500">Probability</span>
                    </div>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${result.prediction === 1 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    {result.prediction === 1 ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                    <span className="font-bold text-lg">{result.prediction === 1 ? 'High Risk' : 'Low Risk'}</span>
                  </div>

                  <p className="text-sm text-slate-600 mb-8 max-w-xs">
                    {result.prediction === 1 
                      ? "The model suggests a higher likelihood of diabetes based on these metrics." 
                      : "The model suggests a lower likelihood of diabetes based on these metrics."}
                  </p>
                  
                  <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 flex justify-between items-center text-xs text-slate-500 mb-6">
                    <span className="font-medium">Inference Time</span>
                    <span className="font-mono text-slate-700 bg-white px-2 py-1 rounded border border-slate-200">
                      {result.inference_time_ms ? `${result.inference_time_ms}ms` : result.latency ? `${result.latency}s` : '<10ms'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 italic">
                    Disclaimer: This is a machine learning demo and not a medical diagnosis. Please consult a healthcare professional.
                  </p>
                </div>
              )}
            </div>
            
            {!result && (
              <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 hidden lg:flex">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
                  <Activity className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-semibold text-slate-600 mb-1">Awaiting Data</h3>
                <p className="text-xs text-slate-400 max-w-[200px]">Fill the form and predict to see the risk assessment results here.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            Diabetes Prediction ML Pipeline
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> ML Demo</span>
            <span className="flex items-center gap-1.5"><Droplets className="w-4 h-4" /> Health Tech</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
