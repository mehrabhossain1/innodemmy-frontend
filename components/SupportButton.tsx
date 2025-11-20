"use client";

import { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import Image from "next/image";

export default function SupportButton() {
    const [isOpen, setIsOpen] = useState(false);

    // Contact information
    const phoneNumber = "+8801704258972";
    const whatsappNumber = "+8801704258972";

    const handleWhatsApp = () => {
        window.open(`https://wa.me/${whatsappNumber}`, "_blank");
    };

    const handleCall = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <>
            {/* Floating Support Button */}
            <div className="fixed bottom-[calc(1.5rem+40px)] right-6 z-[9999]">
                {/* Expanded Card */}
                {isOpen && (
                    <div className="absolute bottom-20 right-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-64 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-out">
                        {/* Header */}
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                Talk to Career Counselor
                            </h3>
                            {/* Avatar */}
                            <div className="relative w-24 h-24 mx-auto mb-4">
                                <Image
                                    src="https://img.freepik.com/premium-vector/customer-support-flat-design-illustration_1149263-14708.jpg"
                                    alt="Customer Support"
                                    width={96}
                                    height={96}
                                    className="rounded-full object-cover"
                                    unoptimized
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                            {/* WhatsApp Button */}
                            <button
                                onClick={handleWhatsApp}
                                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                            >
                                <MessageCircle className="w-5 h-5" />
                                <span>WHATSAPP</span>
                            </button>

                            {/* Call Button */}
                            <button
                                onClick={handleCall}
                                className="w-full flex items-center justify-center gap-2 bg-[#FFC107] hover:bg-[#FFB300] text-gray-900 font-semibold py-3 rounded-lg transition-colors duration-200"
                            >
                                <Phone className="w-5 h-5" />
                                <span>CALL</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Support Button */}
                <button
                    onClick={() => {
                        console.log("Button clicked, isOpen:", isOpen);
                        setIsOpen(!isOpen);
                    }}
                    className="relative bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 z-10"
                    type="button"
                >
                    {isOpen ? (
                        <>
                            <X className="w-6 h-6" />
                            <span className="text-sm">বন্ধ করুন</span>
                        </>
                    ) : (
                        <>
                            <MessageCircle className="w-6 h-6" />
                            <span className="text-sm">সাপোর্ট নিন</span>
                        </>
                    )}

                    {/* Pulse Effect */}
                    {!isOpen && (
                        <span className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-30 -z-10"></span>
                    )}
                </button>
            </div>
        </>
    );
}
