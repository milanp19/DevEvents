// lib/constants.ts
// Export a small, realistic list of upcoming/popular developer events that can be
// imported and consumed by components like `EventCard`.

export interface EventItem {
  title: string
  image: string
  slug: string
  location: string
  date: string
  time: string
}

export const events: EventItem[] = [
  {
    title: 'React Summit',
    image: '/images/event1.png',
    slug: 'react-summit-2025',
    location: 'Amsterdam, Netherlands',
    date: 'Nov 12–13, 2025',
    time: '09:00 – 18:00',
  },
  {
    title: 'JSConf EU',
    image: '/images/event2.png',
    slug: 'jsconf-eu-2025',
    location: 'Berlin, Germany',
    date: 'Dec 4–5, 2025',
    time: '10:00 – 17:00',
  },
  {
    title: 'Next.js Conf',
    image: '/images/event3.png',
    slug: 'nextjs-conf-2025',
    location: 'San Francisco, CA, USA',
    date: 'Mar 3–4, 2026',
    time: '09:30 – 18:00',
  },
  {
    title: 'KubeCon + CloudNativeCon',
    image: '/images/event4.png',
    slug: 'kubecon-2026',
    location: 'Barcelona, Spain',
    date: 'Feb 20–23, 2026',
    time: '08:30 – 18:00',
  },
  {
    title: 'ETHGlobal Hackathon',
    image: '/images/event5.png',
    slug: 'ethglobal-hack-2026',
    location: 'Lisbon, Portugal (hybrid)',
    date: 'Jan 15–18, 2026',
    time: '24-hour hack sessions',
  },
  {
    title: 'Hack the North',
    image: '/images/event6.png',
    slug: 'hack-the-north-2026',
    location: 'Waterloo, ON, Canada',
    date: 'Sep 18–20, 2026',
    time: 'All day',
  },
  {
    title: 'Vue.js Amsterdam',
    image: '/images/event-full.png',
    slug: 'vuejs-amsterdam-2026',
    location: 'Amsterdam, Netherlands',
    date: 'May 8–9, 2026',
    time: '09:00 – 17:30',
  },
  {
    title: 'Dev Day: Local Meetup',
    image: '/images/event1.png',
    slug: 'dev-day-local-nyc-2025',
    location: 'New York, NY, USA',
    date: 'Nov 28, 2025',
    time: '18:30 – 21:00',
  },
]

