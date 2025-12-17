/**
 * One-time script to embed website content into Supabase pgvector
 *
 * Run with: npx tsx scripts/embed-site-content.ts
 *
 * Required environment variables:
 * - COHERE_API_KEY
 * - SUPABASE_URL
 * - SUPABASE_SECRET_KEY
 */

import { CohereClient } from 'cohere-ai';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configuration
const CHUNK_SIZE = 500; // Characters per chunk
const CHUNK_OVERLAP = 100; // Overlap between chunks
const BATCH_SIZE = 96; // Cohere's max batch size

interface SiteContent {
	url: string;
	title: string;
	sections: Array<{
		heading: string;
		content: string;
	}>;
}

interface Chunk {
	content: string;
	pageUrl: string;
	pageTitle: string;
	sectionHeading: string;
	chunkIndex: number;
}

// Hardcoded site content - update this when site content changes
const SITE_CONTENT: SiteContent[] = [
	{
		url: '/',
		title: 'Home',
		sections: [
			{
				heading: 'Introduction',
				content: `Hello, Veer here. I turn complex AI challenges into revenue-generating systems that deliver measurable business impact. Companies work with me when they need ML/AI solutions that solve real problems, not just proof of concepts.`
			},
			{
				heading: 'Current Work',
				content: `Currently working on Capfluence, an AI-powered lead discovery platform that saves financial advisors 100+ hours monthly through automated prospect identification and data-driven insights.`
			},
			{
				heading: 'Previous Work',
				content: `Previously at Highlyte, I architected computer vision and NLP models that automated compliance verification for cannabis brands across all 50 US states, processing thousands of marketing materials and eliminating manual review bottlenecks.`
			},
			{
				heading: 'Philosophy',
				content: `I care about impact you can measure. My approach: start with the business outcome, architect backwards to the solution. Every system I build answers one question: what outcome does this enable? If the answer isn't clear, the solution isn't ready.`
			}
		]
	},
	{
		url: '/faq',
		title: 'FAQ',
		sections: [
			{
				heading: 'Communication Preferences',
				content: `How do you prefer to communicate on projects? I favor email for async updates and documentation, paired with video calls for deeper discussions, brainstorming, or anything that benefits from real-time dialogue. Clear, written communication keeps everyone aligned while calls build rapport and move decisions forward faster.`
			},
			{
				heading: 'Availability and Timezone',
				content: `What's your availability and timezone? I'm based in Toronto (Eastern Time) and typically maintain flexible hours. I can accommodate calls across North American timezones comfortably, and I'm happy to find overlap windows for international collaboration when needed.`
			},
			{
				heading: 'Deadlines and Project Management',
				content: `How do you approach deadlines and project management? I break work into clear milestones with regular check-ins. If something's at risk, I communicate early rather than late. I'd rather flag a potential delay proactively than surprise anyone at the deadline.`
			},
			{
				heading: 'Work Style - Team vs Independent',
				content: `Do you work better independently or in teams? I'm collaborative by nature and thrive when working closely with product managers, designers, and other engineers. That said, I'm equally comfortable taking ownership of a workstream and driving it independently when the situation calls for it.`
			},
			{
				heading: 'Primary Tech Stack',
				content: `What's your primary tech stack? Python is my go-to for ML/AI work, with TypeScript for full-stack development. I work extensively with cloud platforms (AWS, GCP), modern ML frameworks (PyTorch, scikit-learn), and vector databases. For web applications, I lean toward SvelteKit, React, and Node.js.`
			},
			{
				heading: 'AI/ML Problem Approach',
				content: `How do you approach AI/ML problems? Business outcome first, technology second. I start by understanding what success looks like from a user or business perspective, then work backward to determine the right technical approach. Not every problem needs deep learning. Sometimes a well-tuned heuristic or simpler model delivers better ROI.`
			},
			{
				heading: 'Types of Projects',
				content: `What types of projects excite you most? Projects that sit at the intersection of meaningful impact and interesting technical challenges. I'm particularly drawn to work where AI can tangibly improve people's lives or help businesses operate more effectively, not just AI for its own sake.`
			},
			{
				heading: 'Staying Current with AI',
				content: `How do you stay current with rapidly evolving AI technology? Continuous hands-on experimentation. I build side projects to test new frameworks and models, follow key researchers and practitioners, and maintain a habit of reading papers alongside implementation. The best way to understand a technology is to ship something with it.`
			},
			{
				heading: 'Availability for New Work',
				content: `Are you available for new work? Yes, I'm currently open to opportunities, including full-time roles and contract/consulting engagements. I'm selective about fit, looking for teams building products that matter with people I can learn from.`
			},
			{
				heading: 'How to Engage Services',
				content: `What's the best way to engage your services? Reach out via email or book a call directly on my calendar through the contact page. I respond to all inquiries within 24-48 hours and am happy to jump on a quick intro call to discuss your needs.`
			},
			{
				heading: 'Full-time vs Contract',
				content: `Do you consider full-time roles or only contract work? I'm open to both. For the right opportunity with a mission I believe in and a team I'd be excited to join, full-time is absolutely on the table. For shorter-term needs or specialized projects, contract arrangements often make more sense.`
			},
			{
				heading: 'Engagement Process',
				content: `What does your typical engagement process look like? It usually starts with a discovery call to understand your goals and challenges. From there, I'll outline a scope and approach, we'll align on timeline and terms, and then we get to work. I prefer starting with a focused initial phase that delivers tangible value before expanding scope.`
			}
		]
	},
	{
		url: '/projects',
		title: 'Projects',
		sections: [
			{
				heading: 'Ruh - AI Product Safety Analyzer',
				content: `Ruh is an AI-powered product safety analyzer for Amazon. It instantly detects harmful substances, allergens, PFAS compounds, and toxic chemicals with 0-100 harm scores. Features smart caching and detailed breakdowns with scientific citations. Built with Svelte 5, TypeScript, Claude Sonnet 4.5, and deployed on Google Cloud Run. Available as a Chrome extension.`
			},
			{
				heading: 'Lekhi - Embeddable Chatbot Widget',
				content: `Lekhi is an embeddable AI chatbot widget with dual-mode deployment (container or floating popup), real-time streaming via Claude Agent SDK, glassmorphic UI, live video backgrounds, and Supabase-powered chat persistence. Built with Svelte 5, TypeScript, optimized for edge runtimes. Roadmap includes vector database knowledge embedding, Ollama/self-hosted AI, messaging tools, and calendar booking.`
			},
			{
				heading: 'Simple Time Tracker',
				content: `Simple Time Tracker is a lightweight time tracking Chrome extension with real-time earnings calculation and break time tracking. Features pause/resume functionality, editable timer names, and session persistence. All data stored locally for privacy - no backend required. Designed with minimalist UI/UX inspired by Dieter Rams principles.`
			},
			{
				heading: 'How Do You Say - Translation Tool',
				content: `How Do You Say is an AI-powered translation tool built with Svelte and TypeScript, using Cohere's Command-A translation model and hosted on Cloudflare. Provides accurate translations that preserve meaning and context across multiple languages, with pronunciation guides included. This results in more natural, contextually appropriate translations.`
			},
			{
				heading: 'Capfluence - Lead Generation Platform',
				content: `Capfluence is an AI-powered lead discovery platform that saves financial advisors 100+ hours monthly through automated prospect identification and data-driven insights. Built with modern ML techniques, scalable cloud architecture, and real-time data processing capabilities.`
			},
			{
				heading: 'Highlyte - Compliance Platform',
				content: `Highlyte uses computer vision and NLP models that automated compliance verification across all 50 US states and Instagram, processing thousands of marketing materials and eliminating manual review bottlenecks for cannabis industry clients.`
			}
		]
	},
	{
		url: '/ruh',
		title: 'Ruh - Product Safety',
		sections: [
			{
				heading: 'What is Ruh',
				content: `Ruh (pronounced "rooh") is a Chrome extension that brings AI-powered product safety analysis directly into your Amazon shopping experience. No more opening new tabs, copying ingredient lists, or spending 15+ minutes researching if a product is safe for you and your family. The name "ruh" means soul or essence in multiple languages.`
			},
			{
				heading: 'Ruh Features',
				content: `Ruh automatically scrapes ingredients from product listings, analyzes each ingredient using Claude AI with web search capabilities, identifies harmful substances including allergens, PFAS compounds, and toxic chemicals, calculates a 0-100 harm score with clear risk classification (Low/Medium/High), and displays detailed breakdowns in an elegant sidebar right on the product page. All of this happens in under 3 seconds, and results are cached for 30 days.`
			},
			{
				heading: 'Why Ruh Matters',
				content: `99% of us have PFAS (forever chemicals) in our blood. Researching product safety takes 15+ minutes per product. Until now, there were 0 real-time tools for safety analysis at the moment you're making decisions. Ruh was built by someone who cares after watching family members struggle with allergic reactions and reading countless labels without understanding the real risks.`
			},
			{
				heading: 'Ruh Capabilities',
				content: `Real-Time Analysis: Instant safety assessment while browsing Amazon, no copy-paste needed. Allergen Detection: Automatically flags 8 major allergens with severity levels. PFAS Screening: Detects forever chemicals linked to long-term health issues. 0-100 Harm Score: Clear safety rating with color-coded risk levels, no guesswork. Smart Caching: 30-day result storage means lightning-fast repeat views. Detailed Breakdowns: Scientific citations and toxicity explanations in plain language.`
			}
		]
	},
	{
		url: '/contact',
		title: 'Contact',
		sections: [
			{
				heading: 'Contact Information',
				content: `You can reach Veer through the AI chatbot on the contact page, or book a call directly on his calendar. He responds to all inquiries within 24-48 hours and is happy to jump on a quick intro call to discuss your needs. For project inquiries, collaboration opportunities, or just to say hello, the contact page is the best way to get in touch.`
			},
			{
				heading: 'Email Address',
				content: `Veer's email address is arshveersinghgahir@gmail.com. You can email him directly for project inquiries, job opportunities, collaboration requests, or any questions. He typically responds within 24-48 hours.`
			}
		]
	},
	{
		url: '/about',
		title: 'About Veer',
		sections: [
			{
				heading: 'Who is Veer',
				content: `Veer (Arshveer Gahir) is a full-stack developer and AI/ML engineer based in Toronto, Canada (Eastern Time). He specializes in turning complex AI challenges into revenue-generating systems that deliver measurable business impact. His full name is Arshveer Singh Gahir, but he goes by Veer.`
			},
			{
				heading: 'Location and Timezone',
				content: `Veer is based in Toronto, Ontario, Canada. He works in Eastern Time (ET) and maintains flexible hours. He can accommodate calls across North American timezones comfortably and is happy to find overlap windows for international collaboration.`
			},
			{
				heading: 'Professional Background',
				content: `Veer has experience building AI/ML solutions for startups and enterprises. He previously worked at Highlyte where he built computer vision and NLP models for compliance automation in the cannabis industry. He is currently working on Capfluence, an AI-powered lead discovery platform for financial advisors.`
			},
			{
				heading: 'Skills and Expertise',
				content: `Veer's core skills include Python for ML/AI, TypeScript for full-stack development, cloud platforms (AWS, GCP), ML frameworks (PyTorch, scikit-learn), vector databases, SvelteKit, React, and Node.js. He specializes in computer vision, NLP, and building production ML systems.`
			}
		]
	}
];

/**
 * Chunk content with overlap for better retrieval
 */
function chunkContent(pages: SiteContent[]): Chunk[] {
	const chunks: Chunk[] = [];

	for (const page of pages) {
		for (const section of page.sections) {
			const words = section.content.split(/\s+/);
			let currentChunk: string[] = [];
			let currentLength = 0;
			let chunkIndex = 0;

			for (const word of words) {
				currentChunk.push(word);
				currentLength += word.length + 1;

				if (currentLength >= CHUNK_SIZE) {
					chunks.push({
						content: currentChunk.join(' '),
						pageUrl: page.url,
						pageTitle: page.title,
						sectionHeading: section.heading,
						chunkIndex: chunkIndex++
					});

					// Keep overlap for context continuity
					const overlapWords = Math.floor(currentChunk.length * (CHUNK_OVERLAP / CHUNK_SIZE));
					currentChunk = currentChunk.slice(-overlapWords);
					currentLength = currentChunk.join(' ').length;
				}
			}

			// Add remaining content
			if (currentChunk.length > 0) {
				chunks.push({
					content: currentChunk.join(' '),
					pageUrl: page.url,
					pageTitle: page.title,
					sectionHeading: section.heading,
					chunkIndex: chunkIndex
				});
			}
		}
	}

	return chunks;
}

/**
 * Generate embeddings using Cohere embed-english-v3.0
 */
async function generateEmbeddings(
	cohere: CohereClient,
	texts: string[]
): Promise<number[][]> {
	const response = await cohere.v2.embed({
		texts,
		model: 'embed-v4.0',
		inputType: 'search_document', // For documents being indexed
		embeddingTypes: ['float']
	});

	return response.embeddings?.float || [];
}

/**
 * Main embedding function
 */
async function embedSiteContent() {
	// Validate environment variables
	const cohereApiKey = process.env.COHERE_API_KEY;
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_SECRET_KEY;

	if (!cohereApiKey) {
		throw new Error('COHERE_API_KEY environment variable is required');
	}
	if (!supabaseUrl || !supabaseKey) {
		throw new Error('SUPABASE_URL and SUPABASE_SECRET_KEY environment variables are required');
	}

	console.log('Initializing clients...');
	const cohere = new CohereClient({ token: cohereApiKey });
	const supabase = createClient(supabaseUrl, supabaseKey);

	// Chunk content
	console.log('Chunking site content...');
	const chunks = chunkContent(SITE_CONTENT);
	console.log(`Created ${chunks.length} chunks from ${SITE_CONTENT.length} pages`);

	// Generate embeddings in batches
	console.log('Generating embeddings...');
	const embeddings: number[][] = [];

	for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
		const batch = chunks.slice(i, i + BATCH_SIZE);
		const batchTexts = batch.map((c) => c.content);

		console.log(`  Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(chunks.length / BATCH_SIZE)}...`);
		const batchEmbeddings = await generateEmbeddings(cohere, batchTexts);
		embeddings.push(...batchEmbeddings);

		// Rate limiting - wait 100ms between batches
		if (i + BATCH_SIZE < chunks.length) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
	}

	console.log(`Generated ${embeddings.length} embeddings`);

	// Clear existing embeddings
	console.log('Clearing existing embeddings...');
	const { error: deleteError } = await supabase.from('site_embeddings').delete().neq('id', 0);

	if (deleteError) {
		console.error('Warning: Could not clear existing embeddings:', deleteError.message);
	}

	// Insert new embeddings
	console.log('Inserting embeddings into Supabase...');
	const records = chunks.map((chunk, idx) => ({
		content: chunk.content,
		embedding: embeddings[idx],
		page_url: chunk.pageUrl,
		page_title: chunk.pageTitle,
		section_heading: chunk.sectionHeading,
		chunk_index: chunk.chunkIndex
	}));

	// Insert in batches of 100
	const insertBatchSize = 100;
	for (let i = 0; i < records.length; i += insertBatchSize) {
		const batch = records.slice(i, i + insertBatchSize);
		const { error: insertError } = await supabase.from('site_embeddings').insert(batch);

		if (insertError) {
			throw new Error(`Failed to insert embeddings: ${insertError.message}`);
		}

		console.log(`  Inserted ${Math.min(i + insertBatchSize, records.length)}/${records.length} records`);
	}

	console.log('\nEmbedding complete!');
	console.log(`  Total chunks: ${chunks.length}`);
	console.log(`  Total embeddings: ${embeddings.length}`);
	console.log(`  Pages processed: ${SITE_CONTENT.length}`);
}

// Run the script
embedSiteContent().catch((error) => {
	console.error('Error:', error);
	process.exit(1);
});
