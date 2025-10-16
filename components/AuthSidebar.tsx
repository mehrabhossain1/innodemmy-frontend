"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, Phone, Lock, User as UserIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";

interface AuthSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthSidebar({ isOpen, onClose }: AuthSidebarProps) {
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [loginData, setLoginData] = useState({
        identifier: "",
        password: "",
    });
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();
    const { login } = useAuth();

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

            if (response.ok) {
                login(data.token, data.user);
                setSuccess("Login successful! Redirecting...");
                setLoginData({ identifier: "", password: "" });

                setTimeout(() => {
                    onClose();
                    if (data.user.role === "admin") {
                        router.push("/admin/dashboard");
                    } else {
                        router.push("/dashboard");
                    }
                }, 1000);
            } else {
                setError(data.error || "Login failed");
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

        // Validate: at least one of email or phone is required
        if (!registerData.email && !registerData.phone) {
            setError("Please provide either an email or phone number");
            setLoading(false);
            return;
        }

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
                    email: registerData.email || null,
                    phone: registerData.phone || null,
                    password: registerData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token, data.user);
                setSuccess("Account created successfully! Redirecting...");
                setRegisterData({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                });

                setTimeout(() => {
                    onClose();
                    router.push("/dashboard");
                }, 1000);
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
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            {activeTab === "login" ? "Welcome Back!" : "Join Innodemy"}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {activeTab === "login"
                                ? "Sign in to continue your learning journey"
                                : "Start your learning journey today"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-accent rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-foreground" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border">
                    <button
                        onClick={() => {
                            setActiveTab("login");
                            setError("");
                            setSuccess("");
                        }}
                        className={`flex-1 py-4 text-center font-semibold transition-all ${
                            activeTab === "login"
                                ? "text-primary border-b-2 border-primary bg-accent/50"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("register");
                            setError("");
                            setSuccess("");
                        }}
                        className={`flex-1 py-4 text-center font-semibold transition-all ${
                            activeTab === "register"
                                ? "text-primary border-b-2 border-primary bg-accent/50"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                        }`}
                    >
                        Register
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto h-[calc(100%-220px)]">
                    {/* Success/Error Messages */}
                    {success && (
                        <div className="mb-4 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
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

                    {activeTab === "login" ? (
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="login-identifier" className="text-foreground font-medium">
                                    Email or Phone Number
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="login-identifier"
                                        type="text"
                                        placeholder="your@email.com or +1234567890"
                                        value={loginData.identifier}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, identifier: e.target.value })
                                        }
                                        className="h-12 pl-10"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Enter the email or phone you registered with
                                </p>
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
                                <Link
                                    href="/forgot-password"
                                    className="text-primary hover:underline font-medium"
                                    onClick={onClose}
                                >
                                    Forgot Password?
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("register")}
                                    className="text-primary hover:underline font-medium"
                                >
                                    Create Account
                                </button>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <div className="flex items-center justify-center space-x-4 mb-4">
                                    <div className="flex-1 h-px bg-border"></div>
                                    <span className="text-sm text-muted-foreground px-3">OR</span>
                                    <div className="flex-1 h-px bg-border"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-11"
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            />
                                        </svg>
                                        Google
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-11"
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                            />
                                        </svg>
                                        Facebook
                                    </Button>
                                </div>
                            </div>
                        </form>
                    ) : (
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
                                    Email Address <span className="text-muted-foreground text-xs">(Optional)</span>
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
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-phone" className="text-foreground font-medium">
                                    Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                    <Input
                                        id="register-phone"
                                        type="tel"
                                        placeholder="+1234567890"
                                        value={registerData.phone}
                                        onChange={(e) =>
                                            setRegisterData({ ...registerData, phone: e.target.value })
                                        }
                                        className="h-12 pl-10"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Provide at least one: email or phone number
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
                                    onClick={() => setActiveTab("login")}
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
