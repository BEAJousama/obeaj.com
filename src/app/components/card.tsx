import React from 'react';


interface ICardProps {
  title: string;
  description: string;
  image?: string;
  links?: { label: string; url: string }[];
}

const Card = ({title, description, image, links} : ICardProps) => {
  return (
    <div className="flex flex-col">
      <h2>Card Title</h2>
      <p>Card content goes here.</p>
    </div>
  );
};

export default Card;