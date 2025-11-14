
import React from 'react';

export const ChatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}>
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.532a2.25 2.25 0 01-2.174-2.174l.532-3.722c.093-1.133.957-2.004 2.193-1.98l3.722-.532zM15.75 11.25l-3.722-.532a2.25 2.25 0 00-2.174 2.174l.532 3.722c.093 1.133.957 2.004 2.193 1.98l3.722-.532z" 
    />
    <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M4.5 6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75a2.25 2.25 0 01-2.25-2.25V6.75z" 
    />
  </svg>
);
