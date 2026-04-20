"use client"

import React, { useMemo, useState } from 'react'

type VenueCard = {
  id: number
  image: string
  venue: string
  title: string
  badges?: string[]
  scarcity?: string
  meta?: string
  banner?: string
  description?: string
  image2?: string
  image3?: string
  category?: string
}

type ListingCard = {
  id: number
  name: string
  category: string
  area: string
  image: string
  badge: string
  title: string
}

type ReservationHeaderProps = {
  selectedVenue: string
  venueQuery: string
  setVenueQuery: React.Dispatch<React.SetStateAction<string>>
  isDropdownOpen: boolean
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
  filteredVenues: string[]
  onSelectVenue: (venue: string) => void
  compact?: boolean
}

type VenueDetailsPageProps = {
  venue: VenueCard
  onBack: () => void
}

type ViewAllListingsPageProps = {
  onBack: () => void
  onOpenVenue: (venue: VenueCard) => void
}

function ReservationHeader({
  selectedVenue,
  venueQuery,
  setVenueQuery,
  isDropdownOpen,
  setIsDropdownOpen,
  filteredVenues,
  onSelectVenue,
  compact = false,
}: ReservationHeaderProps) {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/92 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 gap-2 ${
            compact
              ? 'lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)_minmax(0,200px)_minmax(0,150px)_auto]'
              : 'xl:grid-cols-[minmax(0,300px)_minmax(0,1fr)_minmax(0,210px)_minmax(0,160px)_auto]'
          }`}
        >
          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex h-11 w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 text-left text-sm text-white transition hover:border-white/20"
            >
              <span className="truncate">{selectedVenue}</span>
              <span className="text-white/45">⌄</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] rounded-2xl border border-white/10 bg-neutral-900 p-3 shadow-2xl shadow-black/40">
                <input
                  type="text"
                  value={venueQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVenueQuery(e.target.value)}
                  placeholder="Search venue..."
                  className="mb-3 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/60"
                />

                <div className="max-h-56 space-y-1 overflow-y-auto">
                  {filteredVenues.map((venue: string) => (
                    <button
                      key={venue}
                      type="button"
                      onClick={() => onSelectVenue(venue)}
                      className="w-full rounded-xl px-3 py-2 text-left text-sm text-white/78 transition hover:bg-white/6 hover:text-white"
                    >
                      {venue}
                    </button>
                  ))}

                  {filteredVenues.length === 0 && (
                    <div className="px-3 py-2 text-sm text-white/40">No venues found.</div>
                  )}
                </div>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Your name"
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/60"
          />

          <input
            type="email"
            placeholder="Email"
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/60"
          />

          <select className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-cyan-400/60">
            <option className="text-black">2 Guests</option>
            <option className="text-black">3 Guests</option>
            <option className="text-black">4 Guests</option>
            <option className="text-black">5+ Guests</option>
          </select>

          <button className="h-11 w-full rounded-xl bg-cyan-400 px-5 text-sm font-semibold text-black transition hover:bg-cyan-300 lg:w-auto">
            Reserve
          </button>
        </div>
      </div>
    </div>
  )
}

function VenueDetailsPage({ venue, onBack }: VenueDetailsPageProps) {
  const [venueQuery, setVenueQuery] = useState<string>(venue.venue)
  const [selectedVenue, setSelectedVenue] = useState<string>(venue.venue)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const allVenues: string[] = [
    'Maison Noir',
    'Velvet Room',
    'The Saint Elm',
    'Club Aster',
    'Marble House',
    'Atelier Dallas',
    'Noir Terrace',
    'Rooftop Social',
  ]

  const filteredVenues = useMemo(() => {
    return allVenues.filter((item) => item.toLowerCase().includes(venueQuery.toLowerCase()))
  }, [allVenues, venueQuery])

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <ReservationHeader
        selectedVenue={selectedVenue}
        venueQuery={venueQuery}
        setVenueQuery={setVenueQuery}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        filteredVenues={filteredVenues}
        onSelectVenue={(value: string) => {
          setSelectedVenue(value)
          setVenueQuery(value)
          setIsDropdownOpen(false)
        }}
        compact
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:border-white/20"
        >
          Back to listings
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900">
              <img src={venue.image} alt={venue.title} className="h-[320px] w-full object-cover sm:h-[420px]" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[venue.image, venue.image2 || venue.image, venue.image3 || venue.image].map((img: string, i: number) => (
                <div key={i} className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-neutral-900">
                  <img src={img} alt={`${venue.venue} ${i + 1}`} className="h-28 w-full object-cover sm:h-36" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-neutral-900 p-6 sm:p-8">
            <div className="mb-4 inline-flex rounded-full bg-cyan-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black">
              {venue.banner || 'TOP RATED'}
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">{venue.venue}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{venue.title}</h1>
            <p className="mt-4 text-sm text-white/55">{venue.meta}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(venue.badges || []).map((badge: string) => (
                <span key={badge} className="rounded-full bg-white/8 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                  {badge}
                </span>
              ))}
            </div>

            <p className="mt-6 text-base leading-7 text-white/72">
              {venue.description || 'A premium Dallas venue designed for unforgettable evenings, curated dining, elevated cocktails, and exclusive nightlife moments. This listing page gives users a better sense of the space before they reserve.'}
            </p>

            <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-300">
              {venue.scarcity || 'Only a few spots remain for tonight.'}
            </div>

            <button className="mt-6 w-full rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300">
              Reserve This Venue
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

function ViewAllListingsPage({ onBack, onOpenVenue }: ViewAllListingsPageProps) {
  const [search, setSearch] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const listings: ListingCard[] = [
    {
      id: 1,
      name: 'Maison Noir',
      category: 'Restaurant',
      area: 'Downtown',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      badge: 'TOP RATED',
      title: 'Live Jazz Supper Night',
    },
    {
      id: 2,
      name: 'Velvet Room',
      category: 'Bar',
      area: 'Uptown',
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
      badge: 'RECOMMENDED',
      title: 'Late Night Cocktail Experience',
    },
    {
      id: 3,
      name: 'Club Aster',
      category: 'Nightclub',
      area: 'Deep Ellum',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
      badge: 'LATE NIGHT',
      title: 'Saturday Guestlist Access',
    },
    {
      id: 4,
      name: 'Rooftop Social',
      category: 'Cocktails',
      area: 'Downtown',
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
      badge: 'SUNSET SPOT',
      title: 'Skyline Drinks & Music',
    },
    {
      id: 5,
      name: 'Marble House',
      category: 'Cafe',
      area: 'Knox',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
      badge: 'BRUNCH PICK',
      title: 'Late Dinner & Wine',
    },
    {
      id: 6,
      name: 'Atelier Dallas',
      category: 'Lounge',
      area: 'Uptown',
      image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=1200&q=80',
      badge: 'RECOMMENDED',
      title: 'Private Lounge Nights',
    },
  ]

  const categories: string[] = ['All', 'Restaurant', 'Bar', 'Cafe', 'Lounge', 'Nightclub', 'Cocktails']

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory
      const q = search.toLowerCase()
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.area.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, listings, search])

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-medium text-white">All Venue Listings</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-400">Dallas discovery guide</p>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-white/20 sm:w-auto"
          >
            Back to Homepage
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.22em] text-cyan-400">All listings</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Explore restaurants, bars, cafes, lounges, and nightclubs
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            Browse all Dallas venues in one place with clean cards, simple search, and category filters.
          </p>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-neutral-900/70 p-4 backdrop-blur sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="Search restaurants, bars, cafes, lounges, nightclubs..."
              className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-cyan-400/60 sm:text-base"
            />

            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category: string) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category ? 'bg-cyan-400 text-black' : 'bg-white/8 text-white/78 hover:bg-white/12'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredListings.map((item: ListingCard) => (
            <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-white/20">
              <div className="relative aspect-[16/11] overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                <div className="absolute left-4 top-4 rounded-full bg-cyan-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black">
                  {item.badge}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-3 inline-flex rounded-full bg-white/8 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/65">
                  {item.category}
                </div>
                <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-sm text-white/50">{item.area}</p>
                <p className="mt-3 text-sm text-white/70">{item.title}</p>
                <button
                  onClick={() =>
                    onOpenVenue({
                      id: item.id,
                      venue: item.name,
                      title: item.title,
                      image: item.image,
                      banner: item.badge,
                      meta: item.area,
                      badges: [item.category],
                      scarcity: 'Only a few spots left tonight.',
                    })
                  }
                  className="mt-5 w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                >
                  View Venue
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

export default function DallasMvpHomepage() {
  const [showAllPage, setShowAllPage] = useState<boolean>(false)
  const [selectedVenueDetails, setSelectedVenueDetails] = useState<VenueCard | null>(null)
  const [venueQuery, setVenueQuery] = useState<string>('')
  const [selectedVenue, setSelectedVenue] = useState<string>('Select a venue')
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const allVenues: string[] = ['Maison Noir', 'Velvet Room', 'The Saint Elm', 'Club Aster', 'Marble House', 'Atelier Dallas', 'Noir Terrace', 'Rooftop Social']

  const filteredVenues = useMemo(() => {
    return allVenues.filter((venue) => venue.toLowerCase().includes(venueQuery.toLowerCase()))
  }, [allVenues, venueQuery])

  const featuredCards: VenueCard[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      venue: 'Maison Noir',
      title: 'Live Jazz Supper Night',
      badges: ['Live Jazz', 'Smart Casual', 'Patio'],
      scarcity: 'Only 5 spots left for VIP list',
      meta: 'Tonight • 8:30 PM • Downtown',
      banner: 'TOP RATED',
      description: 'Maison Noir offers a refined dinner-and-music experience with intimate lighting, live jazz sets, and a guestlist-focused atmosphere tailored for premium nights out in Dallas.',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80',
      venue: 'Velvet Room',
      title: 'Late Night Cocktail Experience',
      badges: ['Nightlife', 'Rooftop', 'Signature Cocktails'],
      scarcity: 'Guestlist closes in 2 hours',
      meta: 'Friday • 10:00 PM • Uptown',
      banner: 'RECOMMENDED',
      description: 'Velvet Room is built for elevated late nights, rooftop energy, and an exclusive social crowd looking for premium drinks and a polished nightlife setting.',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
      venue: 'The Saint Elm',
      title: 'Chef’s Tasting Dinner',
      badges: ['Dinner', 'Chef Special', 'Date Night'],
      scarcity: 'Only 3 tables remaining',
      meta: 'Saturday • 7:00 PM • Knox',
      banner: 'TOP RATED',
      description: 'The Saint Elm delivers a curated tasting experience with elevated plating, warm interiors, and a premium atmosphere for special occasions and date nights.',
    },
  ]

  const secondaryCards: VenueCard[] = [
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
      venue: 'Club Aster',
      title: 'Saturday Guestlist Access',
      category: 'Nightclub',
      meta: 'Deep Ellum',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
      venue: 'Marble House',
      title: 'Late Dinner & Wine',
      category: 'Restaurant',
      meta: 'Uptown',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
      venue: 'Rooftop Social',
      title: 'Sunset Cocktails',
      category: 'Bar',
      meta: 'Downtown',
    },
  ]

  if (selectedVenueDetails) {
    return <VenueDetailsPage venue={selectedVenueDetails} onBack={() => setSelectedVenueDetails(null)} />
  }

  if (showAllPage) {
    return <ViewAllListingsPage onBack={() => setShowAllPage(false)} onOpenVenue={setSelectedVenueDetails} />
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <ReservationHeader
        selectedVenue={selectedVenue}
        venueQuery={venueQuery}
        setVenueQuery={setVenueQuery}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        filteredVenues={filteredVenues}
        onSelectVenue={(value: string) => {
          setSelectedVenue(value)
          setVenueQuery(value)
          setIsDropdownOpen(false)
        }}
      />

      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80" alt="Premium Dallas venue interior" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-neutral-950" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-8 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white/70 backdrop-blur">
              Dallas dining • nightlife • experiences
            </div>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
              Discover Dallas’
              <span className="mt-2 block text-cyan-400">Best Kept Secrets</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 sm:mt-8 sm:text-lg lg:text-xl">
              Curated venues, exclusive guestlists, and elevated nights out — designed for locals who want the city’s best without the noise.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-2xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300">
                Download App
              </button>
              <button
                onClick={() => setShowAllPage(true)}
                className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Browse All Venues
              </button>
            </div>
          </div>

          <div className="mt-10 max-w-6xl rounded-[1.75rem] border border-white/10 bg-neutral-900/80 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:mt-12 md:p-5 lg:mt-14">
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
              <div className="rounded-2xl bg-black/30 px-5 py-4">
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">Date</label>
                <input type="date" className="w-full bg-transparent text-base text-white outline-none [color-scheme:dark]" />
              </div>
              <div className="rounded-2xl bg-black/30 px-5 py-4">
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">Category</label>
                <select className="w-full bg-transparent text-base text-white outline-none">
                  <option className="text-black">Dinner</option>
                  <option className="text-black">Nightlife</option>
                  <option className="text-black">Live Music</option>
                </select>
              </div>
              <div className="rounded-2xl bg-black/30 px-5 py-4">
                <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">Neighborhood</label>
                <select className="w-full bg-transparent text-base text-white outline-none">
                  <option className="text-black">Downtown</option>
                  <option className="text-black">Uptown</option>
                  <option className="text-black">Deep Ellum</option>
                </select>
              </div>
              <button className="rounded-2xl bg-cyan-400 px-7 py-4 text-sm font-semibold text-black transition hover:bg-cyan-300">Search</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mb-12 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-400">Featured this week</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Premium venue placement</h2>
            <p className="mt-4 text-base leading-7 text-white/60">High-visibility placements for the most sought-after restaurants, bars, and nightlife experiences in Dallas.</p>
          </div>
          <button onClick={() => setShowAllPage(true)} className="text-sm font-medium text-white/65 transition hover:text-white">
            View all listings →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {featuredCards.map((card: VenueCard) => (
            <article key={card.id} className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-white/20">
              <div className="relative aspect-[16/11] overflow-hidden">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                <div className="absolute left-4 top-4 rounded-full bg-cyan-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black">
                  {card.banner}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  {(card.badges || []).map((badge: string) => (
                    <span key={badge} className="rounded-full bg-white/6 px-3 py-1 text-[11px] font-medium tracking-wide text-white/75">
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/40">{card.venue}</p>
                  <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl">{card.title}</h3>
                  <p className="text-sm text-white/55">{card.meta}</p>
                </div>

                <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm font-medium text-cyan-300">
                  {card.scarcity}
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setSelectedVenueDetails(card)}
                    className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                  >
                    Reserve / Join Guestlist
                  </button>
                  <button onClick={() => setSelectedVenueDetails(card)} className="text-sm font-medium text-white/55 transition hover:text-white">
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-neutral-900/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-400">More places</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Standard venue placement</h2>
              <p className="mt-4 text-base leading-7 text-white/65">A smaller listing section for restaurants, bars, cafes, lounges, and nightclubs that are not in the premium placement tier.</p>
            </div>
            <button onClick={() => setShowAllPage(true)} className="text-sm font-medium text-white/65 transition hover:text-white">
              View all venues →
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
            {secondaryCards.map((card: VenueCard) => (
              <article key={card.id} className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30 transition hover:border-white/20">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={card.image} alt={card.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </div>

                <div className="p-5">
                  <div className="mb-3 inline-flex rounded-full bg-white/8 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-white/65">
                    {card.category}
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/40">{card.venue}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm text-white/50">{card.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black px-5 py-10 shadow-2xl shadow-black/30 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-400">For venues</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Own a venue? Get listed and reach 10,000+ Dallas locals.</h2>
              <p className="mt-5 text-base leading-7 text-white/70">A premium discovery platform for restaurants, lounges, bars, cafes, and nightlife brands that want higher-intent traffic and better visibility.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button className="rounded-2xl bg-cyan-400 px-6 py-4 text-sm font-semibold text-black transition hover:bg-cyan-300">View Monthly Plans</button>
              <button className="rounded-2xl border border-white/15 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/5">Book a Demo</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
