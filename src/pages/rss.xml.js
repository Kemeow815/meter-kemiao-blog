import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getAllPosts } from '@src/utils';
import {getFluidPostPath} from '../utils';
export async function GET(context) {
	const posts = await getAllPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: post.postType == "blog"? `/blog/${post.slug}/` :`/${getFluidPostPath(post).year}/${getFluidPostPath(post).month}/${getFluidPostPath(post).day}/${getFluidPostPath(post).title}` ,
		})),
	});
}
