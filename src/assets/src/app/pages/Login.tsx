import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export function Login() {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(() => searchParams.get("mode") !== "signup");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsLogin(searchParams.get("mode") !== "signup");
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2 text-white">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-white/60">
              {isLogin
                ? "Sign in to your account to continue shopping"
                : "Join ADITYA and start shopping today"}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 backdrop-blur-md bg-white/5 border-2 border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-white">Continue with Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 backdrop-blur-md bg-white/5 border-2 border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-white">Continue with Facebook</span>
            </button>

            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 backdrop-blur-md bg-white/5 border-2 border-white/10 rounded-xl hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1 5v10l8-5-8-5z" />
              </svg>
              <span className="text-white">Continue with Apple</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 backdrop-blur-md bg-white/5 text-white/50">Or continue with email</span>
            </div>
          </div>

          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm mb-2 text-white/70">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-white/40" />
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm mb-2 text-white/70">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-white/40" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2 text-white/70">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-white/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-white/40" />
                  ) : (
                    <Eye className="w-5 h-5 text-white/40" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm mb-2 text-white/70">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-white/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="w-4 h-4" />
                  <label htmlFor="remember" className="text-sm text-white/70">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-white hover:text-white/80">
                  Forgot password?
                </a>
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="w-4 h-4 mt-1" />
                <label htmlFor="terms" className="text-sm text-white/70">
                  I agree to the{" "}
                  <a href="#" className="text-white hover:text-white/80">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-white hover:text-white/80">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-4 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-2xl hover:bg-white/30 transition-all"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/60">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-white/80 font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-white/60 hover:text-white">
                Continue as guest
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-white/60">
            By continuing, you agree to our{" "}
            <a href="#" className="text-white hover:text-white/80">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-white hover:text-white/80">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
