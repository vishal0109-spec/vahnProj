
const MOCK_EVENTS = [
  {
    id: '1',
    title: 'Delhi Marathon',
    description: 'Participate in a 5K run through scenic Delhi streets. Medals for all finishers. Registration includes T-shirt and refreshments.',
    startTime: '2024-07-09T13:00:00.000Z',
    endTime: '2024-07-09T17:00:00.000Z',
    location: {
      latitude: 28.6139,
      longitude: 77.2090
    },
    distance: 2.5
  },
  {
    id: '2',
    title: 'Community Cleanup',
    description: 'Join neighbors to pick up litter, plant flowers, and beautify shared spaces. All ages welcome. Supplies and snacks provided.',
    startTime: '2024-07-08T09:00:00.000Z',
    endTime: '2024-07-08T12:00:00.000Z',
    location: {
      latitude: 28.6542,
      longitude: 77.2373
    },
    distance: 1.8
  },
  {
    id: '3',
    title: "Farmers' Market Day",
    description: 'Browse fresh produce, homemade treats, and crafts from local farmers and artisans. A great way to support your community vendors.',
    startTime: '2024-07-09T08:00:00.000Z',
    endTime: '2024-07-09T14:00:00.000Z',
    location: {
      latitude: 26.9124,
      longitude: 75.7873
    },
    distance: 12.4
  },
  {
    id: '4',
    title: 'Outdoor Movie Night',
    description: 'Classic Bollywood film under the stars in Lodhi Gardens. Bring blankets and snacks for a cozy evening with friends and family.',
    startTime: '2024-07-10T20:00:00.000Z',
    endTime: '2024-07-10T23:00:00.000Z',
    location: {
      latitude: 28.5931,
      longitude: 77.2197
    },
    distance: 3.2
  },
  {
    id: '5',
    title: 'Art Gallery Opening',
    description: 'Local artists showcase their latest works. Refreshments included. Meet the artists and discover new talent.',
    startTime: '2024-07-11T18:00:00.000Z',
    endTime: '2024-07-11T21:00:00.000Z',
    location: {
      latitude: 19.0760,
      longitude: 72.8777
    },
    distance: 45.6
  },
  {
    id: '6',
    title: 'Tech Meetup',
    description: 'Monthly gathering for developers and tech enthusiasts. Networking, presentations, and discussions about latest trends.',
    startTime: '2024-07-12T19:00:00.000Z',
    endTime: '2024-07-12T22:00:00.000Z',
    location: {
      latitude: 12.9716,
      longitude: 77.5946
    },
    distance: 67.3
  },
  {
    id: '7',
    title: 'Yoga in the Park',
    description: 'Free outdoor yoga session for all levels. Bring your own mat and enjoy mindful movement in nature.',
    startTime: '2024-07-13T07:00:00.000Z',
    endTime: '2024-07-13T08:30:00.000Z',
    location: {
      latitude: 28.6280,
      longitude: 77.2184
    },
    distance: 0.9
  },
  {
    id: '8',
    title: 'Food Festival',
    description: 'Diverse Indian cuisines from local vendors. Live music and family-friendly activities throughout the day.',
    startTime: '2024-07-14T11:00:00.000Z',
    endTime: '2024-07-14T19:00:00.000Z',
    location: {
      latitude: 13.0827,
      longitude: 80.2707
    },
    distance: 89.2
  },
  {
    id: '9',
    title: 'Book Club Discussion',
    description: 'Monthly book club meeting to discuss this months selection. New members welcome. Tea and snacks provided.',
    startTime: '2024-07-15T15:00:00.000Z',
    endTime: '2024-07-15T17:00:00.000Z',
    location: {
      latitude: 22.5726,
      longitude: 88.3639
    },
    distance: 34.7
  },
  {
    id: '10',
    title: 'Classical Music Concert',
    description: 'Live Indian classical music performance featuring local musicians. Beautiful venue with great acoustics.',
    startTime: '2024-07-16T20:00:00.000Z',
    endTime: '2024-07-16T23:00:00.000Z',
    location: {
      latitude: 26.8467,
      longitude: 80.9462
    },
    distance: 28.1
  },
  {
    id: '11',
    title: 'Cooking Workshop',
    description: 'Learn to make authentic Indian dishes from scratch. All ingredients and equipment provided. Take home recipes.',
    startTime: '2024-07-17T14:00:00.000Z',
    endTime: '2024-07-17T17:00:00.000Z',
    location: {
      latitude: 17.3850,
      longitude: 78.4867
    },
    distance: 56.8
  },
  {
    id: '12',
    title: 'Photography Walk',
    description: 'Guided photography tour through historic neighborhoods. Tips for composition and lighting from professional photographers.',
    startTime: '2024-07-18T09:00:00.000Z',
    endTime: '2024-07-18T12:00:00.000Z',
    location: {
      latitude: 18.5204,
      longitude: 73.8567
    },
    distance: 41.3
  },
  {
    id: '13',
    title: 'Charity Auction',
    description: 'Annual fundraising auction for local shelter. Silent and live auctions with items donated by community businesses.',
    startTime: '2024-07-19T18:00:00.000Z',
    endTime: '2024-07-19T22:00:00.000Z',
    location: {
      latitude: 23.0225,
      longitude: 72.5714
    },
    distance: 19.6
  },
  {
    id: '14',
    title: 'Garden Workshop',
    description: 'Learn sustainable gardening techniques and start your own herb garden. Seeds and small pots included for beginners.',
    startTime: '2024-07-20T10:00:00.000Z',
    endTime: '2024-07-20T13:00:00.000Z',
    location: {
      latitude: 21.1702,
      longitude: 72.8311
    },
    distance: 15.4
  },
  {
    id: '15',
    title: 'Dance Class',
    description: 'Beginner-friendly Bharatanatyam dance class. Learn basic steps and have fun in a supportive environment.',
    startTime: '2024-07-21T19:30:00.000Z',
    endTime: '2024-07-21T21:00:00.000Z',
    location: {
      latitude: 15.2993,
      longitude: 74.1240
    },
    distance: 73.5
  },
  {
    id: '16',
    title: 'Science Fair',
    description: 'Local students present their science projects. Educational demonstrations and interactive exhibits for all ages.',
    startTime: '2024-07-22T13:00:00.000Z',
    endTime: '2024-07-22T17:00:00.000Z',
    location: {
      latitude: 30.7333,
      longitude: 76.7794
    },
    distance: 8.7
  },
  {
    id: '17',
    title: 'Fitness Bootcamp',
    description: 'High-intensity outdoor workout suitable for all fitness levels. Professional trainers provide modifications and encouragement.',
    startTime: '2024-07-23T06:00:00.000Z',
    endTime: '2024-07-23T07:00:00.000Z',
    location: {
      latitude: 28.7041,
      longitude: 77.1025
    },
    distance: 4.1
  },
  {
    id: '18',
    title: 'Poetry Reading',
    description: 'Open mic poetry night featuring local poets. Share your own work or simply enjoy the performances. Warm and welcoming atmosphere.',
    startTime: '2024-07-24T19:00:00.000Z',
    endTime: '2024-07-24T21:30:00.000Z',
    location: {
      latitude: 24.5854,
      longitude: 73.7125
    },
    distance: 22.9
  },
  {
    id: '19',
    title: 'Pet Adoption Fair',
    description: 'Meet adorable pets looking for forever homes. Local shelters and rescue organizations will be present.',
    startTime: '2024-07-25T10:00:00.000Z',
    endTime: '2024-07-25T16:00:00.000Z',
    location: {
      latitude: 27.1767,
      longitude: 78.0081
    },
    distance: 6.3
  },
  {
    id: '20',
    title: 'Heritage Walk',
    description: 'Guided tour through historical monuments and heritage sites. Learn about local history and architecture.',
    startTime: '2024-07-26T17:00:00.000Z',
    endTime: '2024-07-26T20:00:00.000Z',
    location: {
      latitude: 26.8895,
      longitude: 75.8068
    },
    distance: 11.2
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getEvents = async () => {
  await delay(500);
  return MOCK_EVENTS;
};

export const getEventById = async (id) => {
  await delay(300);
  const event = MOCK_EVENTS.find(event => event.id === id);
  if (!event) {
    throw new Error(`Event with id ${id} not found`);
  }
  return event;
}; 