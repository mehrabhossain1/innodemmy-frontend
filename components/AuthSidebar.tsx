"use client";

import { useState, useEffect } from "react";
import {
    useLogin,
    useRegister,
    useForgotPassword,
    useResetPassword,
} from "@/lib/hooks";
import {
    X,
    Mail,
    Lock,
    User as UserIcon,
    CheckCircle2,
    ArrowLeft,
    KeyRound,
    Loader2,
    Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface AuthSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: "login" | "register";
}

type AuthView = "login" | "register" | "forgot-password" | "reset-password";

export default function AuthSidebar({
    isOpen,
    onClose,
    initialView = "login",
}: AuthSidebarProps) {
    const [activeView, setActiveView] = useState<AuthView>(initialView);
    const [pendingEmail, setPendingEmail] = useState("");

    // React Query mutations
    const loginMutation = useLogin();
    const registerMutation = useRegister();
    const forgotPasswordMutation = useForgotPassword();
    const resetPasswordMutation = useResetPassword();

    // Update active view when initialView changes
    useEffect(() => {
        if (isOpen) {
            setActiveView(initialView);
        }
    }, [isOpen, initialView]);

    const [loginData, setLoginData] = useState({
        identifier: "", // email or phone
        password: "",
    });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: "",
    });

    const [resetPasswordData, setResetPasswordData] = useState({
        code: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Close sidebar on successful auth
    useEffect(() => {
        if (loginMutation.isSuccess || registerMutation.isSuccess) {
            setTimeout(() => {
                onClose();
            }, 1000);
        }
    }, [loginMutation.isSuccess, registerMutation.isSuccess, onClose]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!loginData.identifier || !loginData.password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await loginMutation.mutateAsync({
                identifier: loginData.identifier,
                password: loginData.password,
            });
            // Success handled by mutation onSuccess (redirects + toast)
            setSuccess("Login successful! Redirecting...");
            setLoginData({ identifier: "", password: "" });
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Login failed";
            setError(errorMessage);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (registerData.password !== registerData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (registerData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (!registerData.email && !registerData.phone) {
            setError("Please provide either email or phone number");
            return;
        }

        try {
            await registerMutation.mutateAsync({
                name: registerData.name,
                email: registerData.email || undefined,
                phone: registerData.phone || undefined,
                password: registerData.password,
            });
            // Success handled by mutation onSuccess
            setSuccess("Account created successfully! Redirecting...");
            setRegisterData({
                name: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
            });
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Registration failed";
            setError(errorMessage);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!forgotPasswordData.email) {
            setError("Please enter your email address");
            return;
        }

        try {
            await forgotPasswordMutation.mutateAsync({
                email: forgotPasswordData.email,
            });
            setPendingEmail(forgotPasswordData.email);
            setSuccess("Password reset link sent! Check your email.");
            setTimeout(() => {
                setActiveView("reset-password");
                setSuccess("");
            }, 2000);
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Failed to send reset link";
            setError(errorMessage);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (
            resetPasswordData.newPassword !== resetPasswordData.confirmPassword
        ) {
            setError("Passwords do not match");
            return;
        }

        if (resetPasswordData.newPassword.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        try {
            await resetPasswordMutation.mutateAsync({
                token: resetPasswordData.code,
                newPassword: resetPasswordData.newPassword,
            });
            setSuccess("Password reset successful! You can now login.");
            setResetPasswordData({
                code: "",
                newPassword: "",
                confirmPassword: "",
            });
            setTimeout(() => {
                setActiveView("login");
                setSuccess("");
            }, 2000);
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Password reset failed";
            setError(errorMessage);
        }
    };

    const resetToLogin = () => {
        setActiveView("login");
        setError("");
        setSuccess("");
        setPendingEmail("");
        setResetPasswordData({
            code: "",
            newPassword: "",
            confirmPassword: "",
        });
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
                <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
                    <div className="flex items-center gap-3">
                        {(activeView === "forgot-password" ||
                            activeView === "reset-password") && (
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
                                {activeView === "forgot-password" &&
                                    "Reset Password"}
                                {activeView === "reset-password" &&
                                    "Create New Password"}
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                {activeView === "login" &&
                                    "Sign in to continue your learning journey"}
                                {activeView === "register" &&
                                    "Create your account to get started"}
                                {activeView === "forgot-password" &&
                                    "We'll send you a reset code"}
                                {activeView === "reset-password" &&
                                    "Enter the code and new password"}
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
                    <div className="flex border-b border-border bg-muted/30">
                        <button
                            onClick={() => {
                                setActiveView("login");
                                setError("");
                                setSuccess("");
                            }}
                            className={`flex-1 py-4 text-center font-semibold transition-all relative ${
                                activeView === "login"
                                    ? "text-white bg-gradient-to-r from-primary to-primary/80"
                                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                            }`}
                        >
                            Login
                            {activeView === "login" && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary"></div>
                            )}
                        </button>
                        <button
                            onClick={() => {
                                setActiveView("register");
                                setError("");
                                setSuccess("");
                            }}
                            className={`flex-1 py-4 text-center font-semibold transition-all relative ${
                                activeView === "register"
                                    ? "text-white bg-gradient-to-r from-primary to-primary/80"
                                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                            }`}
                        >
                            Signup
                            {activeView === "register" && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary"></div>
                            )}
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
                                <Label
                                    htmlFor="login-identifier"
                                    className="text-foreground font-medium"
                                >
                                    Email or Phone
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="login-identifier"
                                        type="text"
                                        placeholder="Email or phone number"
                                        value={loginData.identifier}
                                        onChange={(e) =>
                                            setLoginData({
                                                ...loginData,
                                                identifier: e.target.value,
                                            })
                                        }
                                        className="h-12 pl-10"
                                        required
                                        disabled={loginMutation.isPending}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="login-password"
                                    className="text-foreground font-medium"
                                >
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
                                            setLoginData({
                                                ...loginData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="h-12 pl-10"
                                        required
                                        disabled={loginMutation.isPending}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg shadow-primary/20"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
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
                                <Label
                                    htmlFor="register-name"
                                    className="text-foreground font-medium"
                                >
                                    Full Name{" "}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="register-name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={registerData.name}
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="h-12 pl-10"
                                        required
                                        disabled={registerMutation.isPending}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="register-email"
                                    className="text-foreground font-medium"
                                >
                                    Email Address (Optional)
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="register-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={registerData.email}
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                email: e.target.value,
                                            })
                                        }
                                        className="h-12 pl-10"
                                        disabled={registerMutation.isPending}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Provide either email or phone
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="register-phone"
                                    className="text-foreground font-medium"
                                >
                                    Phone Number (Optional)
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="register-phone"
                                        type="tel"
                                        placeholder="+880 1700 000000"
                                        value={registerData.phone}
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                phone: e.target.value,
                                            })
                                        }
                                        className="h-12 pl-10"
                                        disabled={registerMutation.isPending}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="register-password"
                                    className="text-foreground font-medium"
                                >
                                    Password{" "}
                                    <span className="text-red-500">*</span>
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
                                        disabled={registerMutation.isPending}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="register-confirm-password"
                                    className="text-foreground font-medium"
                                >
                                    Confirm Password{" "}
                                    <span className="text-red-500">*</span>
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
                                        disabled={registerMutation.isPending}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white shadow-lg shadow-secondary/20"
                                disabled={registerMutation.isPending}
                            >
                                {registerMutation.isPending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Creating Account...
                                    </>
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
                                <Link
                                    href="/terms"
                                    className="text-primary hover:underline"
                                >
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                    href="/privacy"
                                    className="text-primary hover:underline"
                                >
                                    Privacy Policy
                                </Link>
                                .
                            </p>
                        </form>
                    )}

                    {/* Forgot Password Form */}
                    {activeView === "forgot-password" && (
                        <form
                            onSubmit={handleForgotPassword}
                            className="space-y-5"
                        >
                            <div className="bg-accent/50 p-4 rounded-lg border border-border">
                                <p className="text-sm text-muted-foreground">
                                    Enter your email address and we'll send you
                                    a code to reset your password.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="forgot-email"
                                    className="text-foreground font-medium"
                                >
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
                                            setForgotPasswordData({
                                                email: e.target.value,
                                            })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg shadow-primary/20"
                                disabled={forgotPasswordMutation.isPending}
                            >
                                {forgotPasswordMutation.isPending ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                        <form
                            onSubmit={handleResetPassword}
                            className="space-y-5"
                        >
                            <div className="bg-accent/50 p-4 rounded-lg border border-border">
                                <p className="text-sm text-muted-foreground">
                                    We sent a reset code to:
                                </p>
                                <p className="text-sm font-semibold text-foreground mt-1">
                                    {pendingEmail}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="reset-code"
                                    className="text-foreground font-medium"
                                >
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
                                                code: e.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 6),
                                            })
                                        }
                                        className="h-12 pl-10 text-center text-2xl tracking-widest"
                                        maxLength={6}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label
                                    htmlFor="reset-new-password"
                                    className="text-foreground font-medium"
                                >
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
                                <Label
                                    htmlFor="reset-confirm-password"
                                    className="text-foreground font-medium"
                                >
                                    Confirm New Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="reset-confirm-password"
                                        type="password"
                                        placeholder="Re-enter new password"
                                        value={
                                            resetPasswordData.confirmPassword
                                        }
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
                                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg shadow-primary/20"
                                disabled={
                                    resetPasswordMutation.isPending ||
                                    resetPasswordData.code.length !== 6
                                }
                            >
                                {resetPasswordMutation.isPending ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-t border-border">
                    <p className="text-xs text-center text-muted-foreground">
                        Need help? Contact us:{" "}
                        <a
                            href="mailto:Contact@innodemy.com"
                            className="text-primary hover:underline font-medium"
                        >
                            Contact@innodemy.com
                        </a>
                        {" or "}
                        <a
                            href="tel:+8801521428597"
                            className="text-primary hover:underline font-medium"
                        >
                            +8801521428597
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
