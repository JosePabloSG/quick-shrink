
import { Link, ArrowRightLeft, Clock, BarChart2, Lock, QrCode, Eye, UserCheck } from "lucide-react";

import FeatureCard from "@/components/feature-card";
const features = [
  {
    title: "URL Shortening",
    description: "Quickly turn long URLs into short, manageable links, making them easier to share and remember.",
    icon: Link
  },
  {
    title: "Redirection",
    description: "Automatically redirect users from your short links to the original, long URL with a single click.",
    icon: ArrowRightLeft
  },
  {
    title: "Expirable Links",
    description: "Set an expiration date for your short URLs, ensuring they're only active for as long as needed.",
    icon: Clock
  },
  {
    title: "Click Tracking",
    description: "Monitor how many times your short link has been clicked, helping you track its popularity.",
    icon: BarChart2
  },
  {
    title: "Password Protection",
    description: "Protect your short links with a password, ensuring only authorized users can access them.",
    icon: Lock
  },
  {
    title: "QR Code Generation",
    description: "Easily generate a QR code for your short link, making it simple to share offline.",
    icon: QrCode
  },
  {
    title: "Link Preview",
    description: "Allow users to preview the destination of a short link before clicking, improving trust and transparency.",
    icon: Eye
  },
  {
    title: "Auth0 Integration",
    description: "Login quickly using your Google or GitHub account, simplifying the process of managing your links.",
    icon: UserCheck
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-dull-lavender-50">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-violet-800 text-center mb-4">
          Discover QuickShrink's Features
        </h1>
        <p className="text-xl text-gravel-600 text-center mb-12">
          Simplify your links, amplify your reach
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`animate-fall-down delay-[${index * 100}ms]`}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
