import React from 'react';

const JobCard = () => {

    const cards = [
        {
            companyName: "Google",
            companyIcon: "google.png",
            title: "Full Stack Developer",
            desc: "In this position you will be working with a senior FS developer",
            tags: ["Javascript", "React", "Firebase", "Chakra UI"],
        },
    ]

    return (
        <div>

            {
                /* Logo, Company name, Job name, Tags, Description */
                cards.map((card) => {

                    return (
                        <div key={cards.indexOf(card)} className='bg-white p-3 rounded-lg m-auto drop-shadow-md'>
                            <div className="card-header flex">
                                <img className='card-logo w-10' src={card.companyIcon} alt={card.companyName + " logo"} />
                                {card.companyName}
                            </div>
                            <div className="card-desc">
                                {card.desc}
                            </div>
                            <ul className="card-tags flex">
                                {
                                    card.tags.map((tag) => {
                                        return (
                                            <li key={card.tags.indexOf(tag)} className='mr-4 bg-background p-1 rounded-[10px]'>{tag}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })

            }

        </div>
    );
};

export default JobCard;