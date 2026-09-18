import type { Plan } from './schema';

/** A small, stable plan for tests. The real plan lives in plan.ts and can change freely. */
export const fixturePlan: Plan = {
	host: 'Veer',
	timeZone: 'America/Toronto',
	reveals: {
		dinner: { kicker: 'Dinner', title: 'Ramen', line: 'A proper bowl.' },
		film: { kicker: 'The feature', title: 'Spider-Man', line: 'Big screen.' },
		dessert: { kicker: 'Dessert', title: 'Ice cream', line: 'Then a walk.' }
	},
	areas: {
		hamilton: {
			label: 'Hamilton',
			blurb: 'Downtown, close to you.',
			pickupAt: '17:05',
			stops: {
				dinner: {
					title: 'Ramen',
					venue: { name: 'Kinton Ramen', address: '50 King William St, Hamilton, ON' },
					start: '17:30',
					minutes: 75
				},
				film: {
					title: 'Spider-Man: Brand New Day',
					venue: { name: 'Landmark Cinemas', address: '2 King St W, Hamilton, ON' },
					start: '19:10',
					minutes: 165
				},
				dessert: {
					title: 'Ice cream',
					start: '22:05',
					minutes: 35
				}
			}
		},
		oakville: {
			label: 'Oakville',
			blurb: 'Somewhere in between.',
			pickupAt: '16:40',
			stops: {
				dinner: {
					title: 'Ramen',
					venue: { name: 'Kinton Ramen', address: '2501 Hampshire Gate, Oakville, ON' },
					start: '17:15',
					minutes: 75
				},
				film: {
					title: 'Spider-Man: Brand New Day',
					venue: {
						name: 'Cineplex Winston Churchill',
						address: '2081 Winston Park Dr, Oakville, ON'
					},
					start: '18:55',
					minutes: 165
				},
				dessert: {
					title: 'Ice cream',
					start: '21:55',
					minutes: 35
				}
			}
		}
	}
};
