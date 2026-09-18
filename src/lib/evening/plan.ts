import type { Plan } from './schema';

/**
 * Veer's plan for the evening. Nothing here names her or the date; those live in
 * EVENING_GUEST and EVENING_DATE. schema.test.ts checks this file against the schema,
 * so a typo in a time or an overlapping stop fails the tests, not the date.
 *
 * Times are local to `timeZone`, 24-hour, and must fall on EVENING_DATE.
 * Match `film.start` to the showtime you book.
 */
export const plan: Plan = {
	host: 'Veer',
	timeZone: 'America/Toronto',

	// Face-down cards. She turns these before she picks an area, so they
	// describe the evening without naming a place.
	reveals: {
		dinner: {
			kicker: 'Dinner',
			title: 'Ramen',
			line: 'You can show me what “good broth” means.'
		},
		film: {
			kicker: 'The feature',
			title: 'Spider-Man',
			line: 'You get the armrest.'
		},
		dessert: {
			kicker: 'Dessert',
			title: 'Ice cream',
			line: 'Mandatory post-movie discussion.'
		}
	},

	// The first area is listed first on her card.
	areas: {
		hamilton: {
			label: 'Hamilton',
			blurb: "Close to you. I don't mind the drive.",
			pickupAt: '16:40',
			stops: {
				dinner: {
					title: 'Ramen',
					venue: {
						name: 'Kinton Ramen',
						address: '1379 Upper James St, Unit 2, Hamilton, ON L9B 1K2'
					},
					start: '17:00',
					minutes: 75
				},
				film: {
					title: 'Spider-Man: Brand New Day',
					venue: {
						name: 'Cineplex Cinemas Hamilton Mountain',
						address: '795 Paramount Dr, Hamilton, ON L8J 0B4'
					},
					// 6:40 pm show. 2 h 25 min film plus trailers.
					start: '18:40',
					minutes: 165
				},
				dessert: {
					title: 'Ice cream',
					// No venue: we find one together on the night.
					start: '21:40',
					minutes: 35
				}
			}
		},
		oakville: {
			label: 'Oakville',
			blurb: 'Somewhere in between.',
			pickupAt: '16:15',
			stops: {
				dinner: {
					title: 'Ramen',
					venue: { name: 'Kinton Ramen', address: '2501 Hampshire Gate, Oakville, ON L6H 6C8' },
					start: '16:55',
					minutes: 75
				},
				film: {
					title: 'Spider-Man: Brand New Day',
					venue: {
						name: 'Cineplex Cinemas Oakville and VIP',
						address: '3531 Wyecroft Rd, Oakville, ON L6L 0B7'
					},
					// 6:40 pm show.
					start: '18:40',
					minutes: 165
				},
				dessert: {
					title: 'Ice cream',
					// No venue: we find one together on the night.
					start: '21:40',
					minutes: 35
				}
			}
		}
	}
};
