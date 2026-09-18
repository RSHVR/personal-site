import type { Venue } from './schema';

export function mapsUrl(venue: Venue, apple: boolean): string {
	if (apple) {
		const params = new URLSearchParams({ q: venue.name, address: venue.address });
		return `https://maps.apple.com/?${params}`;
	}
	const params = new URLSearchParams({ api: '1', query: `${venue.name}, ${venue.address}` });
	return `https://www.google.com/maps/search/?${params}`;
}
