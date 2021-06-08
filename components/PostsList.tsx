import { useState } from 'react';
import FilterInput from './FilterInput';
import { Post } from '@lib/types';

type Props = {
  posts: Array<Post>;
};

export default function PostsList({ posts }: Props) {
  const [filter, setFilter] = useState('');
  const [order, setOrder] = useState('desc');

  const filteredPosts = posts.filter((post) => {
    return post.message.toLowerCase().includes(filter.toLowerCase());
  });

  const sortedFilteredPosts = (() => {
    if (order === 'desc') {
      return [...filteredPosts].sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime());
    } else if (order === 'asc') {
      return [...filteredPosts].sort((a, b) => new Date(a.created_time).getTime() - new Date(b.created_time).getTime());
    }
  })();

  return (
    <>
      <div className="header">
        <div className="sortingButtons">
          <button className="ascending" onClick={() => setOrder('asc')}>
            &#x25B2;
          </button>
          <button className="descending" onClick={() => setOrder('desc')}>
            &#x25BC;
          </button>
        </div>
        <FilterInput value={filter} placeholder="Filter posts" onChange={(e) => setFilter(e.target.value)} />
      </div>
      <div className="posts">
        {sortedFilteredPosts.map((post) => {
          return (
            <div key={post.id} className="post-card">
              <div className="post-card-header">{post.created_time}</div>
              <div className="post-card-body">{post.message}</div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
        }

        .sortingButtons {
          display: flex;
          align-items: flex-start;
        }

        .sortingButtons button {
          padding: 6px;
          border: 1px solid #ddd;
          border-radius: 10px;
          margin-right: 5px;
          cursor: pointer;
        }

        .sortingButtons button:hover {
          background: rgba(0, 0, 0, 0.2);
        }

        .posts {
          width: 600px;
          padding: 0;
          list-style: none;
        }

        .post-card {
          border: 2px solid #a9a9a9;
          margin-bottom: 10px;
        }

        .post-card-header {
          border-bottom: 2px solid #a9a9a9;
          padding: 8px 16px;
        }

        .post-card-body {
          padding: 8px 16px 12px;
        }
      `}</style>
    </>
  );
}
