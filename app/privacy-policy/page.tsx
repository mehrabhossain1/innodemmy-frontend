"use client";

import {
    Shield,
    User,
    Eye,
    Share2,
    Settings,
    Lock,
    Baby,
    FileText,
    Phone,
    Mail,
    Database,
    CreditCard,
    Monitor,
    Cookie,
    Target,
    CheckCircle,
    AlertCircle,
    Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
                        Privacy Policy
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                        At Innodemy, your privacy matters to us. We understand
                        that when you take courses, attend live sessions, or
                        explore our recorded classes, you are placing trust in
                        us to protect your personal information. This Privacy
                        Policy explains how we collect, use, and safeguard your
                        data.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl">
                    {/* Information We Collect */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Database className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        1. Information We Collect
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        When you interact with Innodemy, we may
                                        collect the following information:
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3">
                                            <User className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    Personal Details
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Name, email address, phone
                                                    number, and account
                                                    credentials.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Target className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    Learning Activity
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Courses enrolled, progress
                                                    tracking, and feedback.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CreditCard className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    Payment Details
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Processed securely through
                                                    trusted third-party
                                                    providers.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Monitor className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    Technical Information
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Device type, browser, IP
                                                    address, and usage patterns.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-start gap-3">
                                        <Cookie className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">
                                                Cookies and Analytics
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Usage patterns and analytics to
                                                help us understand trends and
                                                enhance our services.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* How We Use Your Information */}
                    <Card className="border-l-4 border-secondary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Eye className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        2. How We Use Your Information
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        We use the information you provide to
                                        give you access to our courses, live
                                        events, and recorded classes, ensuring a
                                        seamless learning experience.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-semibold text-foreground">
                                                    Personalized Learning:
                                                </span>{" "}
                                                Your data helps us personalize
                                                your learning journey and
                                                recommend relevant content.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-semibold text-foreground">
                                                    Communication:
                                                </span>{" "}
                                                Deliver important updates,
                                                reminders, and support messages.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-semibold text-foreground">
                                                    Payment Processing:
                                                </span>{" "}
                                                Process payments securely and
                                                efficiently.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-semibold text-foreground">
                                                    Platform Enhancement:
                                                </span>{" "}
                                                Enhance the performance and
                                                usability of our platform.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-semibold text-foreground">
                                                    Compliance:
                                                </span>{" "}
                                                Ensure compliance with our Terms
                                                of Service and applicable laws.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sharing of Information */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Share2 className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        3. Sharing of Information
                                    </h2>
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                            <h3 className="font-semibold text-red-800 dark:text-red-200">
                                                We Do Not Sell Your Information
                                            </h3>
                                        </div>
                                        <p className="text-sm text-red-700 dark:text-red-300">
                                            We do not sell your personal
                                            information to third parties.
                                        </p>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        However, we may share it with:
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-semibold text-foreground">
                                                    Service Providers:
                                                </span>{" "}
                                                Who help us deliver our services
                                                (e.g., payment gateways, hosting
                                                providers).
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-semibold text-foreground">
                                                    Legal Authorities:
                                                </span>{" "}
                                                When required to comply with law
                                                or protect rights and safety.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                <span className="font-semibold text-foreground">
                                                    Educational Partners:
                                                </span>{" "}
                                                Only when necessary to support
                                                course delivery.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Your Choices and Rights */}
                    <Card className="border-l-4 border-secondary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Settings className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        4. Your Choices and Rights
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        You are always in control of your
                                        personal information.
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <Settings className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                                                        Account Management
                                                    </h3>
                                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                                        Access and update your
                                                        details, manage your
                                                        preferences through your
                                                        account settings.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                                                        Communication Control
                                                    </h3>
                                                    <p className="text-sm text-green-700 dark:text-green-300">
                                                        Opt out of promotional
                                                        communications and
                                                        manage your
                                                        communication
                                                        preferences.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg sm:col-span-2">
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                                                        Data Deletion
                                                    </h3>
                                                    <p className="text-sm text-purple-700 dark:text-purple-300">
                                                        You may request the
                                                        deletion of your account
                                                        and related data,
                                                        subject to any legal or
                                                        operational requirements
                                                        that may apply.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data Security */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Lock className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        5. Data Security
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        We use advanced security measures to
                                        protect your data from unauthorized
                                        access, misuse, or disclosure.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Shield className="w-5 h-5 text-primary" />
                                                <h3 className="font-semibold text-foreground">
                                                    Security Measures
                                                </h3>
                                            </div>
                                            <ul className="text-sm text-muted-foreground space-y-1 ml-8">
                                                <li>
                                                    • All personal and payment
                                                    data is encrypted and stored
                                                    securely
                                                </li>
                                                <li>
                                                    • Protected servers with
                                                    limited access to authorized
                                                    personnel only
                                                </li>
                                                <li>
                                                    • Regular monitoring of
                                                    systems for potential
                                                    vulnerabilities
                                                </li>
                                                <li>
                                                    • Continuous updates to
                                                    security practices
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <Info className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                                                        Security Notice
                                                    </h3>
                                                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                                        While no system can be
                                                        completely secure, we
                                                        continuously update our
                                                        practices to safeguard
                                                        your information.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Children's Privacy */}
                    <Card className="border-l-4 border-secondary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Baby className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        6. Children's Privacy
                                    </h2>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                        <p className="text-muted-foreground leading-relaxed">
                                            Our services are designed for
                                            learners above the legal age of
                                            consent in their region. We do not
                                            knowingly collect personal
                                            information from children without
                                            parental consent.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Changes to This Policy */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <FileText className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        7. Changes to This Policy
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        From time to time, Innodemy may update
                                        this Privacy Policy to reflect
                                        enhancements to our services, changes in
                                        legal or regulatory requirements, or
                                        improvements in our data protection
                                        practices.
                                    </p>
                                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Info className="w-5 h-5 text-primary" />
                                            <h3 className="font-semibold text-foreground">
                                                Stay Informed
                                            </h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            We encourage you to review this
                                            Policy periodically to stay informed
                                            about how we collect, use, and
                                            safeguard your personal information,
                                            as your continued use of our
                                            platform constitutes acceptance of
                                            any updates or modifications.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Us */}
                    <Card className="border-l-4 border-secondary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Phone className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        8. Contact Us
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        If you have any questions, concerns, or
                                        requests regarding this Privacy Policy,
                                        please contact our support team:
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-primary font-semibold">
                                            <Mail className="w-5 h-5" />
                                            <span>innodemy360@gmail.com</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-primary font-semibold">
                                            <Phone className="w-5 h-5" />
                                            <span>+8801805208858</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/80">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
                        Questions About Your Privacy?
                    </h2>
                    <p className="text-lg text-primary-foreground/90 leading-relaxed mb-4">
                        If you have any questions about our Privacy Policy or
                        need assistance with your personal data, please don't
                        hesitate to reach out to our support team.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xl font-bold text-primary-foreground">
                        <Shield className="w-6 h-6" />
                        <span>Your Privacy Matters to Us</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
