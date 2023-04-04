import React, { useEffect, useState } from 'react';

import JobTag from "./JobTag";
import { useAppDispatch, useAppSelector } from '../../../app/reduxHooks';
import { getSearch, loadFilteredJobs } from '../finderSlice';
import { fetchFromDB } from '../../../lib/operations';
import { PayloadAction } from '@reduxjs/toolkit';

type CardType = {
    city: string
    company: CompanyType
    description: string
    end_date: string
    start_date: string
    location: Array<string>
    position: string
    scope: Array<string>
    tags: Array<string>
    user: UserType
}
type CompanyType = {
    creator: string,
    description: string,
    logo: string,
    name: string,
    url: string,
}
type UserType = {
    company: string
    email: string
    id: string
    photo: string
    type: string
    username: string
}

const activeFilters: any = {}


const JobCard = () => {

    // Import Redux state variables

    const selectSearchTerm = useAppSelector(state => state.filter.searchTerm)

    const selectFilter = useAppSelector(state => state.filter.filters)

    const selectJobs = useAppSelector(state => state.finder.jobs)
    const selectFilteredJobs = useAppSelector(state => state.finder.filteredJobs)

    // Import Redux dispatch function

    const dispatch = useAppDispatch()

    // Function to filter jobs based on active filters
    const handleFilterJobs = (jobs: Array<CardType>) => {
        console.log(jobs);

        //Set active filters
        selectFilter.forEach((cat) => {
            activeFilters[cat.name] = new Object({
                name: cat.name.toLowerCase(),
                items: cat.items.filter((item: any) => item.active).map((item: { tag: string }) => item.tag)
            })
        })

        // filter by city => if there are active cities tags
        const filteredCities = activeFilters.Cities?.items.length !== 0 ? jobs.filter((job) =>
            activeFilters.Cities.items.includes(job.city)) : jobs

        // filter by tags => if there are active tags tags
        const filteredTags = filteredCities.filter((job) =>
            activeFilters.Tags.items.length !== 0 ? job.tags.some((tag: any) => activeFilters.Tags.items.includes(tag)) : true
        );

        dispatch(loadFilteredJobs(filteredTags))

        console.log("filtered tags", filteredTags)
        console.log("filtered jobs", selectFilteredJobs)
    }

    useEffect(() => {

        // Check if a search term has been selected
        if (selectSearchTerm !== "") {

            // Dispatch the getSearch action with the selected search term, and handle the response with a Promise
            dispatch(getSearch(selectSearchTerm)).then((response: PayloadAction<any>) => {

                // Log the payload of the response to the console
                console.log(response.payload);

                // Call the handleFilterJobs function with the response payload as an argument
                handleFilterJobs(response.payload)

            })

        } else {
            // If no search term has been selected, dispatch the getSearch action with an empty string, and handle the response with a Promise
            dispatch(getSearch("")).then((response: PayloadAction<any>) => {

                // Dispatch the loadFilteredJobs action with the payload of the response
                dispatch(loadFilteredJobs(response.payload))

            })
        }
    }, [selectSearchTerm]);

    // Filter jobs when filters are selected
    useEffect(() => handleFilterJobs(selectJobs), [selectFilter])

    return (
        <main>
            {

                /* Logo, Company name, Job name, Tags, Description */
                selectFilteredJobs.map((card: CardType) => {

                    return (
                        <article key={selectFilteredJobs.indexOf(card)} className='bg-white p-3 rounded-lg m-auto mb-[20px] drop-shadow-md'>
                            <div className="card-header flex">
                                <img className='card-logo w-10' src={card.user.photo} alt={card.company.name + " logo"} />
                                <h2 className="ml-4">
                                {card.company.name}

                                </h2>
                            </div>
                            <div className="card-desc">
                                <p className='m-2'>

                                {card.description}
                                </p>
                            </div>
                            <p className="card-city m-2">
                                Based in: {card.city}
                            </p>
                            <ul className="card-tags flex">
                                {
                                    card.tags.map((tag) => {
                                        return (
                                            <JobTag
                                                tag={tag}
                                                key={card.tags.indexOf(tag)}
                                            />
                                        )
                                    })
                                }
                            </ul>
                        </article>
                    )
                })

            }

        </main>
    );
};

export default JobCard;
