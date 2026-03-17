import { useState } from 'react';
import { Search, Clock, TrendingUp } from 'lucide-react';

const recentSearches = [
  'Composite filling',
  'Implant consultation',
  'Raymond Boutros',
  'Wisdom tooth extraction',
];

const popularServices = [
  { name: 'General Checkup', category: 'Consultation' },
  { name: 'Detartrage (Scaling)', category: 'Cleaning' },
  { name: 'Composite Filling', category: 'Restorative' },
  { name: 'Teeth Whitening', category: 'Cosmetic' },
  { name: 'Root Canal', category: 'Endodontic' },
  { name: 'Implant Placement', category: 'Surgery' },
];

export function SearchScreen() {
  const [query, setQuery] = useState('');

  const filteredServices = query
    ? popularServices.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-[100px]">
      {/* Header */}
      <div className="bg-white border-b border-[#D9DEE2] px-5 pt-5 pb-4">
        <div className="max-w-[430px] mx-auto">
          <h1 className="font-medium text-[19px] text-[#1C1C1C] mb-4">Search</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8AA4B1]" />
            <input
              type="text"
              placeholder="Search services, patients..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#F0F3F5] border border-[#D9DEE2] rounded-[14px] pl-12 pr-4 py-3 text-[#1C1C1C] placeholder:text-[#8AA4B1] outline-none focus:border-[#1E6E97] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="px-5 py-6 max-w-[430px] mx-auto">
        {query ? (
          /* Search Results */
          <div>
            <p className="text-sm text-[#6A7279] mb-3">
              {filteredServices.length} result{filteredServices.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-3">
              {filteredServices.map((service) => (
                <div
                  key={service.name}
                  className="bg-white border border-[#D9DEE2] rounded-[14px] p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0">
                    <Search className="w-4 h-4 text-[#1E6E97]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1C1C1C]">{service.name}</p>
                    <p className="text-sm text-[#6A7279]">{service.category}</p>
                  </div>
                </div>
              ))}
              {filteredServices.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-[#6A7279]">No results found</p>
                  <p className="text-sm text-[#8AA4B1] mt-1">Try a different search term</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Default State */
          <>
            {/* Recent Searches */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#8AA4B1]" />
                <h2 className="font-semibold text-[#1C1C1C] text-sm">Recent Searches</h2>
              </div>
              <div className="space-y-1">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-[#6A7279] hover:bg-white hover:text-[#1C1C1C] transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Services */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-[#8AA4B1]" />
                <h2 className="font-semibold text-[#1C1C1C] text-sm">Popular Services</h2>
              </div>
              <div className="space-y-3">
                {popularServices.map((service) => (
                  <div
                    key={service.name}
                    className="bg-white border border-[#D9DEE2] rounded-[14px] p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#E8F4F8] flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-[#1E6E97]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1C1C1C]">{service.name}</p>
                      <p className="text-sm text-[#6A7279]">{service.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
