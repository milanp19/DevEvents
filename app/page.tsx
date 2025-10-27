import React from 'react'
import ExploreBtn from "@/components/ExploreBtn";
import {events} from "@/lib/constants";
import EventCard from "@/components/EventCard";


const Page = () => {
    return (
        <section>
            <h1 className="text-center">
                The Hub for Every Dev <br/> Event You Can't Miss
            </h1>
            <p className="text-center mt-5">
                Hackathons, Meetups and Conferences - All in One Place.
            </p>
            <ExploreBtn/>

            <div className="mt-20 space-y-7 mx-auto">
                <h3>Featured Events</h3>
                <ul className="events">
                    {events.map(event => (
                        <li key={event.title} className="list-none">
                            <EventCard {...event} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
export default Page
