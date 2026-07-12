import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Language } from '../types';
const validLanguages: Language[] = ['en', 'ar', 'es', 'nl', 'fr', 'ru', 'de'];

export default function PrivacyPolicy() {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (validLanguages.includes(lang as Language) ? lang : 'en') as Language;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to={`/${currentLang}/home`} 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-gray-400 mb-12">Last Updated: July 12, 2026</p>
        
        <div className="space-y-8 prose prose-invert prose-red max-w-none">
          <p className="text-lg leading-relaxed">
            Welcome to Red Stream. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from <a href="https://www.red-stream.store" className="text-[#e50914] hover:underline">https://www.red-stream.store</a> (the "Site").
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed">
              When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How Do We Use Your Personal Information?</h2>
            <p className="leading-relaxed mb-4">
              We use the order information that we collect generally to fulfill any orders placed through the Site (including processing your payment information and providing you with invoices and/or order confirmations).
            </p>
            <p className="leading-relaxed mb-4">Additionally, we use this information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Communicate with you;</li>
              <li>Screen our orders for potential risk or fraud; and</li>
              <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Sharing Your Personal Information</h2>
            <p className="leading-relaxed">
              We do not sell, trade, or otherwise transfer your personally identifiable information to third parties. This does not include trusted third parties who assist us in operating our website or conducting our business, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p className="leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information. We use state-of-the-art encryption to protect sensitive information transmitted online.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Use of Cookies</h2>
            <p className="leading-relaxed">
              Our cookies improve access to our site and identify repeat visitors. Furthermore, our cookies enhance the user experience by tracking and targeting their interests. However, this use of cookies is in no way linked to any personally identifiable information on our site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Consent</h2>
            <p className="leading-relaxed">
              By using our site, you consent to our online privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
            <p className="leading-relaxed">
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail or through the contact form available on our site.
            </p>
            <div className="mt-6">
              <a 
                href="https://wa.me/212694843943" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#e50914] text-white px-6 py-3 rounded-md font-bold hover:bg-[#ff1e27] transition-colors"
              >
                Contact via WhatsApp
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
