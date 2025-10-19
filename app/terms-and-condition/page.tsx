"use client";

import {
    Shield,
    User,
    CreditCard,
    Copyright,
    Eye,
    AlertTriangle,
    FileText,
    Phone,
    CheckCircle,
    Info,
    Lock,
    Globe,
    Mail,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsAndConditionPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
                        Terms and Conditions
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                        Welcome to Innodemy! By accessing or using our website, mobile app, or services 
                        (including online courses, live sessions, and recorded classes), you agree to 
                        follow the Terms and Conditions outlined below. Please read them carefully, as 
                        they govern your use of our platform.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl">
                    {/* Eligibility */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <User className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Eligibility</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        You must be at least the legal age of consent in your country to create an account 
                                        and use our services. If you are under this age, you may only use Innodemy with 
                                        parental or guardian permission.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Responsibility */}
                    <Card className="border-l-4 border-secondary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Shield className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Account Responsibility</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        You are responsible for maintaining the confidentiality of your account details, 
                                        including your username and password. Any activity under your account is considered 
                                        your responsibility.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        You agree to notify Innodemy immediately if you suspect unauthorized use of your 
                                        account or any security breaches.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Use of Services */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Globe className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Services</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        By using Innodemy, you are granted a limited, non-exclusive, non-transferable 
                                        license to access and use the platform, courses, live sessions, and recorded 
                                        content solely for personal learning and non-commercial purposes.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        You may not copy, record, share, sell, or create derivative works from any 
                                        content without prior written consent, nor use the platform for disruptive, 
                                        illegal, or harmful activities.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        All content, designs, logos, and materials are owned by or licensed to Innodemy 
                                        and protected by intellectual property laws.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payments and Refunds */}
                    <Card className="border-l-4 border-secondary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <CreditCard className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Payments and Refunds</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Payments:</h3>
                                            <ul className="text-muted-foreground space-y-2 ml-4">
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                    <span>You agree to pay all fees and charges related to your account in full and in advance.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                    <span>Subscriptions may automatically renew unless you cancel before the next billing period.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                                    <span>Payments are processed securely through trusted third-party payment providers.</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground mb-2">Refunds and Cancellations:</h3>
                                            <ul className="text-muted-foreground space-y-2 ml-4">
                                                <li className="flex items-start gap-2">
                                                    <Info className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                                    <span>Refunds are only available in line with our Refund Policy, which is clearly stated at the time of purchase.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Info className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                                    <span>You may cancel your subscription through your account. Cancellation will take effect at the end of the current billing cycle.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Intellectual Property */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Copyright className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        All course materials, videos, designs, text, graphics, logos, images, and any 
                                        other content made available through Innodemy are owned by Innodemy or its 
                                        partners and are protected by intellectual property laws.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        You are welcome to use these materials for your personal learning only. However, 
                                        you may not copy, modify, share, distribute, resell, or use them for commercial 
                                        purposes without prior written permission from Innodemy.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Privacy */}
                    <Card className="border-l-4 border-secondary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Eye className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Privacy</h2>
                                    <div className="space-y-4">
                                        <p className="text-muted-foreground leading-relaxed">
                                            We are fully committed to protecting your personal information and keeping it secure. 
                                            To prevent unauthorized access or disclosure, we have implemented strict physical, 
                                            electronic, and managerial safeguards.
                                        </p>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="flex items-start gap-2">
                                                <Lock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-foreground">Data Security</h4>
                                                    <p className="text-sm text-muted-foreground">All personal data is encrypted and stored securely.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <CreditCard className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-foreground">Payment Safety</h4>
                                                    <p className="text-sm text-muted-foreground">Credit/debit card details are never stored or shared.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Suspension or Termination */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <AlertTriangle className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Suspension or Termination</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        At Innodemy, we want every learner to enjoy a safe and positive experience. 
                                        However, to protect our community and maintain the integrity of our platform, 
                                        we may suspend or permanently terminate your account in certain situations.
                                    </p>
                                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <p className="text-sm text-red-700 dark:text-red-300">
                                            If you feel your account has been suspended or terminated by mistake, 
                                            you may contact our support team at innodemy360@gmail.com to request a review.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Disclaimer */}
                    <Card className="border-l-4 border-secondary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <FileText className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Disclaimer</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        The Innodemy platform, courses, and all related materials are provided as they are, 
                                        depending on availability. By using the platform, you understand and accept that 
                                        you are doing so at your own responsibility.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        To the fullest extent permitted by law, Innodemy and its officers, directors, 
                                        employees, partners, and agents disclaim all warranties, express or implied, 
                                        regarding the platform and your use of it.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Changes to Terms */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <FileText className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to Terms</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We may update these Terms from time to time. Any changes will be posted on our 
                                        website or app. Continued use of our services means you accept the new Terms.
                                    </p>
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
                                    <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        If you have any questions, concerns, or suggestions regarding these Terms, 
                                        please contact us at:
                                    </p>
                                    <div className="flex items-center gap-2 text-primary font-semibold">
                                        <Phone className="w-5 h-5" />
                                        <span>+8801805208858</span>
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
                        Questions About Our Terms?
                    </h2>
                    <p className="text-lg text-primary-foreground/90 leading-relaxed mb-4">
                        If you have any questions about these Terms and Conditions or need clarification 
                        on any point, please don't hesitate to reach out to our support team.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xl font-bold text-primary-foreground">
                        <Mail className="w-6 h-6" />
                        <span>innodemy360@gmail.com</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
