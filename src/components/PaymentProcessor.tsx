import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, CreditCard, Wallet } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentProcessorProps {
  orderTotal?: number;
  onPaymentComplete?: (paymentDetails: PaymentDetails) => void;
  onCancel?: () => void;
}

export interface PaymentDetails {
  paymentMethod: "credit-card" | "paypal";
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
  paypalEmail?: string;
  transactionId: string;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({
  orderTotal = 9.99,
  onPaymentComplete = () => {},
  onCancel = () => {},
}) => {
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "paypal">(
    "credit-card",
  );
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    // Validate form based on payment method
    if (paymentMethod === "credit-card") {
      if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
        setError("Please fill in all credit card details");
        setIsProcessing(false);
        return;
      }

      // Simple validation for card number format (16 digits)
      if (
        cardNumber.replace(/\s/g, "").length !== 16 ||
        !/^\d+$/.test(cardNumber.replace(/\s/g, ""))
      ) {
        setError("Please enter a valid 16-digit card number");
        setIsProcessing(false);
        return;
      }

      // Simple validation for expiry date (MM/YY format)
      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        setError("Please enter expiry date in MM/YY format");
        setIsProcessing(false);
        return;
      }

      // Simple validation for CVV (3-4 digits)
      if (!/^\d{3,4}$/.test(cvv)) {
        setError("Please enter a valid CVV (3-4 digits)");
        setIsProcessing(false);
        return;
      }
    } else if (paymentMethod === "paypal") {
      if (!paypalEmail) {
        setError("Please enter your PayPal email");
        setIsProcessing(false);
        return;
      }

      // Simple validation for email format
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
        setError("Please enter a valid email address");
        setIsProcessing(false);
        return;
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);

      // Generate a mock transaction ID
      const transactionId =
        "TXN" + Math.random().toString(36).substring(2, 10).toUpperCase();

      // Call the completion handler with payment details
      onPaymentComplete({
        paymentMethod,
        cardNumber: paymentMethod === "credit-card" ? cardNumber : undefined,
        cardHolder: paymentMethod === "credit-card" ? cardHolder : undefined,
        expiryDate: paymentMethod === "credit-card" ? expiryDate : undefined,
        cvv: paymentMethod === "credit-card" ? cvv : undefined,
        paypalEmail: paymentMethod === "paypal" ? paypalEmail : undefined,
        transactionId,
      });
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Payment Details</CardTitle>
        <CardDescription>
          Complete your payment to generate your custom AI video
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h3 className="text-xl font-medium text-center">
              Payment Successful!
            </h3>
            <p className="text-center text-gray-500">
              Your video is now being generated. You can track its progress in
              your dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="payment-amount">Payment Amount</Label>
                <div className="text-2xl font-bold">
                  ${orderTotal.toFixed(2)}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) =>
                    setPaymentMethod(value as "credit-card" | "paypal")
                  }
                  className="grid grid-cols-2 gap-4 pt-2"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label
                      htmlFor="credit-card"
                      className="flex items-center cursor-pointer"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label
                      htmlFor="paypal"
                      className="flex items-center cursor-pointer"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {paymentMethod === "credit-card" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="card-holder">Card Holder Name</Label>
                    <Input
                      id="card-holder"
                      placeholder="John Doe"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <Input
                        id="expiry-date"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paypal-email">PayPal Email</Label>
                    <Input
                      id="paypal-email"
                      type="email"
                      placeholder="your@email.com"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    You will be redirected to PayPal to complete your payment
                    securely.
                  </p>
                </div>
              )}
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!success && (
          <>
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay $${orderTotal.toFixed(2)}`}
            </Button>
          </>
        )}
        {success && (
          <Button
            className="w-full"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Go to Dashboard
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PaymentProcessor;
