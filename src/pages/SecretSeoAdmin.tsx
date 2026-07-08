import React, { useState } from 'react';
import { Play, Loader2, CheckCircle, AlertCircle, Lock } from 'lucide-react';

export default function SecretSeoAdmin() {
  const [adminToken, setAdminToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleRunSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) {
      setStatus('error');
      setMessage('Please enter the Admin Secret Token.');
      return;
    }

    setLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/seo/run-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }

      setStatus('success');
      setMessage(
        `Search executed successfully. Parsed: ${data.resultsParsed || 0}, Inserted: ${data.newUrlsInserted || 0}.`
      );
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || 'An unexpected error occurred while executing the search.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans text-gray-900">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        
        <div className="bg-gray-900 p-6 text-white flex items-center gap-3">
          <Lock className="w-5 h-5 text-gray-400" />
          <h1 className="text-lg font-medium tracking-tight">SEO Automation Engine</h1>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleRunSearch} className="space-y-4">
            
            <div className="space-y-2">
              <label htmlFor="admin-token" className="block text-sm font-medium text-gray-700">
                Admin Secret Token
              </label>
              <input
                id="admin-token"
                type="password"
                value={adminToken}
                onChange={(e) => setAdminToken(e.target.value)}
                placeholder="Enter ADMIN_SECRET"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              {loading ? 'Executing Search...' : 'Run SEO Engine'}
            </button>
          </form>

          {status !== 'idle' && (
            <div
              className={`p-4 rounded-lg flex items-start gap-3 border ${
                status === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {status === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="text-sm font-medium">{message}</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
