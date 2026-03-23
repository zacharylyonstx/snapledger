"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["10 documents/month", "All export formats", "Email support"],
    current: true,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "200 documents/month",
      "API access",
      "Batch processing",
      "Priority support",
      "QuickBooks export",
    ],
    current: false,
    highlight: true,
  },
  {
    name: "Business",
    price: "$79",
    period: "/month",
    features: [
      "Unlimited documents",
      "Full API access",
      "Custom integrations",
      "Dedicated support",
      "SSO & team management",
    ],
    current: false,
  },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your subscription and billing
        </p>
      </div>

      {/* Current plan */}
      <Card className="border-border/60">
        <CardContent className="flex items-center justify-between py-6">
          <div>
            <p className="text-sm text-muted-foreground">Current Plan</p>
            <p className="text-xl font-bold">Free</p>
            <p className="text-xs text-muted-foreground mt-1">
              3 of 10 documents used this month
            </p>
          </div>
          <Badge variant="secondary">Active</Badge>
        </CardContent>
      </Card>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`border-border/60 ${
              plan.highlight ? "ring-1 ring-primary" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                {plan.current && <Badge>Current</Badge>}
                {plan.highlight && !plan.current && (
                  <Badge variant="secondary">Popular</Badge>
                )}
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.current ? "outline" : "default"}
                className="w-full"
                disabled={plan.current}
              >
                {plan.current ? (
                  "Current Plan"
                ) : (
                  <>
                    Upgrade <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
