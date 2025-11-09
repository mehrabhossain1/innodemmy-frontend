"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, Lock, User as UserIcon, CheckCircle2, ArrowLeft, KeyRound, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

interface AuthSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

type AuthView = "login" | "register" | "verify-email" | "forgot-password" | "reset-password";

export default function AuthSidebar({ isOpen, onClose }: AuthSidebarProps) {
    const [activeView, setActiveView] = useState<AuthView>("login");
    const [pendingEmail, setPendingEmail] = useState("");

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [verifyData, setVerifyData] = useState({
        code: "",
    });

    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: "",
    });

    const [resetPasswordData, setResetPasswordData] = useState({
        code: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [resendCooldown, setResendCooldown] = useState(0);

    const router = useRouter();
    const { login } = useAuth();

    // Cooldown timer for resend OTP
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                login(data.token, data.user);
                setSuccess("Login successful! Redirecting...");
                setLoginData({ email: "", password: "" });

                setTimeout(() => {
                    onClose();
                    if (data.user.role === "admin") {
                        router.push("/admin/dashboard");
                    } else {
                        router.push("/dashboard");
                    }
                }, 1000);
            } else {
                // Check if user needs verification
                if (data.needsVerification) {
                    setPendingEmail(loginData.email);
                    setActiveView("verify-email");
                    setError("Please verify your email first. Check your inbox for the verification code.");
                } else {
                    setError(data.error || "Login failed");
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (registerData.password !== registerData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (registerData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: registerData.name,
                    email: registerData.email,
                    password: registerData.password,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setPendingEmail(registerData.email);
                setSuccess("Account created! Check your email for the verification code.");
                setRegisterData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });

                // Switch to verification view
                setTimeout(() => {
                    setActiveView("verify-email");
                    setSuccess("");
                }, 2000);
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            console.error("Registration error:", err);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/verify-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: pendingEmail,
                    code: verifyData.code,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                login(data.token, data.user);
                setSuccess("Email verified successfully! Redirecting...");
                setVerifyData({ code: "" });

                setTimeout(() => {
                    onClose();
                    router.push("/dashboard");
                }, 1000);
            } else {
                if (data.expired || data.maxAttemptsReached) {
                    setError(data.error + " Click 'Resend Code' to get a new one.");
                } else {
                    setError(data.error || "Verification failed");
                }
            }
        } catch (err) {
            console.error("Verification error:", err);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (resendCooldown > 0) return;

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/resend-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: pendingEmail }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess("Verification code resent! Check your email.");
                setResendCooldown(60); // 60 seconds cooldown
            } else {
                setError(data.error || "Failed to resend code");
            }
        } catch (err) {
            console.error("Resend OTP error:", err);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: forgotPasswordData.email }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setPendingEmail(forgotPasswordData.email);
                setSuccess("Password reset code sent! Check your email.");

                setTimeout(() => {
                    setActiveView("reset-password");
                    setSuccess("");
                }, 2000);
            } else {
                setError(data.error || "Failed to send reset code");
            }
        } catch (err) {
            console.error("Forgot password error:", err);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        if (resetPasswordData.newPassword.length < 6) {
            setError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: pendingEmail,
                    code: resetPasswordData.code,
                    newPassword: resetPasswordData.newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess("Password reset successful! You can now login.");
                setResetPasswordData({ code: "", newPassword: "", confirmPassword: "" });

                setTimeout(() => {
                    setActiveView("login");
                    setSuccess("");
                }, 2000);
            } else {
                if (data.expired || data.maxAttemptsReached) {
                    setError(data.error + " Please request a new code.");
                } else {
                    setError(data.error || "Password reset failed");
                }
            }
        } catch (err) {
            console.error("Reset password error:", err);
            setError("Unable to connect to the server. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const resetToLogin = () => {
        setActiveView("login");
        setError("");
        setSuccess("");
        setPendingEmail("");
        setVerifyData({ code: "" });
        setResetPasswordData({ code: "", newPassword: "", confirmPassword: "" });
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div
                className={`fixed right-0 top-0 h-full w-full sm:w-[480px] bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
                    <div className="flex items-center gap-3">
                        {(activeView === "verify-email" || activeView === "forgot-password" || activeView === "reset-password") && (
                            <button
                                onClick={resetToLogin}
                                className="p-2 hover:bg-accent rounded-full transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-foreground" />
                            </button>
                        )}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">
                                {activeView === "login" && "Welcome Back!"}
                                {activeView === "register" && "Join Innodemy"}
                                {activeView === "verify-email" && "Verify Email"}
                                {activeView === "forgot-password" && "Reset Password"}
                                {activeView === "reset-password" && "Create New Password"}
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                {activeView === "login" && "Sign in to continue your learning journey"}
                                {activeView === "register" && "Start your learning journey today"}
                                {activeView === "verify-email" && "Enter the code sent to your email"}
                                {activeView === "forgot-password" && "We'll send you a reset code"}
                                {activeView === "reset-password" && "Enter the code and new password"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-foreground" />
                    </button>
                </div>

                {/* Tabs (only show for login/register) */}
                {(activeView === "login" || activeView === "register") && (
                    <div className="flex border-b border-border">
                        <button
                            onClick={() => {
                                setActiveView("login");
                                setError("");
                                setSuccess("");
                            }}
                            className={`flex-1 py-4 text-center font-semibold transition-all ${
                                activeView === "login"
                                    ? "text-primary border-b-2 border-primary bg-accent/50"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => {
                                setActiveView("register");
                                setError("");
                                setSuccess("");
                            }}
                            className={`flex-1 py-4 text-center font-semibold transition-all ${
                                activeView === "register"
                                    ? "text-primary border-b-2 border-primary bg-accent/50"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                            }`}
                        >
                            Register
                        </button>
                    </div>
                )}

                {/* Content */}
                <div className="p-6 overflow-y-auto h-[calc(100%-220px)]">
                    {/* Success/Error Messages */}
                    {success && (
                        <div className="mb-4 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                                {success}
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
                            <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Login Form */}
                    {activeView === "login" && (
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="login-email" className="text-foreground font-medium">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={loginData.email}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, email: e.target.value })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="login-password" className="text-foreground font-medium">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={loginData.password}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, password: e.target.value })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-gray-900"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveView("forgot-password");
                                        setError("");
                                        setSuccess("");
                                    }}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Forgot Password?
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveView("register")}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Register Form */}
                    {activeView === "register" && (
                        <form onSubmit={handleRegister} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="register-name" className="text-foreground font-medium">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="register-name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={registerData.name}
                                        onChange={(e) =>
                                            setRegisterData({ ...registerData, name: e.target.value })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-email" className="text-foreground font-medium">
                                    Email Address <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="register-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={registerData.email}
                                        onChange={(e) =>
                                            setRegisterData({ ...registerData, email: e.target.value })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    We'll send a verification code to this email
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-password" className="text-foreground font-medium">
                                    Password <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="register-password"
                                        type="password"
                                        placeholder="At least 6 characters"
                                        value={registerData.password}
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-confirm-password" className="text-foreground font-medium">
                                    Confirm Password <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="register-confirm-password"
                                        type="password"
                                        placeholder="Re-enter your password"
                                        value={registerData.confirmPassword}
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-gray-900"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                                        Creating Account...
                                    </div>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>

                            <div className="text-center text-sm">
                                <span className="text-muted-foreground">
                                    Already have an account?{" "}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setActiveView("login")}
                                    className="text-primary hover:underline font-semibold"
                                >
                                    Sign In
                                </button>
                            </div>

                            <p className="text-xs text-muted-foreground text-center">
                                By creating an account, you agree to our{" "}
                                <Link href="/terms" className="text-primary hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-primary hover:underline">
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </form>
                    )}

                    {/* Verify Email Form */}
                    {activeView === "verify-email" && (
                        <form onSubmit={handleVerifyEmail} className="space-y-5">
                            <div className="bg-accent/50 p-4 rounded-lg border border-border">
                                <p className="text-sm text-muted-foreground">
                                    We sent a 6-digit verification code to:
                                </p>
                                <p className="text-sm font-semibold text-foreground mt-1">
                                    {pendingEmail}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="verify-code" className="text-foreground font-medium">
                                    Verification Code
                                </Label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="verify-code"
                                        type="text"
                                        placeholder="Enter 6-digit code"
                                        value={verifyData.code}
                                        onChange={(e) =>
                                            setVerifyData({ code: e.target.value.replace(/\D/g, '').slice(0, 6) })
                                        }
                                        className="h-12 pl-10 text-center text-2xl tracking-widest"
                                        maxLength={6}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Code expires in 10 minutes. Max 3 attempts.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-gray-900"
                                disabled={loading || verifyData.code.length !== 6}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                                        Verifying...
                                    </div>
                                ) : (
                                    "Verify Email"
                                )}
                            </Button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={resendCooldown > 0 || loading}
                                    className="text-sm text-primary hover:underline font-medium disabled:text-muted-foreground disabled:no-underline flex items-center gap-2 justify-center mx-auto"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    {resendCooldown > 0
                                        ? `Resend Code (${resendCooldown}s)`
                                        : "Resend Code"}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Forgot Password Form */}
                    {activeView === "forgot-password" && (
                        <form onSubmit={handleForgotPassword} className="space-y-5">
                            <div className="bg-accent/50 p-4 rounded-lg border border-border">
                                <p className="text-sm text-muted-foreground">
                                    Enter your email address and we'll send you a code to reset your password.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="forgot-email" className="text-foreground font-medium">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="forgot-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={forgotPasswordData.email}
                                        onChange={(e) =>
                                            setForgotPasswordData({ email: e.target.value })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-gray-900"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                                        Sending Code...
                                    </div>
                                ) : (
                                    "Send Reset Code"
                                )}
                            </Button>
                        </form>
                    )}

                    {/* Reset Password Form */}
                    {activeView === "reset-password" && (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div className="bg-accent/50 p-4 rounded-lg border border-border">
                                <p className="text-sm text-muted-foreground">
                                    We sent a reset code to:
                                </p>
                                <p className="text-sm font-semibold text-foreground mt-1">
                                    {pendingEmail}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reset-code" className="text-foreground font-medium">
                                    Reset Code
                                </Label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="reset-code"
                                        type="text"
                                        placeholder="Enter 6-digit code"
                                        value={resetPasswordData.code}
                                        onChange={(e) =>
                                            setResetPasswordData({
                                                ...resetPasswordData,
                                                code: e.target.value.replace(/\D/g, '').slice(0, 6)
                                            })
                                        }
                                        className="h-12 pl-10 text-center text-2xl tracking-widest"
                                        maxLength={6}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reset-new-password" className="text-foreground font-medium">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="reset-new-password"
                                        type="password"
                                        placeholder="At least 6 characters"
                                        value={resetPasswordData.newPassword}
                                        onChange={(e) =>
                                            setResetPasswordData({
                                                ...resetPasswordData,
                                                newPassword: e.target.value,
                                            })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reset-confirm-password" className="text-foreground font-medium">
                                    Confirm New Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="reset-confirm-password"
                                        type="password"
                                        placeholder="Re-enter new password"
                                        value={resetPasswordData.confirmPassword}
                                        onChange={(e) =>
                                            setResetPasswordData({
                                                ...resetPasswordData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-gray-900"
                                disabled={loading || resetPasswordData.code.length !== 6}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                                        Resetting Password...
                                    </div>
                                ) : (
                                    "Reset Password"
                                )}
                            </Button>
                        </form>
                    )}
                </div>

                {/* Footer Note */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-t border-border">
                    <p className="text-xs text-center text-muted-foreground">
                        Need help? Contact us:{" "}
                        <a href="mailto:Contact@innodemy.com" className="text-primary hover:underline font-medium">
                            Contact@innodemy.com
                        </a>
                        {" or "}
                        <a href="tel:+8801704258972" className="text-primary hover:underline font-medium">
                            +880 1704 258972
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
