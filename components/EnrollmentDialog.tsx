"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Loader2 } from "lucide-react";

interface EnrollmentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    courseId: string;
    courseTitle: string;
    coursePrice?: number;
}

export default function EnrollmentDialog({
    open,
    onOpenChange,
    courseId,
    courseTitle,
    coursePrice = 1000,
}: EnrollmentDialogProps) {
    const [paymentMethod, setPaymentMethod] = useState<"bkash" | "nagad">(
        "bkash"
    );
    const [transactionId, setTransactionId] = useState("");
    const [amount, setAmount] = useState(coursePrice.toString());
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("/api/enrollments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    courseId,
                    paymentMethod,
                    transactionId: transactionId.trim(),
                    amount: Number(amount),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit enrollment");
            }

            setSuccess(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to submit enrollment"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onOpenChange(false);
            // Reset form after closing
            setTimeout(() => {
                setTransactionId("");
                setAmount(coursePrice.toString());
                setSuccess(false);
                setError("");
            }, 300);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                {success ? (
                    <div className="text-center py-8">
                        <div className="flex justify-center mb-4">
                            <div className="rounded-full bg-green-100 p-3">
                                <CheckCircle2 className="h-12 w-12 text-green-600" />
                            </div>
                        </div>
                        <DialogTitle className="text-2xl mb-2">
                            Enrollment Request Submitted!
                        </DialogTitle>
                        <DialogDescription className="text-base">
                            Your enrollment request for{" "}
                            <strong>{courseTitle}</strong> has been submitted
                            successfully.
                        </DialogDescription>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6 mb-6">
                            <p className="text-sm text-blue-800">
                                <strong>What's next?</strong>
                            </p>
                            <p className="text-sm text-blue-700 mt-2">
                                Our admin team will verify your payment and
                                approve your enrollment within 24 hours. You'll
                                receive a notification once approved.
                            </p>
                        </div>
                        <Button onClick={handleClose} className="w-full">
                            Got it, Thanks!
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>Enroll in {courseTitle}</DialogTitle>
                            <DialogDescription>
                                Complete the payment and submit your transaction
                                details
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Payment Instructions */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
                                <h3 className="font-semibold text-indigo-900 mb-3">
                                    Payment Instructions
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="bg-white rounded-md p-3 border border-indigo-100">
                                        <p className="font-semibold text-pink-600 mb-1">
                                            বিকাশ (bKash)
                                        </p>
                                        <p className="text-gray-700">
                                            Send Money:{" "}
                                            <strong>01XXXXXXXXX</strong>
                                        </p>
                                        <p className="text-gray-600 text-xs mt-1">
                                            Amount: {coursePrice} BDT
                                        </p>
                                    </div>

                                    <div className="bg-white rounded-md p-3 border border-indigo-100">
                                        <p className="font-semibold text-orange-600 mb-1">
                                            নগদ (Nagad)
                                        </p>
                                        <p className="text-gray-700">
                                            Send Money:{" "}
                                            <strong>01XXXXXXXXX</strong>
                                        </p>
                                        <p className="text-gray-600 text-xs mt-1">
                                            Amount: {coursePrice} BDT
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs text-indigo-700 mt-3">
                                    ⚠️ Please save your transaction ID after
                                    sending the payment
                                </p>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="paymentMethod">
                                        Payment Method *
                                    </Label>
                                    <Select
                                        value={paymentMethod}
                                        onValueChange={(value) =>
                                            setPaymentMethod(
                                                value as "bkash" | "nagad"
                                            )
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bkash">
                                                বিকাশ (bKash)
                                            </SelectItem>
                                            <SelectItem value="nagad">
                                                নগদ (Nagad)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="amount">
                                        Amount (BDT) *
                                    </Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        placeholder="1000"
                                        required
                                        min="1"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="transactionId">
                                        Transaction ID *
                                    </Label>
                                    <Input
                                        id="transactionId"
                                        type="text"
                                        value={transactionId}
                                        onChange={(e) =>
                                            setTransactionId(e.target.value)
                                        }
                                        placeholder="Enter your transaction ID"
                                        required
                                    />
                                    <p className="text-xs text-gray-500">
                                        The unique transaction ID you received
                                        after payment
                                    </p>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                    <p className="text-sm text-red-800">
                                        {error}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleClose}
                                    disabled={loading}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading || !transactionId.trim()}
                                    className="flex-1"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit Enrollment"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
