import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Layout from '@components/Layout';
import SenderList from '@components/SenderList';
import PostsList from '@components/PostsList';
import getPosts from '@lib/getPosts';
import { SESSION_COOKIE_NAME } from '@lib/constants';
import { Sender } from '@lib/types';

type Props = {
  senders: Array<Sender>;
};

export default function Posts({ senders }: Props) {
  const [visiblePosts, setVisiblePosts] = useState(senders[0].posts);

  return (
    <>
      <Layout title="Posts">
        <div className="container">
          <div className="senders">
            <SenderList senders={senders} setVisiblePosts={setVisiblePosts} />
          </div>
          <div className="posts">
            <PostsList posts={visiblePosts} />
          </div>
        </div>
      </Layout>

      <style jsx>{`
        .container {
          display: flex;
          height: 700px;
          overflow: hidden;
        }

        .senders {
          margin-right: 20px;
        }

        .senders,
        .posts {
          overflow: auto;
        }
      `}</style>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies[SESSION_COOKIE_NAME];

  // If there's no valid session cookie (token), redirect to login page
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const posts = await getPosts(token, 10);

  // Create an array of unique values (by sender id) and sort the senders array in ascending order (by sender id)
  const senders = [
    ...new Map(posts.map((post) => [post.from_id, { id: post.from_id, name: post.from_name, posts: [] }])).values(),
  ].sort((a, b) => parseInt((a as any).id.slice(5)) - parseInt((b as any).id.slice(5)));

  // Associate posts to their senders
  posts.forEach((post) => {
    const sender = senders.find((sender) => (sender as any).id === post.from_id);
    (sender as any).posts.push({
      id: post.id,
      message: post.message,
      type: post.type,
      created_time: post.created_time,
    });
  });

  return {
    props: { senders },
  };
};
