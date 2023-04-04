import React from 'react';

type tagType = {
    tag: string
}

const JobTag = ({ tag }: tagType) => {
    return (
        <li className='mr-4 bg-background p-1 rounded-[10px]'>{tag}</li>
    );
};

export default JobTag;