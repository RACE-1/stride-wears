import { Truck, RotateCcw, Award, Sparkles } from 'lucide-react';

export default function FeaturesBanner() {
  const features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      desc: 'Applies to orders of $50 or more for Nike Members.',
    },
    {
      icon: RotateCcw,
      title: '30-Day Free Returns',
      desc: 'Return or exchange items easily within 30 days.',
    },
    {
      icon: Award,
      title: 'Member Rewards',
      desc: 'Special promotions, drops, and community events.',
    },
    {
      icon: Sparkles,
      title: 'Sanity Headless CMS',
      desc: 'Instant content editing for client teams at /studio.',
    },
  ];

  return (
    <section className="bg-neutral-100 border-y border-neutral-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="flex items-start space-x-4">
                <div className="p-3 bg-white rounded-xl shadow-xs text-black shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-neutral-900">{feat.title}</h4>
                  <p className="text-xs text-neutral-600 mt-1">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
