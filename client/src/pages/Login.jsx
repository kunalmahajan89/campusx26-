import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Shield, Sparkles, User, GraduationCap } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: "Provide a valid university email" }),
  password: z.string().min(6, { message: "Security token must be at least 6 characters" })
});

const signupSchema = z.object({
  name: z.string().min(2, { message: "Provide your real full name" }),
  email: z.string().email({ message: "Provide a valid university email" }),
  branch: z.string().min(2, { message: "Select your engineering branch" }),
  password: z.string().min(6, { message: "Security token must be at least 6 characters" })
});

export default function Login() {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [selectedRole, setSelectedRole] = useState('student');
  const navigate = useNavigate();
  const { login, signup, error } = useAuthStore();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors }
  } = useForm({
    resolver: zodResolver(signupSchema)
  });

  const onLogin = (data) => {
    const success = login(data.email, data.password);
    if (success) {
      toast.success("Authentication sequence complete. Core access granted! ⚡");
      navigate('/dashboard');
    } else {
      toast.error(error || "Access denied. Credentials do not match mock systems.");
    }
  };

  const onSignup = (data) => {
    const success = signup(data.name, data.email, selectedRole, data.branch);
    if (success) {
      toast.success("Account initialized! Profile registered in database simulation. 🚀");
      navigate('/dashboard');
    } else {
      toast.error("Account creation sequence failed.");
    }
  };

  const roles = [
    { id: 'student', title: 'Student', icon: User, desc: 'Learn, practice DSA, build streaks.' },
    { id: 'teacher', title: 'Teacher', icon: GraduationCap, desc: 'Validate lab tasks, monitor student grades.' },
    { id: 'senior', title: 'Senior', icon: Shield, desc: 'Provide referral codes, review portfolios.' }
  ];

  return (
    <div className="space-y-6">
      {/* Dynamic Tab Selector */}
      <div className="flex border-b border-white/5 pb-2">
        <button
          onClick={() => setIsLoginTab(true)}
          className={`flex-1 text-center py-2.5 font-bold text-sm transition-all duration-300 border-b-2
            ${isLoginTab 
              ? 'text-primary border-primary' 
              : 'text-slate-500 border-transparent hover:text-slate-300'
            }
          `}
        >
          AUTH_SYSTEM.IN
        </button>
        <button
          onClick={() => setIsLoginTab(false)}
          className={`flex-1 text-center py-2.5 font-bold text-sm transition-all duration-300 border-b-2
            ${!isLoginTab 
              ? 'text-primary border-primary' 
              : 'text-slate-500 border-transparent hover:text-slate-300'
            }
          `}
        >
          INITIALIZE_PROFILE
        </button>
      </div>

      {isLoginTab ? (
        /* LOGIN SEQUENCE FORM */
        <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-5">
          <div className="text-center space-y-1 mb-2">
            <h3 className="text-xl font-bold text-white">Access Credentials</h3>
            <p className="text-xs text-slate-500 font-mono">Use kunal@campusx.edu or similar mock blueprints</p>
          </div>

          <Input
            label="University Email"
            type="email"
            placeholder="e.g. kunal@campusx.edu"
            register={loginRegister('email')}
            error={loginErrors.email}
          />

          <Input
            label="Access Token / Password"
            type="password"
            placeholder="••••••••"
            register={loginRegister('password')}
            error={loginErrors.password}
          />

          <Button type="submit" variant="primary" className="w-full mt-2 py-3">
            Establish Connection
          </Button>
        </form>
      ) : (
        /* SIGNUP/REGISTRATION SYSTEM */
        <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Platform Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300
                      ${isSelected 
                        ? 'border-primary bg-primary/10 text-primary shadow-glow-blue' 
                        : 'border-white/5 bg-slate-950/20 text-slate-400 hover:border-white/10 hover:text-slate-300'
                      }
                    `}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{role.title}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-500 font-mono italic text-center pt-1">
              {roles.find(r => r.id === selectedRole)?.desc}
            </p>
          </div>

          <Input
            label="Engineering Profile Name"
            placeholder="Full Name"
            register={signupRegister('name')}
            error={signupErrors.name}
          />

          <Input
            label="Email Network Anchor"
            type="email"
            placeholder="e.g. name@campusx.edu"
            register={signupRegister('email')}
            error={signupErrors.email}
          />

          <Input
            label="Branch / Focus Area"
            placeholder="e.g. Computer Science, Electrical"
            register={signupRegister('branch')}
            error={signupErrors.branch}
          />

          <Input
            label="Secure Password (6+ Char)"
            type="password"
            placeholder="••••••••"
            register={signupRegister('password')}
            error={signupErrors.password}
          />

          <Button type="submit" variant="primary" className="w-full py-3 mt-2">
            Instantiate Core Instance
          </Button>
        </form>
      )}
    </div>
  );
}
