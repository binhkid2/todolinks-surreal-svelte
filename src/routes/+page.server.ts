
import type { Actions } from './$types';
/** @type {import('./$types').PageServerLoad} */
import getSurreal from '$lib/Surreal/surreal';
import { fail } from '@sveltejs/kit';
const db = await getSurreal();
export async function load() {
	const links = await db.select('links');
	return {
		links
	};
}


export const actions:Actions = {
	createLink: async ({request}) => {
		const created_at = new Date();
		const updated_at = created_at;
		const formData = await request.formData();
		const title = formData.get('title');
		const link = formData.get('link');
		await db.create('links', {
			title: title,
			link: link,
			created_at: created_at,
			updated_at: updated_at
		});

		return { success: true };
	},
	updateLink: async ({request}) => {
		const formData = await request.formData()
		const linkId = formData.get('id')
		const title = formData.get('title');
		const link = formData.get('link');
		console.log(linkId)
		const updated_at = new Date();
		await db.merge(`${linkId}`, {
			title: title,
			link:link,
			updated_at:updated_at
		});
	},
	deleteLink: async ({request}) => {
		const formData = await request.formData()
		const linkId = formData.get('id')
		await db.delete(`${linkId}`);
		return { deleted: true }
	}
};
