import { useState, useEffect } from 'react';
import FilterInput from './FilterInput';
import { Sender, Post } from '@lib/types';

type Props = {
  senders: Array<Sender>;
  setVisiblePosts: (posts: Array<Post>) => void;
};

export default function SenderList({ senders, setVisiblePosts }: Props) {
  const [filter, setFilter] = useState('');

  const filteredSenders = senders.filter((sender) => {
    return sender.name.toLowerCase().includes(filter.toLowerCase());
  });

  const [selectedSender, setSelectedSender] = useState(filteredSenders[0]?.id);

  const showPostsFromSender = (e) => {
    const senderId = e.target.getAttribute('data-sender-id');
    const posts = senders.find((sender) => sender.id === senderId).posts;
    setSelectedSender(senderId);
    setVisiblePosts(posts);
  };

  return (
    <>
      <FilterInput value={filter} placeholder="Filter sender" onChange={(e) => setFilter(e.target.value)} />
      <ul>
        {filteredSenders.map((sender) => {
          return (
            <li key={sender.id}>
              <a
                data-sender-id={sender.id}
                onClick={showPostsFromSender}
                className={sender.id === selectedSender ? 'selected' : ''}
              >
                {sender.name}
                <i>{sender.posts.length}</i>
              </a>
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        ul {
          width: 220px;
          padding: 0;
          list-style: none;
        }

        li {
          position: relative;
          border: 2px solid #a9a9a9;
          margin-bottom: 10px;
        }

        li a {
          display: block;
          padding: 8px 16px;
          text-decoration: none;
          cursor: pointer;
        }

        li a:hover,
        li a.selected {
          background-color: #ddd;
        }

        li i {
          position: absolute;
          top: calc(50% - 12px);
          right: 16px;

          width: 24px;
          height: 24px;
          line-height: 24px;
          text-align: center;

          font-size: 12px;
          font-style: normal;
          background-color: #d32329;
          color: #fff;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
}
