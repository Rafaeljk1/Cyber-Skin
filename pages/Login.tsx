
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length >= 3) onLogin(username);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden max-w-md mx-auto shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full space-y-12 text-center">
        <div className="space-y-3">
          <div className="w-16 h-16 bg-cyan-500 rounded-2xl mx-auto flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.4)]">
             <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
             </svg>
          </div>
          <h1 className="font-space font-bold text-4xl tracking-tighter">AETHER<span className="text-cyan-400">FORGE</span></h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">Sincronização de Neural Link</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Identificação do Usuário</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu codinome..."
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-slate-100 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-700"
            />
          </div>
          <button 
            type="submit"
            className={`w-full py-4 rounded-2xl font-space font-bold text-sm tracking-widest transition-all
              ${username.trim().length >= 3 
                ? 'bg-cyan-500 text-black shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'}
            `}
          >
            CONECTAR
          </button>
        </form>

        <p className="text-[9px] text-slate-600 uppercase font-bold tracking-[0.2em]">Protocolo v2.4 Secure Forging</p>
      </div>
    </div>
  );
};

export default Login;
