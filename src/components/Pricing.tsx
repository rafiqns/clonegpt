import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: 0,
    features: ['Access to GPT-3.5', '100 messages/month', 'Basic support'],
    stripePriceId: '',
  },
  {
    name: 'Pro',
    price: 20,
    features: [
      'Access to GPT-4',
      'Unlimited messages',
      'Priority support',
      'Custom instructions',
    ],
    stripePriceId: 'price_xyz',
  },
  {
    name: 'Enterprise',
    price: 50,
    features: [
      'Access to all models',
      'Unlimited messages',
      'Dedicated support',
      'API access',
      'Custom models',
    ],
    stripePriceId: 'price_abc',
  },
];

export function Pricing() {
  const handleSubscribe = async (stripePriceId: string) => {
    // TODO: Implement Stripe checkout
    console.log('Subscribe to:', stripePriceId);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="border rounded-lg shadow-sm divide-y divide-gray-200"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{tier.name}</h3>
                <p className="mt-4 text-sm text-gray-500">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${tier.price}
                  </span>{' '}
                  /month
                </p>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-green-500" />
                      <span className="ml-3 text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe(tier.stripePriceId)}
                  className="mt-8 block w-full bg-blue-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-blue-700"
                >
                  {tier.price === 0 ? 'Get Started' : 'Subscribe'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}