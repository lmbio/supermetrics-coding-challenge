/**
 * Retrieves posts from n pages
 * @param token - User session access token
 * @param pagesNumber - Number of pages to retrieve
 * @returns - Promise containing array with all the posts
 */
export default async function getPosts(token: string, pagesNumber: number): Promise<any> {
  const fetchPosts = async (page = 1) => {
    try {
      const response = await fetch(`https://api.supermetrics.com/assignment/posts?sl_token=${token}&page=${page}`, {
        method: 'GET',
      });
      const json = await response.json();

      if (json.error) {
        console.error(json.error);
      } else {
        const posts = json.data.posts;

        if (page < pagesNumber) {
          return posts.concat(await fetchPosts(page + 1));
        } else {
          return posts;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return fetchPosts();
}
