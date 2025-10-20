"use client";

import {
    Shield,
    Clock,
    CheckCircle,
    AlertCircle,
    Mail,
    Calendar,
    DollarSign,
    FileText,
    Info,
    XCircle,
    AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-6">
                        Refund and Cancellation Policy
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8"></div>
                    <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                        At Innodemy, we value your learning experience and
                        strive to ensure fairness in our policies. Please read
                        the following refund terms carefully before enrolling in
                        any of our courses.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-4xl">
                    {/* Refund Eligibility */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Shield className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        Refund Eligibility
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                If you enroll in or are admitted
                                                to any of Innodemy's courses,
                                                you cannot request a refund of
                                                the course fee (full or partial)
                                                until the main live class or
                                                batch of your course begins.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                Once your course's main live
                                                class or batch has started, you
                                                are not eligible for a refund
                                                until at least one (1) module or
                                                one (1) week of the course is
                                                completed.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Clock className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                A refund request may only be
                                                made within 7 days (1 week) of
                                                the course start date. After
                                                this period, no refund requests
                                                will be accepted.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                If you enrolled without applying
                                                a valid promo code, you cannot
                                                request a refund equal to the
                                                promo code discount.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                            <p className="text-muted-foreground leading-relaxed">
                                                All refund requests must be sent
                                                via email to
                                                innodemy360@gmail.com.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Conditions for Receiving a Refund */}
                    <Card className="border-l-4 border-secondary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <CheckCircle className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        Conditions for Receiving a Refund
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <DollarSign className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                                                        Payment Requirement
                                                    </h3>
                                                    <p className="text-sm text-green-700 dark:text-green-300">
                                                        Refunds can only be
                                                        requested if your course
                                                        fee has been paid in
                                                        full.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                                                        Valid Reason Required
                                                    </h3>
                                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                                        You must provide a valid
                                                        reason for your request.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <Info className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                                                        Service Issues
                                                    </h3>
                                                    <p className="text-sm text-purple-700 dark:text-purple-300">
                                                        Refunds will only be
                                                        considered if you face
                                                        genuine difficulties in
                                                        the course due to
                                                        Innodemy's service — for
                                                        example, if the services
                                                        provided are not as
                                                        promised at the time of
                                                        purchase.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <AlertTriangle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                                                        Time Limit
                                                    </h3>
                                                    <p className="text-sm text-red-700 dark:text-red-300">
                                                        Requests made after 7
                                                        days of the course start
                                                        date will not be
                                                        accepted under any
                                                        circumstances.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Processing Time */}
                    <Card className="border-l-4 border-primary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <Calendar className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        Processing Time
                                    </h2>
                                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Clock className="w-6 h-6 text-primary" />
                                            <h3 className="text-lg font-semibold text-foreground">
                                                Refund Processing Timeline
                                            </h3>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            If your refund request meets all
                                            eligibility criteria and is approved
                                            after verification, the refund will
                                            be processed within{" "}
                                            <span className="font-semibold text-primary">
                                                14–21 business days
                                            </span>{" "}
                                            from the date of your application.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Important Notes */}
                    <Card className="border-l-4 border-secondary shadow-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex items-start gap-4 mb-4">
                                <AlertTriangle className="w-8 h-8 text-secondary mt-1 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        Important Notes
                                    </h2>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                All refund requests are subject
                                                to verification and approval by
                                                our team.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Refunds will be processed to the
                                                original payment method used for
                                                the purchase.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Processing time may vary
                                                depending on your bank or
                                                payment provider.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                For any questions regarding
                                                refunds, please contact us at
                                                innodemy360@gmail.com.
                                            </p>
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
                        Need Help with Refunds?
                    </h2>
                    <p className="text-lg text-primary-foreground/90 leading-relaxed mb-4">
                        If you have any questions about our refund policy or
                        need assistance with a refund request, please don't
                        hesitate to reach out to our support team.
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
